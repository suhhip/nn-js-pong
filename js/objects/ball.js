var Ball = function () {
  this.element = document.createElement('div');
  this.element.className = 'ball';
  this.element.innerHTML = ' ';

  this.posX = 0;
  this.posY = 0;

  // TODO <suhi>: fixIT!
  this.size = 10;

  this.halfSize = Math.floor(this.size / 2);

  this.setPosition = function (x, y) {
    if (x < 0) {
      x = 0;
    }
    else if (x > 100) {
      x = 100;
    }

    if (y < 0) {
      y = 0;
    }
    else if (y > 100) {
      y = 100;
    }

    this.posX = Number(x.toFixed(2));
    this.posY = Number(y.toFixed(2));

    updateElementPosition.bind(this)();

    return this;
  };

  this.move = function (x, y) {
    x = parseFloat(x);
    y = parseFloat(y);

    // TODO <suhi>: fixIt
    if (x === 0) {
      x = 1;
    }

    return this.setPosition(this.posX + x, this.posY + y);
  };

  this.blinking = function () {
    this.element.className += ' ball--blinking';
  };

  this.noBlinking = function () {
    this.element.className = this.element.className.replace(/ ball\-\-blinking/, '');
  };

  function updateElementPosition() {
    this.element.style.left   = 'calc(' + this.posX + '% - ' + this.halfSize + 'px)';
    this.element.style.top    = 'calc(' + this.posY + '% - ' + this.halfSize + 'px)';
  }
};
