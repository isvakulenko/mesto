const popupOpenButton = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-btn');
const formElement = popup.querySelector('.popup__container');
const nameInput = popup.querySelector('.popup__input-name_username');
const aboutInput = popup.querySelector('.popup__input-name_about');


// Открываем форму для редактирования, подтягиваем в формы для ввода существующие данные
function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
};
// Для того чтобы popup был виден, добавим ему класс с соответствующим стилем display
function popupClose() {
  popup.classList.remove('popup_opened')
};
// При нажатии кнопки редактирования
popupOpenButton.addEventListener('click', popupOpen);
// При нажатии на крестик в popup
popupCloseButton.addEventListener('click', popupClose);

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
    // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupClose();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
