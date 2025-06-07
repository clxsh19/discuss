import express from 'express';
import logger from 'morgan';
import http from 'http';
import passport from 'passport';
import session from 'express-session';
import passportLocal from 'passport-local';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';

import { query } from './db/index';
import homeRouter from './routes/home';
import userRouter from './routes/user';
import subredditRouter from './routes/subreddit';
import postRouter from './routes/post';
import commentRouter from './routes/comment';

import path from 'path';
import ErrorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

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

//cros
app.use(
  cors({
    origin: 'http://localhost:3000',
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
      console.log(user_data);

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
  console.log('serialize');
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  console.log('deserialize');
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

// Session Middleware
app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));

// Routes
app.use('/', homeRouter);
app.use('/api/user', userRouter);
app.use('/api/subreddit', subredditRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
// Serve static files from the "uploads" folder
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// app.get('/success', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send('Login successful!');
//   } else {
//     res.send('Not authenticated');
//   }
// });

app.use(ErrorHandler);

const port: number = Number(process.env.PORT) || 5000;
// const host: string = process.env.HOST || 'localhost';
const host = '0.0.0.0';
const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
