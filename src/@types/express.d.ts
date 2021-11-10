interface FormatedJsonOptions {
  success?: boolean;
  token?: string;
  message?: string;
}

declare namespace Express {
  export interface Response {
    body: any;
    formatedJson(data: any, options?: FormatedJsonOptions): this;
  }

  export interface Request {
    user?: IUserTokenData;
  }
}
