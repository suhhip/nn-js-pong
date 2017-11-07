function KeyboardTrigger(keyCode) {
  function keyAction(action, keyCode) {
    var key = new KeyboardEvent(action, { keyCode: keyCode, which: keyCode });

    Object.defineProperty(key, 'keyCode', { value: keyCode });
    Object.defineProperty(key, 'which', { value: keyCode });
    Object.defineProperty(key, 'keyCode', { value: keyCode });
    Object.defineProperty(key, 'which', { value: keyCode });

    return key;
  }

  var keyDown   = keyAction('keydown', keyCode);
  var keyUp     = keyAction('keyup', keyCode);

  this.fire = function () {
    window.dispatchEvent(keyDown);
    window.dispatchEvent(keyUp);
  };
}
