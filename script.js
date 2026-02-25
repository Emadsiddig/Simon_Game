var userClickPattern=[];
var GamePattern =[];
var buttonColors = ["red","green","blue","yellow"];
var level =0;
var started = false;
//sounds section 
$(".btn").on("click",function(){
    var buttonid = $(this).attr("id");
    playsound(buttonid);
    animation(buttonid);
   
    userClickPattern.push(buttonid);

    CheckAnswer(userClickPattern.length - 1);
});

function playsound(name){
    var audio =new Audio("./sounds/" + name+ ".mp3");
    audio.play();
}
// random choice section 


function NextSequence(){ 
    var randomnum = Math.floor(Math.random()*4);
    var RandomChoiceColor = buttonColors[randomnum];

    GamePattern.push(RandomChoiceColor);
    
    level++;
    $("#level-title").text("level "+level);
   
    animation(RandomChoiceColor);
}

//the Animation and flashing section
function animation(currentColor){
    $("#"+ currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}
//the keypress traker

$(document).keydown(function(){
    if(!started){
    NextSequence();
    started = true;
    }
})

function CheckAnswer(currentLevel){
   
    if(userClickPattern[currentLevel]===GamePattern[currentLevel]){
        console.log("success");
        if(userClickPattern.length===GamePattern.length){
            setTimeout(function(){
                NextSequence();
            },1000);
            userClickPattern=[];
        }
    }
    else{
        var wrongSound = new Audio("./sounds/wrong.mp3")
        wrongSound.play();
        $("h1").text("wrong,press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
           $("body").removeClass("game-over"); 
        },1000);
        startOver();
    }
}
function startOver(){
    GamePattern=[];
    level=0;
    started = false;
    userClickPattern=[];
} 