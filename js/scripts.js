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

Turn.prototype.playerRoll = function() {
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

Turn.prototype.compRoll = function() {
  var roll = 0;
  for (var i = 0; i < 2; i++) {
    if (this.rollAgain === true) {
      roll = Math.floor((Math.random() * 6) + 1);
      var newRoll = new Die(roll);
      console.log(newRoll.value);
      if(newRoll.value !== 1){
      this.runningTotal.unshift(newRoll.value);
      } else {
        this.rollAgain = false;
      }
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

Hand.prototype.checkWin = function(){
  if(this.total >= 100){
    return true;
  }else{
    return false;
  }
};

Game.prototype.changePlayer = function() {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 2;
  } else {
    this.currentPlayer = 1;
  }
}



//user logic
function showHide(number){
  $("#player-board-" + number + " button.roll").toggle();
  $("#player-board-"+ number + " button.hold").toggle();
}

$(document).ready(function(){
  var mode = "";
  $("#mode-selection button").click(function(){

    $("#mode-selection").hide();
    mode = this.textContent;
    //put conditional logic for setting up vs computer

    $("#game-board").toggleClass('hide');
    $("#game-board").attr('display', 'flex');
    $("#game-board").attr('flex-direction', 'row');

    var newGame = new Game();

    var playerOneHand = new Hand();
    var playerTwoHand = new Hand();

    var currentTurn1 = new Turn();
    var turnScore1 = 0;
    var runningTotal1 = currentTurn1.runningTotal;

    var currentTurn2 = new Turn();
    var turnScore2 = 0;
    var runningTotal2 = currentTurn2.runningTotal;

    if (mode === "Single") {
      if (newGame.currentPlayer === 1) {
        showHide("two");

      } else {
        $("#player-board-one button.roll").hide();
        $("#player-board-one button.hold").hide();

        currentTurn2.compRoll();
        if (currentTurn2.rollAgain === true) {
          $("ul#player-two-rolls").append("<li>" + runningTotal2[0] + "</li>");
          $("ul#player-two-rolls").append("<li>" + runningTotal2[1] + "</li>");

          turnScore2 = currentTurn2.sumArray();
          $("#turn-score-two").text(turnScore2);

          playerTwoHand.updateScore(turnScore2);
          $("#player2-score").text(playerTwoHand.total);
          showHide("two");
          showHide("one");
        } else {
          $("#turn-score-two").text("Bust!");
          showHide("two");
          showHide("one");
        }

        currentTurn2.resetTurnStats();
        runningTotal2 = currentTurn2.runningTotal;
      }

      $("#player-board-one button.roll").click(function() {
        $("ul#player-two-rolls").empty();
        currentTurn1.playerRoll();
        if (currentTurn1.rollAgain === true){
          $("ul#player-one-rolls").append("<li>" + runningTotal1[0] + "</li>");
          turnScore1 = currentTurn1.sumArray();
          $("#turn-score-one").text(turnScore1);
        } else {
          $("ul#player-one-rolls").append("<li>Bust!</li>");
          $("#turn-score-one").text("Bust!");
          showHide("two");
          showHide("one");
          $("ul#player-one-rolls").empty();
          $("#turn-score-one").empty();

          currentTurn1.resetTurnStats();
          runningTotal1 = currentTurn1.runningTotal;

          currentTurn2.compRoll();
          if (currentTurn2.rollAgain === true) {
            $("ul#player-two-rolls").append("<li>" + runningTotal2[0] + "</li>");
            $("ul#player-two-rolls").append("<li>" + runningTotal2[1] + "</li>");
            turnScore2 = currentTurn2.sumArray();

            $("#turn-score-two").text(turnScore2);
            playerTwoHand.updateScore(turnScore2);
            $("#player2-score").text(playerTwoHand.total);
            showHide("two");
            showHide("one");

          } else {
            $("#turn-score-two").text(turnScore2);
            showHide("two");
            showHide("one");

          }

            currentTurn2.resetTurnStats();
            runningTotal2 = currentTurn2.runningTotal;
          }
      });

      $("#player-board-one button.hold").click(function(){
        playerOneHand.updateScore(turnScore1);
        if(playerOneHand.checkWin()){
          $("#player1-score").text(playerOneHand.total);
          alert("You've won!");
        }else{
          $("#player1-score").text(playerOneHand.total);
          showHide("two");
          showHide("one");
          $("ul#player-one-rolls").empty();
          $("#turn-score-one").empty();

          currentTurn1.resetTurnStats();
          runningTotal1 = currentTurn1.runningTotal;

          currentTurn2.compRoll();
          if (currentTurn2.rollAgain === true) {
            $("ul#player-two-rolls").append("<li>" + runningTotal2[0] + "</li>");
            $("ul#player-two-rolls").append("<li>" + runningTotal2[1] + "</li>");
            turnScore2 = currentTurn2.sumArray();

            $("#turn-score-two").text(turnScore2);
            playerTwoHand.updateScore(turnScore2);
            $("#player2-score").text(playerTwoHand.total);
            showHide("two");
            showHide("one");
          } else {
            $("#turn-score-two").text("Bust!");
            showHide("two");
            showHide("one");
          }

            currentTurn2.resetTurnStats();
            runningTotal2 = currentTurn2.runningTotal;
        }
      });
    } else {
      if (newGame.currentPlayer === 1) {
        showHide("two");

      } else {
        $("#player-board-one button.roll").hide();
        $("#player-board-one button.hold").hide();
      }
      $("#player-board-one button.roll").click(function() {
        currentTurn1.playerRoll();
        if (currentTurn1.rollAgain === true){
          $("ul#player-one-rolls").append("<li>" + runningTotal1[0] + "</li>");
          turnScore1 = currentTurn1.sumArray();
          $("#turn-score-one").text(turnScore1);
        } else {
          $("ul#player-one-rolls").append("<li>Bust!</li>");
          $("#turn-score-one").text("Bust!");
          showHide("two");
          showHide("one");
          $("ul#player-one-rolls").empty();
          $("#turn-score-one").empty();

          currentTurn1.resetTurnStats();
          runningTotal1 = currentTurn1.runningTotal;
        }
      });

      $("#player-board-one button.hold").click(function(){
        playerOneHand.updateScore(turnScore1);
        if(playerOneHand.checkWin()){
          $("#player1-score").text(playerOneHand.total);
          alert("You've won!");
        }else{
          $("#player1-score").text(playerOneHand.total);
          showHide("two");
          showHide("one");
          $("ul#player-one-rolls").empty();
          $("#turn-score-one").empty();

          currentTurn1.resetTurnStats();
          runningTotal1 = currentTurn1.runningTotal;
        }
      });

      $("#player-board-two button.roll").click(function() {
        currentTurn2.playerRoll();
        if (currentTurn2.rollAgain === true){
          $("ul#player-two-rolls").append("<li>" + runningTotal2[0] + "</li>");
          turnScore2 = currentTurn2.sumArray();
          $("#turn-score-two").text(turnScore2);
        } else {
          $("ul#player-two-rolls").append("<li>Bust!</li>");
          $("#turn-score-two").text("Bust!");
          showHide("two");
          showHide("one");

          $("ul#player-two-rolls").empty();
          $("#turn-score-two").empty();

          currentTurn2.resetTurnStats();
          runningTotal2 = currentTurn2.runningTotal;
        }
      });

      $("#player-board-two button.hold").click(function(){
        playerTwoHand.updateScore(turnScore2);
        if(playerTwoHand.checkWin()){
          $("#player2-score").text(playerTwoHand.total);
          alert("You've won!");
        } else{
          $("#player2-score").text(playerTwoHand.total);
          showHide("two");
          showHide("one");

          $("ul#player-two-rolls").empty();
          $("#turn-score-two").empty();

          currentTurn2.resetTurnStats();
          runningTotal2 = currentTurn2.runningTotal;
        }
      });
    }
  });
});
