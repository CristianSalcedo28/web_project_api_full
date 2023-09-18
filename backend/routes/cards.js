import express from 'express';
import {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getCards);
router.post('/', postCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

export default router;
