import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import { db } from "../../../config/database";
import responseObject from "../../../helpers/response-object";
import { LEVEL } from "@prisma/client";

export default async (req: Request, res: Response) => {
	try {
		const { question, answers, explanation, level } = req.body;
		const quiz = await db.quiz.create({
			data: {
				question,
				level: level as LEVEL,
				explanation,
				answer: {
					create: answers.map((answer: any) => ({
						correct: Boolean(answer.correct),
						text: answer.text,
					})),
				},
				by: {
					connect: {
						// @ts-ignore
						uuid: req.user.uuid,
					},
				},
			},
		});
		return res.status(201).json(
			responseObject({
				message: "Quiz Created Successfully",
			})
		);
	} catch (error) {
		return errorHandler(res, error);
	}
};
