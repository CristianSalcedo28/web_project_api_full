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
router.put('/likes/:cardId', likeCard);
router.delete('/likes/:cardId', dislikeCard);

export default router;
