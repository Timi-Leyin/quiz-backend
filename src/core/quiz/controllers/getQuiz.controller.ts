import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import { db } from "../../../config/database";
import responseObject from "../../../helpers/response-object";

export default async (req: Request, res: Response) => {
	try {
		const quiz = await db.quiz.findMany({
			take: 5,
		});

		return res.status(200).json(
			responseObject({
				message: "Retrived Quiz",
				data: quiz,
			})
		);
	} catch (error) {
		return errorHandler(res, error);
	}
};
