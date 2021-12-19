const popupOpenButton = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-btn');
const formElement = popup.querySelector('.popup__container');
const nameInput = popup.querySelector('.popup__input-text_name');
const jobInput = popup.querySelector('.popup__input-text_about');

// Открываем форму для редактирования, подтягиваем в формы для ввода существующие данные
function popupOpen() {
  popup.classList.add('popup__visible');
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__about').textContent;
};
// Для того чтобы popup был виден, добавим ему класс с соответствующим стилем display
function popupClose() {
  popup.classList.remove('popup__visible')
};
// При нажатии кнопки редактирования
popupOpenButton.addEventListener('click', popupOpen);
// При нажатии на крестик в popup
popupCloseButton.addEventListener('click', popupClose);

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let profile__name = document.querySelector('.profile__name');
  let profile__about = document.querySelector('.profile__about');
  // Вставьте новые значения с помощью textContent
  profile__name.textContent = name;
  profile__about.textContent = job;
  popupClose();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);