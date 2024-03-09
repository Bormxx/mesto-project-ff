import { doc } from 'prettier';
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 
const editProfileButton = document.querySelector('.profile__edit-button'); //Кнопочка "редактировать профиль"
const addPlaceButton = document.querySelector('.profile__add-button'); //Кнопочка "добавить новое место"
const formEditProfile = document.querySelector('.popup_type_edit'); //Форма редактирования профиля
const formAddCard = document.querySelector('.popup_type_new-card'); //Форма добавления места
const profileTitle = document.querySelector('.profile__title'); //Поле ФИО
const profileDescription = document.querySelector('.profile__description'); //Поле описания
const nameInput = document.querySelector('.popup__input_type_name'); //Поле ввода ФИО в форме для редактирования профиля
const jobInput = document.querySelector('.popup__input_type_description'); //Поле ввода описания в форме для редактирования профиля
const cardsContainer = document.querySelector('.places__list');

//При открытии страницы начинаем слушать кнопки "Редактировать профиль" и "Добавить место"
editProfileButton.addEventListener('click', () => {//Это про "Редактировать профиль"
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  document.querySelector('.page').addEventListener('keydown', (evt)=> closePopup(formEditProfile, evt));
  formEditProfile.addEventListener('submit', (evt)=> formSubmit(formEditProfile, evt));
  formEditProfile.addEventListener('click', (evt) => closePopup(formEditProfile, evt));
  openModal(formEditProfile);
});
addPlaceButton.addEventListener('click', () => {//Это про "Добавить место"
  document.querySelector('.page').addEventListener('keydown', (evt)=> closePopup(formAddCard, evt));
  formAddCard.addEventListener('submit', (evt)=> formSubmit(formAddCard, evt));
  formAddCard.addEventListener('click', (evt) => closePopup(formAddCard, evt));
  openModal(formAddCard);
});

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card.remove();
}

//Удалим обработчики и закроем попапу
function closePopup(Popup, evt){
  if (evt.keyCode === 27 || evt.target === evt.currentTarget || evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button')) {
    document.querySelector('.page').removeEventListener('keydown', (evt)=> closeModal(Popup, evt));
    Popup.removeEventListener('click', (evt) => closeModal(Popup, evt));
    document.querySelector('.popup').removeEventListener('submit', (evt)=> formSubmit(evt));
    closeModal(Popup);
  }
}

//Работаем с формами после "submit"
function formSubmit(forma, evt) {
  evt.preventDefault();
  evt.stopImmediatePropagation();
  const placeName = document.querySelector('.popup__input_type_card-name');
  const placeUrl = document.querySelector('.popup__input_type_url');
  if (evt.currentTarget.classList.contains('popup_type_edit')) {//Если сабмит на "Редактировать профиль"
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  } else if (evt.currentTarget.classList.contains('popup_type_new-card')) {//Если сабмит на "Добавить место"
    const addCard = {
      name: placeName.value,
      link: placeUrl.value
    }
    cardsContainer.prepend(createCard(addCard, deleteCard, zoomImage, likeCard));
  }
  placeName.value = '';
  placeUrl.value = '';
  closePopup(forma, evt);
}

//Увеличим картинку
const zoomImage = (card) => {
  const imagePopup = document.querySelector('.popup_type_image');
  imagePopup.querySelector('.popup__image').src = card.querySelector('.card__image').src;
  imagePopup.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
  imagePopup.addEventListener('click', (evt) => closePopup(imagePopup, evt));
  document.querySelector('.page').addEventListener('keydown', (evt)=> closePopup(imagePopup, evt));
  openModal(imagePopup);
}

//Поставим лайкос
function likeCard(likeEvt) { 
  likeEvt.classList.toggle('card__like-button_is-active'); 
}

//Инициализируем карточки
initialCards.forEach(cardData => {
  // @todo: Вывести карточки на страницу 
  cardsContainer.append(createCard(cardData, deleteCard, zoomImage, likeCard));
});