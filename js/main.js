var introductionLayer   = document.getElementById('introduction-layer');
var howtoplayLayer      = document.getElementById('howtoplay-layer');

var buttons = document.querySelectorAll('#introduction-layer .button-place .button');
for (var i = 0; i < buttons.length; ++i) {
  buttons[i].addEventListener('click', function() {
    var player = this.dataset.player;

    demoPlayers.peter.remove();
    demoPlayers.judit.remove();

    introductionLayer.remove();
    howtoplayLayer.style.display = 'block';

    gamePlay.resetGame();

    if (player === 'another') {
      return;
    }
    
    document.getElementById('howtoplay-layer--player-2').remove();
    document.querySelectorAll('.controller-button--right')[0].remove();
    document.querySelectorAll('.controller-button--right')[0].remove();

    var nnPlayer = neuralNetworks[player];

    new NerualNetworkPlayer(gamePlay, nnPlayer, {
      player        : 2,
      upKeyCode     : 38,
      downKeyCode   : 40,
      limit         : 0.2,
    });
  });
}

document.getElementById('start-game').onclick = function () {
  document.getElementById('layers').remove();

  gamePlay.resetGame();
  gamePlay.startGame();
};


// 38 - Arrow UP
// 40 - Arrow DOWN
// 65 - A
// 89 - Y ; 90 - Z

var table   = new Table('#pong-table');
var ball    = new Ball();

var goalTables = {
  1: new GoalTable(),
  2: new GoalTable(),
};

var players = {
  1: new Paddle().setSide('left'),
  2: new Paddle().setSide('right'),
};

var controllers = {
  1: new Controller(players[1], 65, [89, 90]),
  2: new Controller(players[2], 38, 40),
};

table.add(goalTables[1]);
table.add(goalTables[2]);
table.add(players[1]);
table.add(players[2]);
table.add(ball);

var gamePlay = new GamePlay(table, goalTables, ball, players);

var neuralNetworks = {
  judit   : (new NeuralNetwork()).loadNetwork(nnPeter),
  peter   : (new NeuralNetwork()).loadNetwork(nnPeter),
};

var demoPlayers = {};

demoPlayers.peter = new NerualNetworkPlayer(gamePlay, neuralNetworks.peter, {
  player        : 1,
  upKeyCode     : 65,
  downKeyCode   : 89,
  limit         : 0.2,
});

demoPlayers.judit = new NerualNetworkPlayer(gamePlay, neuralNetworks.judit, {
  player        : 2,
  upKeyCode     : 38,
  downKeyCode   : 40,
  limit         : 0.2,
});

gamePlay.startGame();

// Mobile controllers
function addControllerActions(element, keyCode) {
	var trigger = new KeyboardTrigger(keyCode);

	cElement.addEventListener('touchstart', function () {
		trigger.fireDown();
	}, false);
	cElement.addEventListener('touchend', function () {
		trigger.fireUp();
	}, false);
}

var cElement;

cElement = document.querySelector('.controller-button--top.controller-button--left');
addControllerActions(cElement, 65);

cElement = document.querySelector('.controller-button--bottom.controller-button--left');
addControllerActions(cElement, 89);

cElement = document.querySelector('.controller-button--top.controller-button--right');
addControllerActions(cElement, 38);

cElement = document.querySelector('.controller-button--bottom.controller-button--right');
addControllerActions(cElement, 40);
