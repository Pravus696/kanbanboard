import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// Define the payload of the JWT token
interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  // get the authorization header from the request
  const authHeader = req.headers['authorization'];
  // check for present authorization header
  if (authHeader) {
    // get the token from the authorization header
    const token = authHeader.split(' ')[1];
    const secretkey = process.env.JWT_SECRET || '';
    // verify the token
    jwt.verify(token, secretkey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      // add the user data to the request object
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401);
  }
};

