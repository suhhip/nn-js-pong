var Controller = function (movedElement, upKeyCode, downKeyCode) {
  this.movedElement  = movedElement;
  this.upKeyCode     = upKeyCode;
  this.downKeyCode   = downKeyCode;

  // init moved element properties
  this.movedElement.direction       = null;
  this.movedElement.lastMoveStart   = 0;

  window.addEventListener('keydown', checkOnDown.bind(this));
  window.addEventListener('keyup', checkOnUp.bind(this));

  var storage = {
    move: null,
  };

  function checkOnDown (e) {
    if (storage.move !== null) {
      return;
    }

    e = e || window.event;

    if (e.keyCode !== this.upKeyCode && e.keyCode !== this.downKeyCode) {
      return;
    }

    this.movedElement.lastMoveStart = Date.now();

    if (e.keyCode === this.upKeyCode) {
      this.movedElement.direction = 'up';
      var moveStep = (- config.controller.moveSize);
    }
    else if (e.keyCode === this.downKeyCode) {
      this.movedElement.direction = 'down';
      var moveStep = config.controller.moveSize;
    }

    this.movedElement.move(moveStep);
    storage.move = setInterval(function () {
      this.movedElement.move(moveStep);
    }.bind(this), config.controller.moveTimeStep);
  }

  function checkOnUp (e) {
    e = e || window.event;

    if (e.keyCode === this.upKeyCode || e.keyCode == this.downKeyCode) {
      clearInterval(storage.move);
      storage.move = null;

      this.movedElement.direction       = null;
      this.movedElement.lastMoveStart   = 0;
    }
  }
};
