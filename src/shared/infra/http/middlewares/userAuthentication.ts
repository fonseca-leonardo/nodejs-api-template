import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@constants/authConfig';
import ErrorMessages from '@constants/errorMessages';

import ServerError from '@shared/errors/ServerError';

interface ITokenPayload {
  iat: number;
  exp: number;
  data: IUserTokenData;
}

export default function userAuthentication(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ServerError(ErrorMessages.MISSING_JWT, 401);
  }

  try {
    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);

    const { data } = decoded as ITokenPayload;

    request.user = data;

    return next();
  } catch (error) {
    throw new ServerError(ErrorMessages.INVALID_JWT, 401);
  }
}
