export interface ResponseObject {
  message: string;
  data?: unknown;
  errors?: unknown;
  accessToken?: string;
}

export interface MailOptions {
  to: string;
  subject: string;
  html: string;

}

export interface emailTemplateOptions{
  
}