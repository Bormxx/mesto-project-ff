import { doc } from 'prettier';
import './pages/index.css';
import {openModal, handleClose, handleFormSubmit} from './scripts/modal.js';
export {startEventListener, stopEventListener}

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 

const editProfileButton = document.querySelector('.profile__edit-button'); //Кнопочка "редактировать профиль"
const addPlaceButton = document.querySelector('.profile__add-button'); //Кнопочка "добавить новое место"
const allPopup = document.querySelectorAll('.popup'); //Все модальные окошки
const formEditProfile = document.querySelector('.popup_type_edit'); //Форма редактирования профиля
const formAddCard = document.querySelector('.popup_type_new-card'); //Форма добавления места

//При открытии страницы начинаем слушать кнопки "Редактировать профиль", "Добавить место", лайки и клики по картинкам
editProfileButton.addEventListener('click', () => openModal(formEditProfile));
addPlaceButton.addEventListener('click', () => openModal(formAddCard));

//Начинаем слушать события "click" и "submit" которые попили мне крови
function startEventListener() {
  allPopup.forEach(closePopup => closePopup.addEventListener('click', handleClose));
  allPopup.forEach(closePopup => closePopup.addEventListener('submit', handleFormSubmit));
  //Перестаём слушать кнопки "Редактировать профиль" и "Добавить место"
  editProfileButton.removeEventListener('click', () => openModal(formEditProfile));
  addPlaceButton.removeEventListener('click', () => openModal(formAddCard));
}

//Прекращаем слушать события "click" и "submit"
function stopEventListener() {
  allPopup.forEach(closePopup => closePopup.removeEventListener('click', handleClose));
  allPopup.forEach(closePopup => closePopup.removeEventListener('submit', handleFormSubmit));
  //Начинаем слушать кнопки "Редактировать профиль" и "Добавить место"
  editProfileButton.addEventListener('click', () => openModal(formEditProfile));
  addPlaceButton.addEventListener('click', () => openModal(formAddCard));
}

