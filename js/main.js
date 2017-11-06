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

gamePlay.startBall();
