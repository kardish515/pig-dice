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

function Game() {
  this.currentPlayer = Math.floor((Math.random() * 2) + 1);
};

Turn.prototype.addRoll = function() {
  var roll = 0;

  if (this.rollAgain === true) {
    roll = Math.floor((Math.random() * 6) + 1);
    var newRoll = new Die(roll);

    if(newRoll.value !== 1){
    this.runningTotal.unshift(newRoll.value);
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

Game.prototype.changePlayer = function() {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 2;
  } else {
    this.currentPlayer = 1;
  }
}


//user logic
$(document).ready(function(){
  // $("#formOne").submit(function(event){
  //   event.preventDefault();
  //
  //   $("#mode-selection").hide();
  //   var mode = $("input:radio[name=mode]:checked").val();
  //   //put conditional logic for setting up vs computer
  //
  //   $("#game-board").toggleClass('hide');
  //   $("#game-board").attr('display', 'flex');
  //   $("#game-board").attr('flex-direction', 'row');
  //
  // });

  var newGame = new Game();
  console.log(newGame.currentPlayer);
  var playerOneHand = new Hand();
  var playerTwoHand = new Hand();

  if (newGame.currentPlayer === 1) {
    $("#player-board-two button.roll").hide();
    $("#player-board-two button.hold").hide();

    var currentTurn = new Turn();
    var turnScore = 0;
    var runningTotal = currentTurn.runningTotal;

  } else {
    $("#player-board-one button.roll").hide();
    $("#player-board-one button.hold").hide();

    var currentTurn = new Turn();
    var turnScore = 0;
    var runningTotal = currentTurn.runningTotal;
  }

  $("button.roll").click(function() {
    currentTurn.addRoll();
    if (currentTurn.rollAgain === true){
      $("ul#player-one-rolls").append("<li>" + runningTotal[0] + "</li>");
      turnScore = currentTurn.sumArray();
      $("#turn-score").text(turnScore);
    } else {
      $("ul#player-one-rolls").append("<li>Bust!</li>");
      $("#turn-score").text("Bust!");
    }
  });

  $("button.hold").click(function(){
    handScore.updateScore(turnScore);
    $("#player1-score").text(handScore.total);
  });
});
