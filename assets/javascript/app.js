
// GLOBAL VARIABLES
var clockRunning=false
var intervalId;
var timeLeft=60
var Wins=0
var Loses=0
var Unanswered=0
var currentQuestion
var questionUsed=[]
var NumberQuestion=0
var gameOver=false


// OBJECT FOR QUESTIONS AND ANSWER
var allQuestions = [{
  question: 'What is the capital city of Australia?',
  choices: ['Sydney', 'Melbourne', 'Canberra', 'London'],
  correctAnswer: 3
},
{
  question: 'Who won the 2014 FIFA World Cup?',
  choices: ['Brazil', 'England', 'Germany', 'Spain'],
  correctAnswer: 3
},
{
  question: 'What book series is authored by J.K Rowling?',
  choices: ['Game of Thrones', 'Hunger Games', 'Twilight', 'Harry Potter'],
  correctAnswer: 4
},
{
  question: 'what is the summ of 1 + 1 ?',
  choices: ['1', '2', '3', '4'],
  correctAnswer: 2
},
{   
  question: 'The Eiffel Tower is located in which following country?',
  choices: ['Italy', 'France', 'Iceland', 'Mexico'],
  correctAnswer: 2
}];

// SET UP RANDOM NUMBER BASED ON OBJECT LENGTH
function randomQuestion(Object){
  console.log(questionUsed)
  var rand=Math.floor((Math.random() * Object.length-1) + 1);
  currentQuestion=rand
  return rand
  // need to improve the random function to avoid duplicate question
  // if (questionUsed.includes(rand)){
  //   randomQuestion(allQuestions)
  // }
  // else{
  //   return rand
  //}
 
}


// DISPLAY NEW QUESTION
function DisplayNewQuestion(number) {
  NumberQuestion++
  questionUsed[NumberQuestion]=number
  $("#question").text(allQuestions[number].question)
  $("#answer1").text(allQuestions[number].choices[0])
  $("#answer2").text(allQuestions[number].choices[1])
  $("#answer3").text(allQuestions[number].choices[2])
  $("#answer4").text(allQuestions[number].choices[3])
}



// SET UP TIMER FUNCTION

function RunningTimer(){
  timeLeft=30
  if (!clockRunning) {
      intervalId = setInterval(updateTime, 1000);
      clockRunning=true
    }
}
// UPDATE TIME
function updateTime(){
  if (timeLeft>0){
      timeLeft--
      console.log(timeLeft)
      $("#time").text("Time remaining "+ timeLeft+" Sec")}
  else {
      Unanswered++
      console.log("time expired Game Over")
      clearInterval(intervalId)
      clockRunning=false
      functionTimeout()
      }
    }
// SET UP CLICK HANDLER
    function SetupClickHandler(){
      
        $("#answer1").click(function(){
          click(1)});
        $("#answer2").click(function(){
          click(2)});
        $("#answer3").click(function(){
          click(3)});  
        $("#answer4").click(function(){
          click(4)});
      
      
    }
    
// ON CLICK ANSWERS
function click(answer){
  
  clearInterval(intervalId)
  clockRunning=false
switch (answer) {
    case 1:
    if (gameOver===false){
    if (allQuestions[currentQuestion].correctAnswer===1){
      GoodAnswer()
    }
    else{
      
      BadAnswer()
    }
    }
    break;
    
    case 2:
    if (gameOver===false){
    if (allQuestions[currentQuestion].correctAnswer===2){
      GoodAnswer()
    }
    else{
      BadAnswer()
    }
    }
    break;
    
    case 3:
    if (gameOver===false){
    if (allQuestions[currentQuestion].correctAnswer===3){
      GoodAnswer()
    }
    else{
      BadAnswer()
    }
    }
    break;

    case 4:
    if (gameOver===false){
      if (allQuestions[currentQuestion].correctAnswer===4){
          GoodAnswer()
        }
      
      else{
        BadAnswer()
      }
      }
    else{
    StartGame()
    }
    break;

  default:
    break;
}
  }

  


// VERIFY FUNCTION
function GoodAnswer(){
  Wins++
  timeLeft=30
  //$("#time").empty()
  $("#question").text("CORRECT")
  $("#answer1").empty()
  $("#answer2").empty()
  $("#answer3").empty()
  $("#answer4").empty()
  setTimeout(functionTimeout, 3000)
}

function BadAnswer(){
  Loses++
  timeLeft=30
  //$("#time").empty()
  $("#question").text("NOPE")
 $("#answer1").text("the good answer was: "+ allQuestions[currentQuestion].correctAnswer)
 $("#answer2").text(allQuestions[currentQuestion].choices[parseInt(allQuestions[currentQuestion].correctAnswer)-1])
  $("#answer3").empty()
  $("#answer4").empty()
  setTimeout(functionTimeout, 3000)
}


// Need fix Bug after first Result display and start over 2 click are going in click increment 2 wins
function Result(){
  gameOver=true
  timeLeft=30
  $("#time").empty()
  $("#question").text("All Done Here is how you did")
  $("#answer1").text("Correct Answers : "+ Wins)
  $("#answer2").text("Incorrect Answers : "+ Loses)
  $("#answer3").text("Unanswered : "+ Unanswered)
  $("#answer4").text("START OVER")
}

function functionTimeout() {
  if (NumberQuestion<5){
    DisplayNewQuestion(randomQuestion(allQuestions))
    RunningTimer()
  }
  else {
    Result()
  }
}

$(document).ready(function () {
    
});

window.onload = function() {
    StartGame()
  };
 

function StartGame(){
  clockRunning=false
  timeLeft=60
  Wins=0
  Loses=0
  Unanswered=0
  currentQuestion=0
  questionUsed=[]
  NumberQuestion=0
  gameOver=false
  DisplayNewQuestion(randomQuestion(allQuestions))
  SetupClickHandler()
  RunningTimer()
}