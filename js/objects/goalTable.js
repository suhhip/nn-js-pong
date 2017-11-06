var GoalTable = function () {
  this.element = document.createElement('div');
  this.element.className = 'goal-table';

  this.number = 0;

  this.setNumber = function (number) {
    this.number              = number;
    this.element.innerHTML   = this.number;
  };

  this.setNumber(this.number);
};
