import { body } from "express-validator";

export const newArtworkSchema = [
  body("title")
    .isString()
    .trim()
    .withMessage("Artwork title is Required")
    .isLength({ min: 3 })
    .withMessage("Artwork title must be at least 3 characters"),
  body("artistId").isString().trim().optional(),

  body("description")
    .isString()
    .trim()
    .withMessage("Description is Required")
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters"),

  body("categories")
    .isArray()
    .withMessage("Categories must be an array")
    .custom((value) => {
      return value.every((item: any) => typeof item === "string");
    })
    .withMessage("All categories must be strings"),

  body("tags")
    .isArray()
    .withMessage("Categories must be an array")
    .custom((value) => {
      return value.every((item: any) => typeof item === "string");
    })
    .withMessage("All categories must be strings"),

  body("type")
    .isString()
    .matches(new RegExp(/(draft)|(published)/, "i"))
    .withMessage("Type must be 'DRAFT' or 'PUBLISHED' "),
];
