var Logger = function (Controller, Ball, side) {
  function getMoment() {
    var ball_posX    = Number(Ball.posX.toFixed(2));
    var ball_posY    = Number(Ball.posY.toFixed(2));
    var ball_moveX   = Number(Ball.moveSpeed.x.toFixed(2));
    var ball_moveY   = Number(Ball.moveSpeed.y.toFixed(2));

    var player_posY         = Controller.movedElement.posY;
    var player_buttonUp     = (Controller.movedElement.direction === 'up'     ? 1 : 0);
    var player_buttonDown   = (Controller.movedElement.direction === 'down'   ? 1 : 0);

    if (side === 'right') {
      ball_posX = 100 - ball_posX;
      ball_moveX *= -1;
    }

    return [
      ball_posX,
      ball_posY,
      ball_moveX,
      ball_moveY,

      player_posY,

      player_buttonUp,
      player_buttonDown,
    ];
  }

  this.history = [];

  this.download = function (filename) {
    var str = 'var playerLog = ' + JSON.stringify(this.history) + ';'
    downloadStr(str, filename);
  };

  setInterval(function() {
    var moment = getMoment();

    this.history.push(moment);
  }.bind(this), 5);
};
