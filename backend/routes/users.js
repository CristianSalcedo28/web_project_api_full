import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
