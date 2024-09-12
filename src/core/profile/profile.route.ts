import { Router } from "express";
import { ROUTES } from "../../constants/routes";
import myProfileController from "./controllers/my-profile.controller";
import othersProfileController from "./controllers/others-profile.controller";

const profileRoutes = Router();

profileRoutes.get(ROUTES.INDEX, myProfileController);
profileRoutes.get(ROUTES.INDEX_ID, othersProfileController);
// profileRoutes.post(ROUTES.CREATE_STORE, createStoreSchema, bodyValidation,fileRequired(["profilePhoto"]), createStore);

export default profileRoutes;
