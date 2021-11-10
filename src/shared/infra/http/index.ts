import 'express-async-errors';

import cors from 'cors';
import express, { Express, Response, Request, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import ServerError from '../../errors/ServerError';
import ErrorMessages from '../../../constants/errorMessages';

export default class HttpServer {
  private server: Express;

  constructor() {
    this.server = express();
  }

  public async init() {
    this.middlewares();

    this.routes();

    this.errorHandler();

    return this.server;
  }

  private routes() {
    this.server.get('/ping', (req, res) => {
      return res.json({ data: 'pong' });
    });
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private errorHandler() {
    this.server.use(
      (
        err: Error | any,
        request: Request,
        response: Response,
        _: NextFunction,
      ) => {
        if (err instanceof ServerError) {
          response
            .status(err.statusCode)
            .formatedJson({}, { message: err.message, success: false });
        }

        if (isCelebrateError(err)) {
          return response.status(400).formatedJson(
            {},
            {
              message: err.details.get('body')?.details[0].message,
              success: false,
            },
          );
        }

        return response
          .status(500)
          .formatedJson({}, { message: ErrorMessages.SERVER_INTERNAL_ERROR });
      },
    );
  }
}
