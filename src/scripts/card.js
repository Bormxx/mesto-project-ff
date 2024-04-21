import {addLike, disLike} from './api.js';

let likeSpan = '';
const cardTemplate = () => document.querySelector('#card-template').content.querySelector('.places__item').cloneNode(true);
const createCard = (cardData, deleteCard, zoomImage, likeCard, idAuthor) => {  
  const cardElement = cardTemplate();
  cardElement.querySelector('.card__title').textContent = cardData.name; 
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link; 
  cardImage.alt = `Фотография: ${cardData.name}`;
  cardImage.addEventListener('click', () => zoomImage(cardData));
  const likeButton = cardElement.querySelector('.card__like-button');
  const isLiked = cardData.likes.some((like) => like._id === idAuthor);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  } else likeButton.classList.remove('card__like-button_is-active');
  cardElement.querySelector('.like-count').textContent = cardData.likes.length;
  likeButton.addEventListener('click', ()=> {
    likeCard(cardElement, cardData);
    likeSpan = cardElement.querySelector('.like-count');
  });
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardData.owner._id === idAuthor && deleteCard) {
    deleteButton.addEventListener('click', ()=> {
    // removeCard = cardData._id;
    deleteCard(cardData._id, cardElement);
  });
  } else deleteButton.remove();
  return cardElement;
};



const likeCard = (cardElement, cardData) => {
  const likeSpan = cardElement.querySelector('.like-count');
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
  if (likeButton.classList.contains('card__like-button_is-active')){
    addLike(cardData._id)
    .then((result) => {
      likeSpan.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  } else {
    disLike(cardData._id)
    .then((result) => {
      likeSpan.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  };
};





export {createCard, likeCard};