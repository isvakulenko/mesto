//класс Section отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    // Свойство items — это массив данных, которые нужно добавить на страницу
    // при инициализации класса.
    this._items = items;
    //Свойство renderer — это функция,
    // которая отвечает за создание и отрисовку данных на странице.
    this._renderer = renderer;
    // containerSelector — селектор контейнера,
    //в который нужно добавлять созданные элементы.
    this._container = document.querySelector(containerSelector)
  }
  // метод, который отвечает за отрисовку всех элементов.
  renderItems() {
    //this.clear();
    this._items.forEach(item => {
    this._renderer(item);
    });
  }

  //метод, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
  this._container.prepend(element)
  }

}

