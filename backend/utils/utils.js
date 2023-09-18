/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

export const generateAuthToken = (data) => {
  const token = jwt.sign({ _id: data._id }, 'secret', { expiresIn: '7d' });
  return token;
};
