const cardsContainer = document.querySelector('.places__list');
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
let i = 0;
// @todo: Функция создания карточки
const createCard = (cardData, deleteCallback) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  // @todo: DOM узлы
  cardData = [
    cardElement.querySelector('.card__title').textContent = initialCards[i].name,
    cardElement.querySelector('.card__image').src = initialCards[i].link,
    cardElement.querySelector('.card__image').alt = `Фотография: ${initialCards[i].name}`
  ];
  // @todo: Функция удаления карточки
  deleteCallback = cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt){
    const removeCard = evt.target.closest('.places__item');
      removeCard.remove();
    });
  i++;
  // @todo: Вывести карточки на страницу
  return cardsContainer.append(cardElement);
}
initialCards.forEach(function(){
  createCard();
});





/* Всего 16 строчек кода и всё работает... Хнык...

const cardsContainer = document.querySelector('.places__list');
function createCards() {
  const cardTemplate = document.querySelector('#card-template').content;
  initialCards.forEach(function(item){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = `Фотография: ${item.name}`;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt){
      const removeCard = evt.target.closest('.places__item');
      removeCard.remove();
    });
    cardsContainer.append(cardElement);
  });
}
createCards();

*/