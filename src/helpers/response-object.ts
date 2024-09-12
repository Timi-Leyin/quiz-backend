import { ResponseObject } from "../types/helpers";

export default ({ message, data, errors, accessToken }: ResponseObject) => {
  return {
    message,
    data,
    errors,
    accessToken,
  };
};
