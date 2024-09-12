import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import { db } from "../../../config/database";
import responseObject from "../../../helpers/response-object";

export default async (req: Request, res: Response) => {
	try {
		await db.user.update({
			where: {
				// @ts-ignore
				uuid: req.user.uuid,
			},
			data: {
				// @ts-ignore
				quizPlayed: req.user.quizPlayed + 1,
			},
		});
		return res.status(200).json(
			responseObject({
				message: "Quiz Started",
			})
		);
	} catch (error) {
		return errorHandler(res, error);
	}
};
