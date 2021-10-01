
var start = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).keydown(function () {
    if (start === false) {
        start = true; 
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        nextSequence(); 
    }    
});

function nextSequence() {
    $("h1").text("Level "+level++);
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function () {
    var userChosenColour =  this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ $("#"+currentColour).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === currentLevel+1) {
            userClickedPattern = [];
            setTimeout(function(){ nextSequence(); }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over"); }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        start = false;
    }
}
