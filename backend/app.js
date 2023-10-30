/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';
import users from './routes/users.js';
import cards from './routes/cards.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { auth } from './middlewares/auth.js';
import {
  createUser,
  login,
} from './controllers/users.js';
import { validateCreateUser, validateLogin } from './middlewares/validation.js';

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(`error connecting to the database ${err}`);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', users);
app.use('/cards', cards);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorLogger);

app.use(errors());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
