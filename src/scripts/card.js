import {addLike, disLike, removePlace} from './api.js';
import {openModal, closeModal, closePopup} from './modal.js';
let idImg = '';
let likeSpan = '';
let removeCard = '';
let submitDelete = '';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const createCard = (cardData, deleteCallback, openImage, cardLike, likeAmount, idLikeByAuthor, idLike, deleteBasket) => {  
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.like-count').textContent = likeAmount;
  cardElement.querySelector('.card__title').textContent = cardData.name, 
  cardImage.src = cardData.link, 
  cardImage.alt = `Фотография: ${cardData.name}`;
  deleteButton.addEventListener('click', ()=> {
    removeCard = idLike;
    deleteCallback(cardElement);
  });
  cardImage.addEventListener('click', ()=> openImage(cardData));
  likeButton.addEventListener('click', ()=> {
    idImg = idLike;
    cardLike(likeButton);
    likeSpan = cardElement.querySelector('.like-count');
  });
  if (idLikeByAuthor != null) {
    likeButton.classList.add('card__like-button_is-active');
  } else likeButton.classList.remove('card__like-button_is-active');
  if (deleteBasket) {
    deleteButton.classList.add('card__delete-button-disable');
  } else deleteButton.classList.remove('card__delete-button-disable');
  return cardElement;
}
const confirmPopup = document.querySelector('.popup_type_delete-card');
confirmPopup.querySelector('.popup__form').addEventListener('submit', (evt)=> handleDeleteSubmit(confirmPopup, evt));
confirmPopup.addEventListener('click', (evt) => closePopup(confirmPopup, evt));

//Поставим лайкос ...или снимем.
function likeCard(likeEvt) { 
  likeEvt.classList.toggle('card__like-button_is-active'); 
  if (likeEvt.classList.contains('card__like-button_is-active')){
    addLike(idImg)
    .then((result) => {
      likeSpan.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  } else {
    disLike(idImg)
    .then((result) => {
      likeSpan.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  }
}

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  submitDelete = card;
  openModal(confirmPopup);
}

function handleDeleteSubmit(popup, evt) {
  evt.preventDefault();
  removePlace(removeCard)
    .then((result) => {
      submitDelete.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  closeModal(popup);
}

export {createCard, likeCard, deleteCard};