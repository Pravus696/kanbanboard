import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Define the secret key for the JWT token
const secretkey = process.env.JWT_SECRET_KEY || ` `;
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    // get the authorization header from the request
    const authHeader = req.headers['authorization'];
    // check for present authorization header
    if (authHeader) {
        // get the token from the authorization header
        const token = authHeader.split(' ')[1];
        // verify the token
        jwt.verify(token, secretkey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // add the user data to the request object
            req.user = user;
            return next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
