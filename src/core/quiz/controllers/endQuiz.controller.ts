import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import { db } from "../../../config/database";
import responseObject from "../../../helpers/response-object";

export default async (req: Request, res: Response) => {
	try {
		const { correctAnswers, timeRemaining } = req.body;
		await db.user.update({
			where: {
				// @ts-ignore
				uuid: req.user.uuid,
			},
			data: {
				fastestTime: String(
					// @ts-ignore
					Math.max(timeRemaining, Number(req.user.fastestTime))
				),
				// @ts-ignore
				correctAnswers: Number(req.user.correctAnswers) + Number(correctAnswers),
			},
		});
		return res.status(200).json(
			responseObject({
				message: "Quiz ended",
			})
		);
	} catch (error) {
		return errorHandler(res, error);
	}
};
