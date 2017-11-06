var NerualNetworkPlayer = function (GamePlay, NeuralNetwork, args) {
  var keeper;

  this.neuralNetwork   = NeuralNetwork;
  this.args            = args;

  this.remove = function () {
    clearInterval(keeper);
    keeper = null;
  };

  function Controller(upKeyCode, downKeyCode) {
    function keyAction(action, keyCode) {
      var key = new KeyboardEvent(action, { keyCode: keyCode, which: keyCode });

      Object.defineProperty(key, 'keyCode', { value: keyCode });
      Object.defineProperty(key, 'which', { value: keyCode });
      Object.defineProperty(key, 'keyCode', { value: keyCode });
      Object.defineProperty(key, 'which', { value: keyCode });

      return key;
    }

    var upD     = keyAction('keydown', upKeyCode);
    var upU     = keyAction('keyup', upKeyCode);      
    var downD   = keyAction('keydown', downKeyCode);
    var downU   = keyAction('keyup', downKeyCode);

    this.up = function () {
      window.dispatchEvent(upD);
      window.dispatchEvent(upU);
    };

    this.down = function () {
      window.dispatchEvent(downD);
      window.dispatchEvent(downU);
    };
  }

  var nnController = new Controller(args.upKeyCode, args.downKeyCode);
  var input, reaction;
  var moveX, posX;

  keeper = setInterval(function () {
    if (this.args.player === 2) {
      moveX   = - GamePlay.ball.moveSpeed.x;
      posX    = 100 - GamePlay.ball.posX;
    }
    else {
      moveX   = GamePlay.ball.moveSpeed.x;
      posX    = GamePlay.ball.posX;
    }

    input = new convnetjs.Vol([
      posX,
      GamePlay.ball.posY,
      (moveX > 0 ? 1 : (moveX < 0 ? -1 : 0)),
      ball.moveSpeed.y,
      GamePlay.paddles[this.args.player].posY,
      1
    ]);

    reaction = this.neuralNetwork.net.forward(input).w[0];

    if (reaction > args.limit) {
      nnController.up();
    }
    else if (reaction < (- args.limit)) {
      nnController.down();
    }
  }.bind(this), 5);
}
