import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import { db } from "../../../config/database";
import responseObject from "../../../helpers/response-object";

export default async (req: Request, res: Response) => {
	try {
		const users = await db.user.findMany({
			select: {
				firstName: true,
				lastName: true,
				correctAnswers: true,
				fastestTime: true,
				gender: true,
				quizPlayed: true,
			},
		});

		return res.status(200).json(
			responseObject({
				message: "Leaderboard Retrived",
				data: users,
			})
		);
	} catch (error) {
		return errorHandler(res, error);
	}
};
