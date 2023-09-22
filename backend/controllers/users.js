/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateAuthToken } from '../utils/utils.js';

export const getUsers = async (req, res) => {
  try {
    const usersList = await User.find();
    return res.send({ data: usersList });
  } catch (err) {
    return ServerError('Ha ocurrido un error en el servidor');
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const getUser = await User.findById(userId).orFail();
    return res.send({ data: getUser });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'No se ha encontrado un usuario con ese ID' });
    }
    return res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};

const isUserExist = async (email) => {
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return new Error('Ha ocurrido un error en el servidor al buscar el usuario');
  }
  return !!user;
};

const hashPassword = async (password) => bcrypt.hash(password, 10);

export const createUser = async (req, res) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;

    const userExist = await isUserExist(email);
    if (userExist) {
      return res.status(409).send({ message: 'Ya existe un usuario con ese email' });
    }
    const passwordHash = await hashPassword(password);
    const newUser = await User.create({
      email, password: passwordHash, name, about, avatar,
    });
    return res.send({ data: newUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return BadRequestError('Se pasaron datos incorrectos');
    }
    return ServerError('Ha ocurrido un error en el servidor', err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User
      .findByIdAndUpdate(req.user._id, { name, about }, { new: true }).orFail();
    return res.send({ data: updatedUser });
  } catch (err) {
    if (err.name === 'CastError') {
      return BadRequestError('ID con formato incorrecto');
    }
    if (err.name === 'DocumentNotFoundError') {
      return NotFoundError('No se ha encontrado un usuario con ese ID');
    }
    return ServerError('Ha ocurrido un error en el servidor');
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedAvatar = await User
      .findByIdAndUpdate(req.user._id, { avatar }, { new: true }).orFail();
    return res.send({ data: updatedAvatar });
  } catch (err) {
    if (err.name === 'CastError') {
      return BadRequestError('ID con formato incorrecto');
    }
    if (err.name === 'DocumentNotFoundError') {
      return NotFoundError('No se ha encontrado un usuario con ese ID');
    }
    return ServerError('Ha ocurrido un error en el servidor');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);

    if (user && user instanceof Error) {
      return AuthenticationError(user.message);
    }

    const token = await generateAuthToken(user);
    return res.send({ token })
    ;}
    catch (err) {
      return AuthenticationError('Email o contraseña incorrectos')
    }
};
