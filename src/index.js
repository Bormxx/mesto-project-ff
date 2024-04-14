import { doc } from 'prettier';
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, likeCard, deleteCard} from './scripts/card.js';
import {openModal, closeModal, closePopup} from './scripts/modal.js';
import {getInitialCards, getAuthor, editAccount, editAvatar, addPlace} from './scripts/api.js';
import {enableValidation, clearValidation} from './scripts/validation.js';

// const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
// const doubledNumbers = numbers.map(number => number * 2);
// console.log(doubledNumbers); // 4, 6, 10

const editProfileButton = document.querySelector('.profile__edit-button'); //Кнопочка "редактировать профиль"
const editAvatarButton = document.querySelector('.profile__image-blackout'); //Кнопочка "редактировать аватарку"
const addPlaceButton = document.querySelector('.profile__add-button'); //Кнопочка "добавить новое место"
const profilePopup = document.querySelector('.popup_type_edit'); //Попап редактирования профиля
profilePopup.querySelector('.popup__form').addEventListener('submit', (evt)=> handleProfileFormSubmit(profilePopup, evt));
profilePopup.addEventListener('click', (evt) => closePopup(profilePopup, evt));
const cardPopup = document.querySelector('.popup_type_new-card'); //Попап добавления места
cardPopup.querySelector('.popup__form').addEventListener('submit', (evt)=> handlePlaceFormSubmit(cardPopup, evt));
cardPopup.addEventListener('click', (evt) => closePopup(cardPopup, evt));
const avatarPopup = document.querySelector('.popup_type_edit-avatar'); //Попап редактирования аватара
avatarPopup.querySelector('.popup__form').addEventListener('submit', (evt)=> handleAvatarFormSubmit(avatarPopup, evt));
avatarPopup.addEventListener('click', (evt) => closePopup(avatarPopup, evt));
const profileTitle = document.querySelector('.profile__title'); //Поле ФИО
const profileDescription = document.querySelector('.profile__description'); //Поле описания
const nameInput = document.querySelector('.popup__input_type_name'); //Поле ввода ФИО в форме для редактирования профиля
const jobInput = document.querySelector('.popup__input_type_description'); //Поле ввода описания в форме для редактирования профиля
const placeInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const urlAvatarInput = avatarPopup.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.places__list');
const avatarElementUrlCSS = document.getElementById('idAvatar');
let likeAmount = [];
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let idAutor = null;
let idLikeByAuthor = null;


getAuthor()
  .then((data) => {
    // console.log(data);
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    idAutor = data._id;
    avatarElementUrlCSS.style['background-image'] = `url('${data.avatar}')`;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//При открытии страницы начинаем слушать кнопки "Редактировать профиль" и "Добавить место"
editProfileButton.addEventListener('click', () => {//Это про "Редактировать профиль"
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profilePopup.querySelector(validationConfig.formSelector), validationConfig);
  openModal(profilePopup);
  disableOnStart(profilePopup, validationConfig);
});
addPlaceButton.addEventListener('click', () => {//Это про "Добавить место"
  placeInput.value = '';
  urlInput.value = '';
  openModal(cardPopup);
  disableOnStart(cardPopup, validationConfig);
});
editAvatarButton.addEventListener('click', () => {
  openModal(avatarPopup);
  disableOnStart(avatarPopup, validationConfig);
})

const disableOnStart = (form, validationConfig) => {
  form.querySelector(validationConfig.submitButtonSelector).setAttribute('disabled', true);
  const button = form.querySelector(validationConfig.submitButtonSelector);
  button.classList.add(validationConfig.inactiveButtonClass);
}

//Отдельная функция "submit" для редактирования профиля
function handleProfileFormSubmit(popup, evt) {
  evt.preventDefault();
  editAccount(nameInput.value, jobInput.value, popup)
  .then(() => {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
  closeModal(popup);
}

//Отдельная функция "submit" для редактирования аватара
function handleAvatarFormSubmit(popup, evt) {
  evt.preventDefault();
  editAvatar(urlAvatarInput.value)
  .then(() => {
    avatarElementUrlCSS.style['background-image'] = `url('${urlAvatarInput.value}')`;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
  closeModal(popup);
}

enableValidation(validationConfig);

//Отдельная функция "submit" для добавления места
function handlePlaceFormSubmit(popup, evt) {
  evt.preventDefault();
  const popupName = placeInput;
  const popupUrl = urlInput;
  const addCard = {
    name: popupName.value,
    link: popupUrl.value
  }
  addPlace(popupName.value, popupUrl.value, popup)
  .then((res) => {
    cardsContainer.prepend(createCard(addCard, deleteCard, zoomImage, likeCard, res.likes.length, null, res._id));
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
  popupName.value = '';
  popupUrl.value = '';
  closeModal(popup);
}

//Увеличим картинку
const zoomImage = (card) => {
  const imagePopup = document.querySelector('.popup_type_image');
  imagePopup.querySelector('.popup__image').src = card.link; 
  imagePopup.querySelector('.popup__caption').textContent = card.name;
  imagePopup.addEventListener('click', (evt) => closePopup(imagePopup, evt));
  openModal(imagePopup);
}

//Инициализируем карточки
getInitialCards()
  .then((result) => {
    // console.log(result);
    let i = 0;
    let idLike = null;
    result.forEach(cardData => {//Расставляем количество лайков, подсветку сердечка, корзину удаления
      likeAmount = result[i].likes.length;
      idLikeByAuthor = null;
      let deleteBasket = false;
      if(result[i].owner._id != idAutor){
        deleteBasket = true;
      }
      result[i].likes.forEach((res) => {
        if(res._id === idAutor){
          idLikeByAuthor = result[i]._id;
        };
      });
      idLike = result[i]._id;
      cardsContainer.append(createCard(cardData, deleteCard, zoomImage, likeCard, likeAmount, idLikeByAuthor, idLike, deleteBasket));
      i++;
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

