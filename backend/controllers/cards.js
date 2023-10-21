import Card from '../models/card.js';

export const getCards = async (req, res) => {
  try {
    const cardsList = await Card.find();
    return res.send(cardsList);
  } catch (err) {
    return res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const postCard = async (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  try {
    const newCard = await Card.create({ name, link, owner: _id });
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(400).send('Error al crear la card', error);
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const selectedCard = await Card.findById(cardId).orFail();
    if (selectedCard.owner.valueOf() === req.user._id) {
      const deletedCard = await Card.findByIdAndRemove(cardId);
      return res.send({ data: deletedCard });
    }
    return res.status(403).send({ message: 'No tienes permiso para borrar esta carta' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'No se ha encontrado la carta' });
    }
    return res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    console.log(cardId)
    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send(likedCard);
  } catch (err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'No se ha encontrado la carta' });
    }
    return res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const dislikedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send(dislikedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'No se ha encontrado la carta' });
    }
    return res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
  }
};