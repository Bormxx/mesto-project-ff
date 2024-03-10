import { doc } from 'prettier';
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, likeCard, deleteCard} from './scripts/card.js';
import {openModal, closeModal, closePopup} from './scripts/modal.js';

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers); // 4, 6, 10

const editProfileButton = document.querySelector('.profile__edit-button'); //Кнопочка "редактировать профиль"
const addPlaceButton = document.querySelector('.profile__add-button'); //Кнопочка "добавить новое место"
const formEditProfile = document.querySelector('.popup_type_edit'); //Форма редактирования профиля
formEditProfile.addEventListener('submit', (evt)=> formSubmitProfile(formEditProfile, evt));
formEditProfile.addEventListener('click', (evt) => closePopup(formEditProfile, evt));
const formAddCard = document.querySelector('.popup_type_new-card'); //Форма добавления места
formAddCard.addEventListener('submit', (evt)=> formSubmitPlace(formAddCard, evt));
formAddCard.addEventListener('click', (evt) => closePopup(formAddCard, evt));
const profileTitle = document.querySelector('.profile__title'); //Поле ФИО
const profileDescription = document.querySelector('.profile__description'); //Поле описания
const nameInput = document.querySelector('.popup__input_type_name'); //Поле ввода ФИО в форме для редактирования профиля
const jobInput = document.querySelector('.popup__input_type_description'); //Поле ввода описания в форме для редактирования профиля
const cardsContainer = document.querySelector('.places__list');

//При открытии страницы начинаем слушать кнопки "Редактировать профиль" и "Добавить место"
editProfileButton.addEventListener('click', () => {//Это про "Редактировать профиль"
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(formEditProfile);
});
addPlaceButton.addEventListener('click', () => {//Это про "Добавить место"
  openModal(formAddCard);
});

//Отдельная функция "submit" для редактирования профиля
function formSubmitProfile(popup, evt) {
  evt.preventDefault();
  evt.stopImmediatePropagation();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popup);
}

//Отдельная функция "submit" для добавления места
function formSubmitPlace(popup, evt) {
  evt.preventDefault();
  evt.stopImmediatePropagation();
  const addCard = {
    name: document.querySelector('.popup__input_type_card-name').value,
    link: document.querySelector('.popup__input_type_url').value
  }
  cardsContainer.prepend(createCard(addCard, deleteCard, zoomImage, likeCard));
  document.querySelector('.popup__input_type_card-name').value = '';
  document.querySelector('.popup__input_type_url').value = '';
  closeModal(popup);
}

//Увеличим картинку
const zoomImage = (card) => {
  const imagePopup = document.querySelector('.popup_type_image');
  imagePopup.querySelector('.popup__image').src = card.querySelector('.card__image').src;
  imagePopup.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
  imagePopup.addEventListener('click', (evt) => closePopup(imagePopup, evt));
  openModal(imagePopup);
}

//Инициализируем карточки
initialCards.forEach(cardData => {
  // @todo: Вывести карточки на страницу 
  cardsContainer.append(createCard(cardData, deleteCard, zoomImage, likeCard));
});