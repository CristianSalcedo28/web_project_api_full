import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
} from '../controllers/users.js';
import { validateCreateUser, validateLogin } from '../middlewares/validation.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
