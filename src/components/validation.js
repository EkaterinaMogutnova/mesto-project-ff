// отображение ошибки
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  // Находим элемент
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавляем класс ошибки
  inputElement.classList.add(settings.inputErrorClass);
  //  текст
  errorElement.textContent = errorMessage;
  // Делаем элемент с ошибкой видимым
  errorElement.classList.add(settings.errorClass);
};

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Удаляем класс
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

// Функция проверки валидности поля ввода
const checkInputValidity = (formElement, inputElement, settings) => {
  //  паттерн
  if (inputElement.validity.patternMismatch) {
    // Устанавливаем сообщение из data
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  // Проверяем общую валидность поля
  if (!inputElement.validity.valid) {
    // Если не валидно - показываем ошибку
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    // Если валидно - скрываем ошибку
    hideInputError(formElement, inputElement, settings);
  }
};

// Проверяет, есть ли хотя бы одно невалидное поле в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// состояние кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    // делаем кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    // активируем кнопку
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

// обработчики событий
const setEventListeners = (formElement, settings) => {
  // Получаем все поля ввода формы
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  // Находим кнопку отправки
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  // Инициализируем состояние кнопки
  toggleButtonState(inputList, buttonElement, settings);

  // Добавляем обработчик input для каждого поля
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // При каждом вводе проверяем валидность
      checkInputValidity(formElement, inputElement, settings);
      // И обновляем состояние кнопки
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

// Включает валидацию
export const enableValidation = (settings) => {
  // Находим все формы
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    // Устанавливаем обработчики для формы
    setEventListeners(formElement, settings);
  });
};

// Очищает ошибки валидации
export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
    inputElement.setCustomValidity("");
  });
  toggleButtonState(inputList, buttonElement, settings);
};
