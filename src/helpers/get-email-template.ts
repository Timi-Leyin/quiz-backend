import path from "path";
import Handlebars from "handlebars";
import { emailTemplateOptions } from "../types/helpers";
import { CWD } from "../constants";
import fs from "fs";
type PathType =  "/emails/invite.hbs";
export default ($path: PathType, data?: emailTemplateOptions) => {
  const templatePath = path.join(CWD, "templates", $path);
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(templateContent);
  return template(data);
};
