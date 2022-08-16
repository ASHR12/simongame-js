$(function () {
  var level = 0;
  var gameStarted = false;
  var randomNumber;
  var buttonColors = ["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];
  var userChosenColor;

  $(".start-btn").on("click", function (e) {
    $(".start-btn").hide();
    if (!gameStarted) {
      nextSequence();
      gameStarted = true;
    }
  });

  function nextSequence() {
    userClickedPattern = [];
    $("#level-title").html("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    console.log(
      "🚀 ~ file: game.js ~ line 23 ~ nextSequence ~ gamePattern",
      gamePattern
    );
    $("." + randomColor)
      .fadeOut(50)
      .fadeIn(50);
    playSound(randomColor);
    level++;
  }

  $(".box").on("click", function (e) {
    userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    pressed(userChosenColor);
    checkInput(userClickedPattern.length - 1);
  });

  function checkInput(currentLevel) {
    var gamePatternValueAtGivenIndex = userClickedPattern[currentLevel];
    var userClickedPatternValueAtGivenIndex = gamePattern[currentLevel];
    if (gamePatternValueAtGivenIndex === userClickedPatternValueAtGivenIndex) {
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over!");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      restart();
      $(".start-btn").show();
      $(".btn").html("Restart");
    }
  }

  function pressed(userChosenColor) {
    $("." + userChosenColor).addClass("pressed");
    setTimeout(function () {
      $("." + userChosenColor).removeClass("pressed");
    }, 100);
  }

  function playSound(colorVal) {
    var audio = new Audio("sounds/" + colorVal + ".mp3");
    audio.play();
  }

  function restart() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
  }
});
