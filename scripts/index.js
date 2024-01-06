const cardsContainer = document.querySelector('.places__list');

function createCards() {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardContent = initialCards.map(function(item){
    return item;
  });
  // @todo: Функция создания карточки
  cardContent.forEach(function(item){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    // @todo: DOM узлы
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    // @todo: Функция удаления карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt){
      let removeCard = evt.target.closest('.places__item');
      removeCard.remove();
    });
    cardsContainer.append(cardElement);
  });
}
// @todo: Вывести карточки на страницу
createCards();










