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

Turn.prototype.resetTurnStats = function () {
  this.runningTotal = [];
  this.rollAgain = true;
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

  var playerOneHand = new Hand();
  var playerTwoHand = new Hand();

  var currentTurn1 = new Turn();
  var turnScore1 = 0;
  var runningTotal1 = currentTurn1.runningTotal;

  var currentTurn2 = new Turn();
  var turnScore2 = 0;
  var runningTotal2 = currentTurn2.runningTotal;

  if (newGame.currentPlayer === 1) {
    $("#player-board-two button.roll").hide();
    $("#player-board-two button.hold").hide();
  } else {
    $("#player-board-one button.roll").hide();
    $("#player-board-one button.hold").hide();
  }

  $("#player-board-one button.roll").click(function() {
    currentTurn1.addRoll();
    if (currentTurn1.rollAgain === true){
      $("ul#player-one-rolls").append("<li>" + runningTotal1[0] + "</li>");
      turnScore1 = currentTurn1.sumArray();
      $("#turn-score-one").text(turnScore1);
    } else {
      $("ul#player-one-rolls").append("<li>Bust!</li>");
      $("#turn-score-one").text("Bust!");

      $("#player-board-one button.roll").hide();
      $("#player-board-one button.hold").hide();
      $("#player-board-two button.roll").show();
      $("#player-board-two button.hold").show();

      $("ul#player-one-rolls").empty();
      $("#turn-score-one").empty();

      currentTurn1.resetTurnStats();
      runningTotal1 = currentTurn1.runningTotal;
    }
  });

  $("#player-board-one button.hold").click(function(){
    playerOneHand.updateScore(turnScore1);
    $("#player1-score").text(playerOneHand.total);

    $("#player-board-one button.roll").hide();
    $("#player-board-one button.hold").hide();
    $("#player-board-two button.roll").show();
    $("#player-board-two button.hold").show();

    $("ul#player-one-rolls").empty();
    $("#turn-score-one").empty();

    currentTurn1.resetTurnStats();
    runningTotal1 = currentTurn1.runningTotal;
  });

  $("#player-board-two button.roll").click(function() {
    currentTurn2.addRoll();
    if (currentTurn2.rollAgain === true){
      $("ul#player-two-rolls").append("<li>" + runningTotal2[0] + "</li>");
      turnScore2 = currentTurn2.sumArray();
      $("#turn-score-two").text(turnScore2);
    } else {
      $("ul#player-two-rolls").append("<li>Bust!</li>");
      $("#turn-score-two").text("Bust!");

      $("#player-board-two button.roll").hide();
      $("#player-board-two button.hold").hide();
      $("#player-board-one button.roll").show();
      $("#player-board-one button.hold").show();

      $("ul#player-two-rolls").empty();
      $("#turn-score-two").empty();

      currentTurn2.resetTurnStats();
      runningTotal2 = currentTurn2.runningTotal;
    }
  });

  $("#player-board-two button.hold").click(function(){
    playerTwoHand.updateScore(turnScore2);
    $("#player2-score").text(playerTwoHand.total);

    $("#player-board-two button.roll").hide();
    $("#player-board-two button.hold").hide();
    $("#player-board-one button.roll").show();
    $("#player-board-one button.hold").show();

    $("ul#player-two-rolls").empty();
    $("#turn-score-two").empty();

    currentTurn2.resetTurnStats();
    runningTotal2 = currentTurn2.runningTotal;
  });
});
