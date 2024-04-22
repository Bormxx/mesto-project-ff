import { doc } from 'prettier';
import './pages/index.css';
import {openModal, closeModal, closePopup} from './scripts/modal.js';
import {createCard, likeCard} from './scripts/card.js';
import {getInitialCards, getAuthor, addPlace, removePlace, editAvatar, editAccount} from './scripts/api.js';
import {enableValidation, clearValidation} from './scripts/validation.js';

const avatarElementUrlCSS = document.getElementById('idAvatar');
const cardsContainer = document.querySelector('.places__list');
const popupZoomImage = document.querySelector('.popup_type_image');
const imagePopup = popupZoomImage.querySelector('.popup__image');
const imageCaption = popupZoomImage.querySelector('.popup__caption');
const confirmPopup = document.querySelector('.popup_type_delete-card');
const addPlaceButton = document.querySelector('.profile__add-button'); //Кнопочка "добавить новое место"
const cardPopup = document.querySelector('.popup_type_new-card'); //Попап добавления места
const placeInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const avatarPopup = document.querySelector('.popup_type_edit-avatar'); //Попап редактирования аватара
const editAvatarButton = document.querySelector('.profile__image-blackout'); //Кнопочка "редактировать аватарку"
const urlAvatarInput = avatarPopup.querySelector('.popup__input_type_url');
const editProfileButton = document.querySelector('.profile__edit-button'); //Кнопочка "редактировать профиль"
const profilePopup = document.querySelector('.popup_type_edit'); //Попап редактирования профиля
const profileTitle = document.querySelector('.profile__title'); //Поле ФИО
const profileDescription = document.querySelector('.profile__description'); //Поле описания
const nameInput = document.querySelector('.popup__input_type_name'); //Поле ввода ФИО в форме для редактирования профиля
const jobInput = document.querySelector('.popup__input_type_description'); //Поле ввода описания в форме для редактирования профиля
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let idAuthor = '';
let idCard = '';
let elementCard = '';

//Слушатели событий
cardPopup.querySelector(validationConfig.formSelector).addEventListener('submit', (evt)=> handlePlaceFormSubmit(cardPopup, evt));
cardPopup.addEventListener('click', (evt) => closePopup(cardPopup, evt));
avatarPopup.querySelector(validationConfig.formSelector).addEventListener('submit', (evt)=> handleAvatarFormSubmit(avatarPopup, evt));
avatarPopup.addEventListener('click', (evt) => closePopup(avatarPopup, evt));
profilePopup.querySelector(validationConfig.formSelector).addEventListener('submit', (evt)=> handleProfileFormSubmit(profilePopup, evt));
profilePopup.addEventListener('click', (evt) => closePopup(profilePopup, evt));
confirmPopup.querySelector('.popup__form').addEventListener('submit', (evt)=> handleDeleteSubmit(confirmPopup, evt, idCard, elementCard));

//Выключаем проверку при старте
const disableOnStart = (form, validationConfig) => {
  form.querySelector(validationConfig.submitButtonSelector).setAttribute('disabled', true);
  const button = form.querySelector(validationConfig.submitButtonSelector);
  button.classList.add(validationConfig.inactiveButtonClass);
}


//Всё про удаление карточки, включая иконку корзины
//Наставник долго отвечает. Я не люблю ждать)) Надеюсь, с удалением теперь всё норм. Некрасиво, но, вроде, норм.
const deleteCard = (cardId, cardElement) => {
  openModal(confirmPopup);
  idCard = cardId;
  elementCard = cardElement;
  confirmPopup.addEventListener('click', (evt) => closePopup(confirmPopup, evt));
}

function handleDeleteSubmit(popup, evt, idCard, cardElement) {
  evt.preventDefault();
  removePlace(idCard)
    .then((result) => {
      cardElement.remove();
      closeModal(popup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

//Увеличение картинки
const zoomImage = (card) => {
  imagePopup.src = card.link;
  imageCaption.textContent = card.name;
  openModal(popupZoomImage);
  popupZoomImage.addEventListener('click', (evt) => closePopup(popupZoomImage, evt));
}

//Всё про добавление новой карточки
addPlaceButton.addEventListener('click', () => {//Это про "Добавить место"
  openModal(cardPopup);
  disableOnStart(cardPopup, validationConfig);
});

enableValidation(validationConfig);

function handlePlaceFormSubmit(popup, evt) {
  evt.preventDefault();
  const popupName = placeInput;
  const popupUrl = urlInput;
  const cardData = {
    name: popupName.value,
    link: popupUrl.value
  }
  popup.querySelector('.popup__button').textContent = 'Сохранить...';
  addPlace(popupName.value, popupUrl.value)
  .then((cardData) => {
    cardsContainer.prepend(createCard(cardData, deleteCard, zoomImage, likeCard, idAuthor));
    closeModal(popup);
    popupName.value = '';
    popupUrl.value = '';
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    popup.querySelector('.popup__button').textContent = 'Сохранить';
  });
};

//Всё про редактирование аватара
editAvatarButton.addEventListener('click', () => {
  openModal(avatarPopup);
  disableOnStart(avatarPopup, validationConfig);
});

function handleAvatarFormSubmit(popup, evt) {
  evt.preventDefault();
  popup.querySelector('.popup__button').textContent = 'Сохранить...';
  editAvatar(urlAvatarInput.value)
  .then(() => {
    avatarElementUrlCSS.style['background-image'] = `url('${urlAvatarInput.value}')`;
    closeModal(popup);
    urlAvatarInput.value = '';
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    popup.querySelector('.popup__button').textContent = 'Сохранить';
  });
};

//Всё про редактирование профиля автора
editProfileButton.addEventListener('click', () => {//Это про "Редактировать профиль"
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profilePopup.querySelector(validationConfig.formSelector), validationConfig);
  openModal(profilePopup);
  disableOnStart(profilePopup, validationConfig);
});

function handleProfileFormSubmit(popup, evt) {
  evt.preventDefault();
  popup.querySelector('.popup__button').textContent = 'Сохранить...';
  editAccount(nameInput.value, jobInput.value)
  .then(() => {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    popup.querySelector('.popup__button').textContent = 'Сохранить';
  });
}

//Промисы получения данных о карточках и авторе
Promise.all([getInitialCards(), getAuthor()])
  .then(([data, authorData]) => {
    profileTitle.textContent = authorData.name;
    profileDescription.textContent = authorData.about;
    avatarElementUrlCSS.style['background-image'] = `url('${authorData.avatar}')`;
    idAuthor = authorData._id;
    data.forEach((cardData) => {
      const cardElement = createCard(cardData, deleteCard, zoomImage, likeCard, idAuthor);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });