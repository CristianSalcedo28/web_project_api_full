/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} no es un email válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(value) {
        const regex = /^(http|https):\/\/(www\.)?[\w.~:/?%#[\]@!$&'()*+,;=-]+[#]?$/;
        return regex.test(value);
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return new Error('Usuario no encontrado');
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return new Error('Contraseña incorrecta');
  }

  return user;
};

const User = mongoose.model('user', userSchema);

export default User;
