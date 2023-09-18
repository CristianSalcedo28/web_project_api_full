import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.post('/signin', login);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
