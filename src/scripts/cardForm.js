// Импорты
import { createCard, likeCard, deleteCard, sectionPlaces } from "./cards";
import { closePopup } from "./modal";

// @todo: DOM узлы
const cardForm = document.querySelector('[name="new-place"]');
let cardNameInput = document.querySelector(".popup__input_type_card-name");
let cardLinkInput = document.querySelector(".popup__input_type_url");

// @todo: Функция создания новой карточки
const handleAddFormCard = (evt) => {
  evt.preventDefault();
  const cardInfo = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  let place = createCard(cardInfo, likeCard, deleteCard);
  sectionPlaces.prepend(place);
  cardForm.reset();
  closePopup(cardForm.closest(".popup"));
};

//@todo: Слушатели событий
cardForm.addEventListener("submit", handleAddFormCard);

export { handleAddFormCard };
