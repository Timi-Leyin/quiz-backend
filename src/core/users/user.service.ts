import { user as User, USER_TYPE } from "@prisma/client";
import { db } from "../../config/database";
import bcryptjs from "bcryptjs";
import { expiryInDays } from "../../helpers/date";
import otpGenerator from "otp-generator";
import isProduction from "../../helpers/is-production";
import logger from "../../helpers/logger";

interface UserInfo {
	email: string;
	firstName: string;
	lastName: string;
	password?: string;
	bio?: string;
	phone?: string;
	fileId?: string;
	type?: USER_TYPE;
}

export default {
	async getUser({ email }: Partial<User>, showPassword = false) {
		return db.user.findUnique({
			where: {
				email,
			},
			include: {
				password: showPassword,
			},
		});
	},

	async getOTP(email: string) {
		const OTP = await db.otp.findFirst({
			where: {
				email,
			},
		});

		return OTP;
	},

	async saveOTP(email: string) {
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			specialChars: false,
		});
		// ################################
		!isProduction() && logger("[ OTP ]", otp);
		const encrypt = await this.hashPassword(otp);
		const previouslyCreatedOTP = await db.otp.findFirst({
			where: {
				email,
			},
		});
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
		if (!previouslyCreatedOTP) {
			await db.otp.create({
				data: {
					email,
					code: encrypt,
					expiresAt,
				},
			});
			return true;
		}

		// TODO[x]: do not sent if the previous otp was send within the last 5mins
		const isExpired = new Date() > previouslyCreatedOTP.expiresAt;
		if (isExpired) {
			await db.otp.update({
				where: {
					uuid: previouslyCreatedOTP.uuid,
				},
				data: {
					code: encrypt,
					expiresAt,
				},
			});
			return true;
		}

		return;
	},

	async compareOTP(email: string, otp: string) {
		const OTP = await this.getOTP(email);
		if (!OTP) return;
		const isExpired = expiryInDays(OTP.createdAt, 0, 0, 5);
		if (isExpired) return;
		const valid = await this.comparePassword(otp, OTP.code);
		if (!valid) return;

		await db.otp.delete({
			where: {
				uuid: OTP.uuid,
			},
		});
		return true;
	},

	async createPassword(password: string, { email, uuid }: Partial<User>) {
		return db.password.create({
			data: {
				content: password,
				user: {
					connect: {
						email,
						uuid,
					},
				},
			},
		});
	},

	async updatePassword(email: string, newPassword: string) {
		return await db.user.update({
			where: {
				email,
			},
			data: {
				password: {
					update: {
						content: newPassword,
					},
				},
			},
		});
	},

	async getUserProfile({ uuid }: Partial<User>) {
		return db.user.findUnique({
			where: {
				uuid,
			},
		});
	},

	async hashPassword(password: string) {
		return await bcryptjs.hash(password, 10);
	},

	async comparePassword(password: string, hash: string) {
		return await bcryptjs.compare(password, hash);
	},

	async saveUser(data: UserInfo) {
		return db.user.create({
			data: {
				email: data.email,
				firstName: data.firstName,
				phone: data.phone,
				bio: data.bio,
				lastName: data.lastName,
				type: data.type,
				password: data.password
					? {
							create: {
								content: await this.hashPassword(data.password),
							},
					  }
					: undefined,
			},
		});
	},
};
