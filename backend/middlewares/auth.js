/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).send({ message: 'No se ha enviado el token' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    if (!payload) {
      return res.status(403).send({ message: 'El token no es válido' });
    }

    req.user = payload;
    return next();
  } catch (err) {
    return res.status(403).send({ message: 'El token no es válido' });
  }
};
