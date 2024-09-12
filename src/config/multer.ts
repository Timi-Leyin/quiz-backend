import multer from "multer";
import { TEMP_DIR } from "../constants";

export const multerUpload = multer({ dest: TEMP_DIR })