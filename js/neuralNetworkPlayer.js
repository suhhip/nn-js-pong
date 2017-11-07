var NerualNetworkPlayer = function (GamePlay, NeuralNetwork, args) {
  var keeper;

  this.neuralNetwork   = NeuralNetwork;
  this.args            = args;

  this.remove = function () {
    clearInterval(keeper);
    keeper = null;
  };
  
  var keyUp     = new KeyboardTrigger(args.upKeyCode);
  var keyDown   = new KeyboardTrigger(args.downKeyCode);

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
      keyUp.fire();
    }
    else if (reaction < (- args.limit)) {
      keyDown.fire();
    }
  }.bind(this), 5);
}
