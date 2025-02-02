import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import {query} from "../db/index";
import bcrypt from "bcrypt";
import passport, { session } from "passport";
import { Request, Response, NextFunction } from 'express';

type UserBody = {
  username: string,
  password: string   
};

type Info = {
    message: string;
};

const user_register = [
  body('username', 'Username must not be empty').trim().isLength({min:1}).escape(),
  body('password', 'Password must not be empty').trim().isLength({min:1}).escape(),

  asyncHandler(async(req, res, next) => {
      const errors = validationResult(req);
      const { username, password } = req.body;
      console.log(username);
      console.log(password);

      if (!errors.isEmpty()) {
          res.status(400).json({ 
              message: 'Username and password are required',
              username: req.body.username,
              password: req.body.password,
          });
      };
      const user_exists_query = await query(`SELECT EXISTS (
        SELECT 1 FROM users WHERE username = $1 )`, [username] 
      );
      const user_exists = user_exists_query.rows[0].exists;
      if (user_exists) {
        res.status(403).json({ error: 'User registration failed' });
      } else { // add user to db
        const hashedPassword = bcrypt.hashSync(password, 10);
        await query("INSERT INTO users (username, password_hash) VALUES ($1, $2)",
        [username, hashedPassword]);
        // res.status(202).json({
        //     message: 'User registered successfully',
        // });
        //login user after adding to db
        passport.authenticate('local', (err: Error, user: UserBody, info: Info) => {
          if (err) {
            return res.status(500).json({ error: 'An error occurred during authentication' });
          }
          if (!user) {
            return res.status(401).json({ error: info.message || 'Authentication failed' });
          }
          // This part is needed to establish a session manually, otherwise, `req.user` will not be set.
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            return res.status(201).json({ msg: 'user registration and login successfull'});
          });
        })(req, res, next);
      };
  }), 
];

const user_login = [
  body('username', 'Username must not be empty').trim().isLength({min:1}).escape(),
  body('password', 'Password must not be empty').trim().isLength({min:1}).escape(),
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: UserBody, info: Info) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred during authentication' });
      }
      if (!user) {
        return res.status(401).json({ error: info.message || 'Authentication failed' });
      }
  
      // This part is needed to establish a session manually, otherwise, `req.user` will not be set.
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(201).json({ msg: 'login successfull' });
      });
    })(req, res, next);
  }
];

// const user_login = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate('local', (err: Error, user: UserBody, info: Info) => {
//     if (err) {
//       return res.status(500).json({ error: 'An error occurred during authentication' });
//     }
//     if (!user) {
//       return res.status(401).json({ error: info.message || 'Authentication failed' });
//     }

//     // This part is needed to establish a session manually, otherwise, `req.user` will not be set.
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.status(201).json({ msg: 'h7' });
//     });
//   })(req, res, next);
// };

// const user_logout = (req: Request, res: Response) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ error: 'An error occurred during logout' });
//     }
//     res.clearCookie('connect.sid', { httpOnly: true, secure: false, sameSite: 'strict' });
//     res.status(200).json({ msg: 'Logout successful' });
//   });
// };

const user_logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred during logout' });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to destroy session' });
      }

      res.clearCookie('connect.sid', { path: '/', httpOnly: true, secure: false, sameSite: 'strict' });
      res.status(200).json({ msg: 'Logout successful' });
    });
  });
};


const user_status = (req: Request, res: Response) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const cookie = cookies.split('; ');
    console.log('User Cookies:', cookies);
  } else {
    console.log('User Status No Cookies')
  }  
  res.json({ authenticated: true, user: req.user });
};
// const user_login = [ passport.authenticate('local'),
//   (err:Error, req: Request, res: Response) => {
//     res.status(201).json({ msg: "h7" });
//   }
// ];

export default {
  user_register,
  user_login,
  user_logout,
  user_status
}