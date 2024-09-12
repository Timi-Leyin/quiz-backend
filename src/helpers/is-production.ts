import { ENV } from "../constants/env";

export default () => {
  return ENV.NODE_ENV.toLowerCase() == "production";
};
