$(document).ready(function() {

// First create global variables for timer, questions, answers, answer types (correct, incorrect, unanswered)
var number = 30;
var intervalId;
var counter = 0;
var userAnswer = '';
var numberCorrect = 0;
var numberIncorrect = 0;
var numberUnanswered = 0;
var intervalId;

var questions = [
    {
        question: "You are a Millennial if you were born between?",
        choices: {
            A: '1984-2006',
            B: '1971-1984',
            C: '1997-2007',
            D: '1981-1997'
        },
        correctAnswer: 'D'
    },

    {
        question: "You Get Your News From?",
        choices: {
            A: 'CNN',
            B: 'The New York Times',
            C: 'Whoever posts it first on Facebook',
            D: 'BuzzFeed'
        },
        correctAnswer: 'C'
    },

    {
        question: "What is Your Preferred Social Media Website?",
        choices: {
            A: 'Facebook',
            B: 'Instagram',
            C: 'Twitter',
            D: 'Snapchat'
        },
        correctAnswer: 'D'
    },

    {
        question: "Which of These Hashtags Best Applies to You?",
        choices: {
            A: '#lol',
            B: '#nofilter',
            C: '#turnt',
            D: '#thisisapictureofgirlsnightoutfromlastfriday'
        },
        correctAnswer: 'B'
    },

    {
        question: "What is Your Favorite Channel to Stream Television?",
        choices: {
            A: 'Netflix',
            B: 'Youtube',
            C: 'Hulu',
            D: 'Amazon Video'
        },
        correctAnswer: 'B'
    },

    {
        question: "Who Do You Sing Along to (Alone) in the Car?",
        choices: {
            A: 'Madonna',
            B: 'Tracey Ellis Ross',
            C: 'Mac Miller',
            D: 'The Weekend'
        },
        correctAnswer: 'D'
    },

    {
        question: "When a Couple Asks You to Take a Picture of Them on Their Cell Phone, You... ",
        choices: {
            A: 'Take a Selfie',
            B: 'Have no clue where to find the camera',
            C: 'Pretend you are taking photos',
            D: 'Give the phone to your 9 year old granddaughter'
        },
        correctAnswer: 'A'
    },

    {
        question: "When You Get Your Plate at a Restaurant, You... ",
        choices: {
            A: 'Wait until everyone is served and then begin eating',
            B: 'Discretely take a picture of the gorgeous dish',
            C: 'Post a picture of your food on instagram with no fewer than 20 hashtags',
            D: 'Add a picture of the food to your Snap story'
        },
        correctAnswer: 'C'

    }
];

//Here I define my timer functions
function run() {
    console.log("run");
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    console.log("decrement");
    number--;
    $("#show-number").html("<h2>" + number + "</h2>");
    if (number === 0) {
        // stop();
        alert("Time is Up!");
        reset();
    }
}

function reset () {
    console.log("reset");
    number = 30;
    userAnswer = '';
    numberCorrect = 0;
    numberIncorrect = 0;
    numberUnanswered = 0;
    run();
    decrement();
}

function stop() {
    console.log("stop");
    clearInterval(intervalId);
}

run();
decrement();

//Select HTML Tags and store reference containers to the elements in variables so that I can divide quiz into three containers and refer to them later
var quizContainer =
document.getElementById('quiz');
var resultsContainer =
document.getElementById('results');
var submitButton = 
document.getElementById('submit');

// Outline the parameters that will pass through the generateQuiz function to display the quiz right away
generateQuiz(questions, quizContainer, resultsContainer, submitButton);

//Create the generateQuiz function
function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
    console.log("generateQuiz");

    // Hide start button when game begins
    $("#startButton").hide();
    // Hide restart button when game begins
    $("#restartButton").hide();

    //Define showQuestions function
    function showQuestions(questions, quizContainer) {
        console.log("showQuestions");

        //Create a space to store HTML output and answer choices
        var output = [];
        var choices;

        //For each question store a list of answer choices
        for (var i=0; i<questions.length; i++) {
            choices = [];

        //For each available answer add an HTML radio button
        for(letter in questions[i].choices) {
            choices.push(
                '<label>' +'<br>'
                + '<input type="radio" name="question'+i+'"value="'+letter+'">'
                + letter + ': '
                +
            questions[i].choices[letter]
                + '</label>'
            );
        }
            output.push(
                '<div class="questionAnswerGroup" style="display: none;">'+

                '<div class="question">' + questions[i].question + '</div>'
                + 
                '<div class="answers">' + choices.join('') + '</div>'
                +
                '</div>'   
            );
        }
        //Combine the output list into one string of HTML and put on the page
        quizContainer.innerHTML = output.join('');

        //Show next questions after user clicks a radio button
        $("[type='radio']").click(function(e){
        $(e.currentTarget).parent().parent().parent().hide();
        $(e.currentTarget).parent().parent().parent().next().show();
        reset();

        // Counter increases by 1 as user answer a question
        counter++; 

        // end quiz so user input is not required
        if (counter === questions.length) {
            console.log(counter === questions.length);
            showResults(questions, quizContainer, resultsContainer);
            stop();  
        };
    })

    $($(".questionAnswerGroup")[0]).show();
    
}

    function showResults (questions, quizContainer, resultsContainer) {
        console.log("showResults");
         
    // Gather answer containers from quiz
        var answerContainers = 
        document.querySelectorAll('.answers');

    // For each question find the answer selected
        for(var i=0; i<questions.length; i++) {
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||
        {}).value;

        if(userAnswer===questions[i].correctAnswer){
            console.log(userAnswer===questions[i].correctAnswer);
            
            // add to the number of Correct answers
            numberCorrect++;
        }

        // if answer is wrong
        if(userAnswer!=questions[i].correctAnswer){
            console.log(userAnswer!=questions[i].correctAnswer);

            // add to the number of Incorrect answers
             numberIncorrect++;
         
        }

         // if answer is blank
         if(!$('input[name=question'+i+']:checked').val()){ 
            console.log(!$('input[name=question'+i+']:checked').val());

             // add to number of unanswered  
             numberUnanswered++;
             numberIncorrect--;
        }

        //delay results to appear after restarting
        setTimeout(function(){
            $('.results').show();
        },1000);
        
    }
    // Define end quiz function
    function endQuiz(questions, quizContainer, resultsContainer){
            console.log("endQuiz");
        
            showResults(questions, quizContainer, resultsContainer);
            stop();
    }
    // shower number of correct, incorrect, and unanswered questions
    $("#show-number").html("<h2>" + number + "</h2>");
    $("#quiz").html("<h4>" + 'All Done, Heres How You Did!!' + "</h4>");
    $("#resultsCorrect").html("<h2>" + 'Correct Answers:' + numberCorrect + "</h2>");
    $("#resultsIncorrect").html("<h2>" + 'Incorrect Answers:' + numberIncorrect + "</h2>");
    $("#resultsUnanswered").html("<h2>" + 'Unanswered:' + numberUnanswered + "</h2>");
  
    // hide submit button
    $("#submit").hide();

    // show restart button
     $("#restartButton").show();
}
    // show quiz right away
    showQuestions(questions, quizContainer);

    // Restart Game
    restartButton.onclick = function(){
    generateQuiz(questions, quizContainer, resultsContainer, submitButton);
    showQuestions(questions, quizContainer);
    reset();
    $('.results').hide();
    $("#submit").show();
    }

    // Submit button click function, show results
    submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
    stop();
    }
}});
