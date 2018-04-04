//business logic
function Die(number){
  this.value = number;
};

function Turn() {
  this.runningTotal = [];
  this.rollAgain = true;
};

function Hand() {
  this.total = 0;
};

Turn.prototype.addRoll = function() {
  var roll = 0;

  if (this.rollAgain === true) {
    roll = Math.floor((Math.random() * 6) + 1);
    var newRoll = new Die(roll);

    if(newRoll.value !== 1){
    this.runningTotal.push(newRoll.value);
    } else {
      this.rollAgain = false;
    }
  }
};

Turn.prototype.sumArray = function() {
  var sum = 0;
  this.runningTotal.forEach(function(element){
    sum += element;
  });
  return sum;
};

Hand.prototype.updateScore = function(number) {
  this.total += number;
};


//user logic
