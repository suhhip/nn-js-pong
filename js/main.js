// 38 - Arrow UP
// 40 - Arrow DOWN
// 65 - A
// 89 - Y

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
  1: new Controller(players[1], 65, 89),
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

gamePlay.startBall();
