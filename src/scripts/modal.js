//Обработаем эскейп
function closeByEscape(evt) {
  if (evt.key === 'Escape') closeModal(document.querySelector('.popup_is-opened'));
}

// @todo: Функция открытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
}

// @todo: Функция закрытия попапа
function closeModal(popup) {//В индексе эта функция не встречается, поэтому не экспортирую её
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Закроем попапу по оверлею и крестику
function closePopup(popup, evt){
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    popup.removeEventListener('click', (evt) => closeModal(popup, evt));
    closeModal(popup);
  }
}

export {openModal, closeModal, closePopup};