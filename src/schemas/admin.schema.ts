import { body } from "express-validator";

export const createArtistManagerSchema = [
  body("email")
    .isString()
    .trim()
    .isEmail()
    .withMessage("Invalid Email Address"),
  body("firstName")
    .isString()
    .trim()
    .withMessage("First Name is Required")
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 3 characters"),
  body("lastName")
    .trim()
    .isString()
    .withMessage("First Name is Required")
    .isLength({ min: 3 })
    .withMessage("Last Name must be at least 3 characters"),
  body("phone").trim().isString(),
  body("artists").isArray().optional(),
  body("bio").trim().isString().optional(),
];
