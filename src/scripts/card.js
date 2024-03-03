export {newCard, createCard, deleteCard}
import {initialCards} from './cards.js';
import {openModal} from './modal.js';

function zoomImage(image, deleteCard) {
  const imagePopup = document.querySelector('.popup_type_image');
  const imageLink = imagePopup.querySelector('.popup__image');
  const imageDescription = imagePopup.querySelector('.popup__caption');
  imageLink.src = image.link;
  imageDescription.textContent = image.name;
  openModal(imagePopup);
}

function likeCard(likeEvt) {
  likeEvt.classList.toggle('card__like-button_is-active');
}

const cardsContainer = document.querySelector('.places__list');
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (cardData, deleteCallback) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButtons = cardElement.querySelectorAll('.card__like-button');
  // @todo: DOM узлы
  cardElement.querySelector('.card__title').textContent = cardData.name, 
  cardElement.querySelector('.card__image').src = cardData.link, 
  cardElement.querySelector('.card__image').alt = `Фотография: ${cardData.name}`;
  cardElement.querySelector('.card__delete-button').addEventListener('click', ()=> deleteCallback(cardElement));
  cardElement.querySelector('.card__image').addEventListener('click', ()=> zoomImage(cardData));
  likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', ()=> {
      likeCard(likeButton);
    });
  });
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

const newCard = (card) => {
  cardsContainer.prepend(card);
}