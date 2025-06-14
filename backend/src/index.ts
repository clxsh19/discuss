import express from 'express';
import logger from 'morgan';
import http from 'node:http';
import passport from 'passport';
import session from 'express-session';
import passportLocal from 'passport-local';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import connectPgSimple from 'connect-pg-simple';
import rateLimit from 'express-rate-limit';

import { query, pool } from './db/index';
import homeRouter from './routes/home';
import userRouter from './routes/user';
import subredditRouter from './routes/subreddit';
import postRouter from './routes/post';
import commentRouter from './routes/comment';

import ErrorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Environment-specific configuration
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

app.set('trust proxy', 1);
// app.set('trust proxy', 'loopback');

// Extending Express.User defined in @types/passport
declare global {
  namespace Express {
    interface User {
      username: string;
      id?: number;
    }
    namespace Multer {
      interface File {
        cloudinary?: any;
      }
    }
  }
}

//cors

const corsOrigins = isDevelopment
  ? ['http://localhost:3000', 'http://127.0.0.1:3000']
  : [process.env.FRONTEND_URL as string].filter(Boolean);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true, // Allow cookies if using authentication
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Passport Local Strategy
const localStrategy = passportLocal.Strategy;

passport.use(
  'local',
  new localStrategy(async (username, password, done) => {
    try {
      const result = await query(
        'SELECT user_id as id, username, password_hash FROM users WHERE username = $1',
        [username],
      );
      const user_data = result.rows[0];

      if (!user_data) {
        return done(null, false, {
          message: 'Incorrect username or password.',
        });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user_data.password_hash,
      );
      if (!passwordMatch) {
        return done(null, false, {
          message: 'Incorrect username or password.',
        });
      }

      const user = { id: user_data.id, username: user_data.username };
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await query(
      'SELECT user_id, username FROM users WHERE user_id = $1',
      [id],
    );
    const user_data = result.rows[0];
    if (!user_data) {
      return done(new Error('User not found'), null);
    }
    const user = { id: user_data.user_id, username: user_data.username };
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pgSession = connectPgSimple(session);
// Session Middleware
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'user_sessions',
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET_KEY!,
    resave: false,
    proxy: isProduction,
    saveUninitialized: false,
    name: 'sessionid',
    cookie: {
      sameSite: isProduction ? 'none' : 'strict',
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      // domain: undefined, // Let browser set automatically
      path: '/',
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));

// General rate limiting for all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: isDevelopment
    ? (req) => {
        // Skip rate limiting for localhost in development
        return req.ip === '127.0.0.1' || req.ip === '::1';
      }
    : undefined,
});
app.use(generalLimiter);

// Routes
app.use('/', homeRouter);
app.use('/api/user', userRouter);
app.use('/api/subreddit', subredditRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

app.use(ErrorHandler);

const port: number = Number(process.env.PORT) || 5000;
// const host: string = process.env.HOST || 'localhost';
const host: string = isProduction ? '0.0.0.0' : 'localhost';
const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
