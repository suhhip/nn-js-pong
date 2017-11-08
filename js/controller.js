var Controller = function (movedElement, upKeyCodes, downKeyCodes) {
  this.movedElement = movedElement;
  
  if (!Array.isArray(upKeyCodes)) {
	  upKeyCodes = [upKeyCodes];
  }
  if (!Array.isArray(downKeyCodes)) {
	  downKeyCodes = [downKeyCodes];
  }
  
  this.upKeyCodes     = upKeyCodes;
  this.downKeyCodes   = downKeyCodes;

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

    if (this.upKeyCodes.indexOf(e.keyCode) !== -1) {
      this.movedElement.direction = 'up';
      var moveStep = (- config.controller.moveSize);
    }
    else if (this.downKeyCodes.indexOf(e.keyCode) !== -1) {
      this.movedElement.direction = 'down';
      var moveStep = config.controller.moveSize;
    }
    else {
	    return;
    }

    this.movedElement.lastMoveStart = Date.now();

    this.movedElement.move(moveStep);
    storage.move = setInterval(function () {
      this.movedElement.move(moveStep);
    }.bind(this), config.controller.moveTimeStep);
  }

  function checkOnUp (e) {
    e = e || window.event;

    if (this.upKeyCodes.indexOf(e.keyCode) !== -1 || this.downKeyCodes.indexOf(e.keyCode) !== -1) {
      clearInterval(storage.move);
      storage.move = null;

      this.movedElement.direction       = null;
      this.movedElement.lastMoveStart   = 0;
    }
  }
};
