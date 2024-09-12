import { body } from "express-validator";

export const createArtistSchema = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be more than 3 characters"),
  body("focus")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Focus must be more than 3 characters"),
  body("portfolio")
    .trim()
    .isURL()
    .withMessage("Invalid portfolio URL")
    .optional(),
  body("custodianAccountAgreement")
    .isBoolean()
    .withMessage("You must agree to custodian account agreement to continue"),
  body("bio")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Bio must be more than 3 characters"),
  body("social").isArray().withMessage("Social must be an array").optional(),
];
