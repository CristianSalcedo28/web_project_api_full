/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
const { NODE_ENV, JWT_SECRET } = process.env; // ver esto

export const generateAuthToken = (data) => {
  const token = jwt.sign({ _id: data._id },  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
  return token;
};
