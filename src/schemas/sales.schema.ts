import { body } from "express-validator";

export const createSaleSchema = [
    body("artworkId").isString().trim(),
    body("price").isNumeric({no_symbols:true}).custom(value => {
        if (value <= 100) {
          throw new Error('Price must be greater than 100');
        }
        return true;
      }).withMessage("Price must be greater than 100"),
    body("artistRevenueShare").isNumeric({no_symbols:true}).custom(value => {
        if (value > 100) {
          throw new Error('artistRevenueShare cannot be greater than 100');
        }
        return true;
      }).withMessage("artistRevenueShare cannot be greater than 100"),
    body("creatorRevenue").isNumeric({no_symbols:true}),
    body("dateOfSale").isString(),
    body("notes").trim().isString().optional()
  ];
  