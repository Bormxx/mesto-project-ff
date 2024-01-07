const cardsContainer = document.querySelector('.places__list');
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (cardData, deleteCallback) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  // @todo: DOM узлы
  cardElement.querySelector('.card__title').textContent = cardData.name, 
  cardElement.querySelector('.card__image').src = cardData.link, 
  cardElement.querySelector('.card__image').alt = `Фотография: ${cardData.name}`;
  cardElement.querySelector('.card__delete-button').addEventListener('click', ()=> deleteCallback(cardElement));
  return cardElement;
}
// @todo: Функция удаления карточки
  const deleteCard = (card) => {
    card.remove();
  }
initialCards.forEach(cardData => {
  // @todo: Вывести карточки на страницу 
  cardsContainer.append(createCard(cardData, deleteCard));
});