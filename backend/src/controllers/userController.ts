import asyncHandler from 'express-async-handler';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import handleValidationErrors from '../utils/handleValidationErrors';
import { createUser } from '../services/userServices';
import CustomError from '../utils/customError';

type UserBody = {
  username: string;
  password: string;
};

type Info = {
  message: string;
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (err: Error, user: UserBody | null, info: Info) => {
      if (err) {
        return next(
          new CustomError('Unknown Error', 500, {
            errors: info?.message || 'Authentication error',
            location: '/userController/loginUser',
          }),
        );
      }
      if (!user) {
        return next(
          new CustomError('Authentication failed', 401, {
            errors: info?.message || 'Invalid credentials',
            location: '/userController/loginUser',
          }),
        );
      }

      // Establish session manually because callback provided to passport
      req.logIn(user, (loginErr) => {
        if (loginErr) return next(loginErr);

        res.status(200).json({
          success: true,
          message: 'User authentication successful',
        });
      });
    },
  )(req, res, next); // invoking the callback
};

const postRegister = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, 'userController/postRegister');
    const { username, password } = req.body;
    await createUser({ username, password });

    //login user after adding to db
    loginUser(req, res, next);
  },
);

const postLogin = asyncHandler(async (req, res, next) => {
  handleValidationErrors(req, 'userController/postLogin');
  loginUser(req, res, next);
});

const postLogout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(
          new CustomError('Unknown Error', 500, {
            errors: 'An error occurred during logout.',
            location: 'userController/postLogout',
          }),
        );
      }

      req.session.destroy((err) => {
        if (err) {
          return next(
            new CustomError('Unknown Error', 500, {
              errors: 'Failed to destroy session.',
              location: 'userController/postLogout',
            }),
          );
        }
        console.log('After logout : ', req.session);

        res.clearCookie('connect.sid', {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        res
          .status(200)
          .json({ success: true, message: 'User logout successful' });
      });
    });
  },
);

const getAuthStatus = (req: Request, res: Response) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const cookie = cookies.split('; ');
    console.log('User Cookies:', cookie);
  } else {
    console.log('User Status No Cookies');
  }
  res.json({ success: true, authenticated: true, user: req.user });
};

export default {
  postRegister,
  postLogin,
  postLogout,
  getAuthStatus,
};
