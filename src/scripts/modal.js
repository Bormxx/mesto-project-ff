// @todo: Функция открытия попапа
function openModal(Popup) {
  Popup.classList.add('popup_is-opened');
}

// @todo: Функция закрытия попапа
function closeModal(Popup) {
  Popup.classList.remove('popup_is-opened');  
}

export {openModal, closeModal};