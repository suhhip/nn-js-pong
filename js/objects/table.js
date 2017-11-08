var Table = function (id) {
  this.element = document.querySelector(id);
  this.element.className = 'table';

  this.add = function (object) {
    this.element.appendChild(object.element);
  };
};
