var sounds = {
  beep   : document.createElement('audio'),
  plop   : document.createElement('audio'),
  buup   : document.createElement('audio'),
};

sounds.beep.src      = 'sounds/beep.wav';
sounds.beep.type     = 'audio/wav';

sounds.plop.src      = 'sounds/plop.wav';
sounds.plop.type     = 'audio/wav';

sounds.buup.src      = 'sounds/buup.wav';
sounds.buup.type     = 'audio/wav';

var GamePlay = function (Table, GoalTables, Ball, Paddles) {
  this.table        = Table;
  this.ball         = Ball;
  this.paddles      = Paddles;
  this.goalTables   = GoalTables;

  this.isRun           = false;
  this.paddleLimits    = {};
  this.ballOutLimits   = {};
  this.goals           = {};

  var storage = {
    ballMove: null,
  };

  this.initPaddleLimits = function () {
    this.paddleLimits = {
      left: {
        left    : this.paddles[1].element.offsetLeft,
        right   : this.paddles[1].element.offsetLeft + this.paddles[1].element.offsetWidth,
      },
      right: {
        left    : this.paddles[2].element.offsetLeft,
        right   : this.paddles[2].element.offsetLeft + this.paddles[2].element.offsetWidth,
      },
    };

    return this;
  };

  this.initBallOutLimits = function () {
    this.ballOutLimits = {
      left    : config.gamePlay.ball.outLimit,
      right   : (this.table.element.offsetWidth - config.gamePlay.ball.outLimit),
    };

    return this;
  };

  this.resetPaddles = function () {
    this.paddles[1].setPosition(50);
    this.paddles[2].setPosition(50);

    return this;
  };

  this.resetBall = function () {
    var ballDirection = ballRandomDirection();

    var beta    = 180 - ballDirection;
    var gamma   = 180 - (90 + beta);

    this.ball.moveSpeed.x   = (gamma > 0 ? config.gamePlay.ball.speed.x : (- config.gamePlay.ball.speed.x));
    this.ball.moveSpeed.y   = parseFloat(Math.sin(gamma * (Math.PI / 180)).toFixed(2));

    this.ball.setPosition(50, 1);

    return this;
  };

  this.startBall = function () {
    if (!this.isRun) {
      return;
    }

    setTimeout(function () {
      storage.ballMove = setInterval(onBallMove.bind(this), config.gamePlay.ball.moveTimeStep);
    }.bind(this), config.gamePlay.ball.startDelay);

    return this;
  };

  this.stopBall = function () {
    clearInterval(storage.ballMove);
    storage.ballMove = null;

    return this;
  };

  this.startGame = function () {
    this.isRun = true;
    gamePlay.startBall();
  };

  this.resetGame = function () {
	this.isRun = false;

    // Init ball speeds
    this.ball.moveSpeed = {
      x   : 0,
      y   : 0,
    };

    this.stopBall();
    this.resetBall();
    this.resetPaddles();

    this.resetGoals();
  };

  this.resetGoals = function () {
    this.goals = {
      1   : 0,
      2   : 0,
    };

    this.goalTables[1].setNumber(0);
    this.goalTables[2].setNumber(0);

    return this;
  };

  this.increaseGoal = function (playerNumber) {
    ++this.goals[playerNumber];
    this.goalTables[playerNumber].setNumber(this.goals[playerNumber]);
  };

  function onBallMove() {
    this.ball.move(this.ball.moveSpeed.x, this.ball.moveSpeed.y);

    var checkXLeft    = this.ball.element.offsetLeft;
    var checkXRight   = checkXLeft + this.ball.size;

    if (checkXLeft <= this.paddleLimits.left['right']) {
      if (checkXLeft >= this.paddleLimits.left['left'] && checkRebound(this.paddles[1])) {
        sounds.beep.play();  
        modifyBallOnRebound.bind(this)(1);

        this.ball.moveSpeed.x *= -1;
      }
      else if (checkXLeft < this.ballOutLimits['left']) {
        this.increaseGoal(2);
        onBallOut.bind(this)();
      }
    }

    if (checkXRight >= this.paddleLimits.right['left']) {
      if (checkXRight <= this.paddleLimits.right['right'] && checkRebound(this.paddles[2])) {
        sounds.beep.play();
        modifyBallOnRebound.bind(this)(2);

        this.ball.moveSpeed.x *= -1;
      }
      else if (checkXRight > this.ballOutLimits['right']) {
        this.increaseGoal(1);
        onBallOut.bind(this)();
      }
    }

    if (this.ball.posY === 0 || this.ball.posY === 100) {
      this.ball.moveSpeed.y *= -1;
      sounds.plop.play();
    }
  }

  function onBallOut() {
    this.stopBall();
    this.ball.blinking();

    sounds.buup.play();

    setTimeout(function () {
      this.resetBall();
      this.ball.noBlinking();

      this.startBall();
    }.bind(this), config.gamePlay.ball.outBlinkingTime);  
  }

  function checkRebound(paddle) {
    return ((paddle.posY - paddle.halfSize_2) <= this.ball.posY && (paddle.posY + paddle.halfSize_2) >= this.ball.posY);
  }

  function modifyBallOnRebound(paddleIndex) {
    if (this.paddles[paddleIndex].lastMoveStart === 0) {
      return;
    }

    var diff = Date.now() - this.paddles[paddleIndex].lastMoveStart;
    if (diff > 1000) {
      return;
    }

    var dir = (this.paddles[paddleIndex].direction === 'down' ? 1 : -1);

    this.ball.moveSpeed.y += Math.sqrt(Math.abs(diff - 1000)) / 100 * dir;

    if (Math.abs(this.ball.moveSpeed.y) > config.gamePlay.ball.speed.yMax) {
      this.ball.moveSpeed.y = (
        this.ball.moveSpeed.y < 0
          ?
          (- config.gamePlay.ball.speed.yMax)
          :
          config.gamePlay.ball.speed.yMax
      );
    }
  }

  function ballRandomDirection() {
    var value, absValue;

    do {
      value      = Math.floor(Math.random() * 360) - 180;
      absValue   = Math.abs(value);
    } while (!(absValue > 110 && absValue < 160));

    return value;
  }

  // init track fields
  this
    .initPaddleLimits()
    .initBallOutLimits()
    .resetGame();

  window.addEventListener('resize', this.initPaddleLimits.bind(this), true);
  window.addEventListener('resize', this.initBallOutLimits.bind(this), true);
};
