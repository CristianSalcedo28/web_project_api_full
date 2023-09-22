import express from 'express';
import mongoose from 'mongoose';
import users from './routes/users.js';
import cards from './routes/cards.js';
import errors from 'celebrate';
import celebrate from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger.js';

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

app.use(requestLogger); // the request logger

app.use('/users', users);
app.use('/cards', cards);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorLogger); // the error logger

app.use(errors());// controlador de errores de celebrate

app.use(error);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
