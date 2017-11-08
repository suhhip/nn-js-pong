var Paddle = function () {
  this.element = document.createElement('div');
  this.element.className = 'racket';

  this.posY       = 0;

  // TODO <suhi>: fixIT!
  this.size         = 14;
  this.halfSize     = Math.floor(this.size / 2);
  // TODO <suhi>: fixIT!
  this.halfSize_2   = 8.5;

  this.setSide = function (side) {
    this.element.className = 'paddle paddle--' + side;

    return this;
  };

  this.move = function (y) {
    return this.setPosition(this.posY + y);
  };

  this.setPosition = function (y) {
    if (y < this.halfSize) {
      y = this.halfSize;
    }
    if (y > (100 - this.halfSize)) {
      y = 100 - this.halfSize;
    }

    this.posY = y;

    updateElementPosition.bind(this)();

    return this;
  };

  function updateElementPosition () {
    this.element.style.top = this.posY + '%';
  }
};
