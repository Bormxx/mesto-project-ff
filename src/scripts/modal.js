export {openModal, closeModal, handleClose, handleFormSubmit};
import {startEventListener, stopEventListener} from "../index.js"
import {newCard, createCard, deleteCard} from "./card.js"

const profileTitle = document.querySelector('.profile__title'); //Поле ФИО
const profileDescription = document.querySelector('.profile__description'); //Поле описания
const nameInput = document.querySelector('.popup__input_type_name'); //Поле ввода ФИО в форме для редактирования профиля
const jobInput = document.querySelector('.popup__input_type_description'); //Поле ввода описания в форме для редактирования профиля


//Плавно показываем окошко
function openModal(openWindow) {
  openWindow.classList.add('popup_is-opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  startEventListener();
  openWindow.addEventListener('keydown', handleClose);
}

//Плавно скрываем окошко
function closeModal(closeWindow) {
  closeWindow.classList.remove('popup_is-opened');
  stopEventListener();
  closeWindow.removeEventListener('keydown', handleClose);
}

//Закрываем форму по клику на оверлей или крестику или кнопке Escape
function handleClose(evt){
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close') || evt.keyCode === 27){
    closeModal(evt.currentTarget);
  }
}

//Работаем с формами после "submit"
function handleFormSubmit(evt) {
    evt.preventDefault();
    const placeName = document.querySelector('.popup__input_type_card-name');
    const placeUrl = document.querySelector('.popup__input_type_url');
    if (evt.currentTarget.classList.contains('popup_type_edit')) {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    } else if (evt.currentTarget.classList.contains('popup_type_new-card')) {
      console.log('Добавление карточки');
      const addCard = {
        name: placeName.value,
        link: placeUrl.value
      }
      const cardElement = createCard(addCard, deleteCard);
      placeName.value = '';
      placeUrl.value = '';
      newCard(cardElement);
    }
    closeModal(evt.currentTarget);
}