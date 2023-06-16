var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var level = 0;


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomVariable = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomVariable];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

}

function gameOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 500);
    $("h1").html("Game Over 💀!<br>Press A Key to Start");
}

function playsound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animationPress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        gameOver();
    }
}

$(document).keydown(function () {
    if (level == 0) {
        nextSequence();
    }
})

$(".btn").click(function (event) {
    if (level > 0) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playsound(userChosenColor);
        animationPress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
})
