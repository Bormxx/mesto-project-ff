// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (cardData, deleteCallback, openImage, cardLike) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  // @todo: DOM узлы
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardElement.querySelector('.card__title').textContent = cardData.name, 
  cardImage.src = cardData.link, 
  cardImage.alt = `Фотография: ${cardData.name}`;
  cardElement.querySelector('.card__delete-button').addEventListener('click', ()=> deleteCallback(cardElement));
  cardImage.addEventListener('click', ()=> openImage(cardElement));
  likeButton.addEventListener('click', ()=> cardLike(likeButton));
  return cardElement;
}

//Поставим лайкос
function likeCard(likeEvt) { 
  likeEvt.classList.toggle('card__like-button_is-active'); 
}

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card.remove();
}

export {createCard, likeCard, deleteCard};