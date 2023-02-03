//Possible screens
// START, IN_QUESTION, FINISHED

var current_screen = 'START'
var current_streak = 0
var streak_to_win = 3
var current_question
var n_questions_displayed = 0
var time_per_question_s = 15
var question_timeleft_s = time_per_question_s;
var question_timer = setInterval(update_progress_bar, 1000);
var finish_timeout
var time_before_reset_ms = 60000
var question_list = questions.questions

document.addEventListener('keydown', (event) => {
    console.log(`current screen: ${current_screen}`)
    console.log(`current streak: ${current_streak}`)
    var key = event.key;
    var code = event.code;
    if (key == 'r') {
        reset_game()
    }
    else if (key == 's' && current_screen == 'START') {
        current_screen = 'IN_QUESTION'
        new_question_screen()
    }
    else if (current_screen == 'IN_QUESTION') {
        if (current_question.answer == 'a' && key == 'a') {
            current_streak += 1
            new_question_screen()
        }
        else if (current_question.answer == 'b' && key == 'b') {
            current_streak += 1
            new_question_screen()
        }
        else if (current_question.answer == 'c' && key == 'c') {
            current_streak += 1
            new_question_screen()
        }
        else if (current_question.answer == 'd' && key == 'd') {
            current_streak += 1
            new_question_screen()
        }
        else if (current_streak >= streak_to_win) {
            you_win_screen()
        }
        else {
            n_questions_displayed += 1
        }
    }
}, false);

function startGame() {
    current_screen = 'IN_QUESTION'
    new_question_screen()
}

function reset_game() {
    console.log("reset game")
    current_screen = 'START'
    current_streak = 0
    location.reload()
}

function reset_by_time(){
    clearTimeout(finish_timeout)
    reset_game()
}

function start_screen() {
    document.body.innerHTML = `
    <div id="start-text">Presiona "Start" para jugar</div>
    <video id="background-video" autoplay muted loop> <source src="assets/start_scene_720.mp4" type="video/mp4"> </video>
    `
}

function new_question_screen() {
    if (current_streak >= streak_to_win) {
        you_win_screen()
        return
    }
    reset_question_timer()
    console.log("new_question_screen")
    var current_question_index = Math.floor(Math.random() * question_list.length)
    current_question = question_list[current_question_index]
    question_list.splice(current_question_index, 1)
    document.body.innerHTML = `
    <img id="question-image" src="assets/background.png">
    <progress id="progress-bar" value="${time_per_question_s}" max="${time_per_question_s}" id="progressBar"></progress>
    <div id="question-text">
    ${current_question.text}
    </div>
    <div class="options" id="options-div">
            <button class="buttonBlack" id="a" onclick="checkAnswer(a, ${current_question.answer})">${current_question.options["a"]}</button>
            <button class="buttonBlack" id="b" onclick="checkAnswer(b, ${current_question.answer})">${current_question.options["b"]}</button>
            <button class="buttonBlack" id="c" onclick="checkAnswer(c, ${current_question.answer})">${current_question.options["c"]}</button>            
    </div>
    `
}

function checkAnswer(answer, chosenOption) {
    n_questions_displayed += 1
    if (answer === chosenOption) {
        current_streak += 1
        turnButtonGreen(answer.id)
        if(current_streak >= 3){
            setTimeout(()=>{you_win_screen()}, 1000)
        }
        else if (n_questions_displayed >= 3){
            setTimeout(()=>{you_lost_screen()}, 1000)
        } else {
            setTimeout(()=>{new_question_screen()}, 1000)
        }    
    } else {
        turnButtonRed(answer.id)
        if (n_questions_displayed >= 3){
            setTimeout(()=>{you_lost_screen()}, 1000)
        } else {
            setTimeout(()=>{new_question_screen()}, 1000)
        }
    }
}

function turnButtonGreen(id) {
    console.log(`green id=${id}`)
    var element = document.getElementById(id)
    element.className = "buttonGreen"
}

function turnButtonRed(id) {
    console.log(`red id=${id}`)
    var element = document.getElementById(id)
    element.className = "buttonRed"
}

function you_lost_screen() {
    finish_timeout = setTimeout(reset_by_time, time_before_reset_ms)
    document.body.innerHTML = `
    <img id="question-image" src="assets/background.png">
    <div id="finish-text"> 
    ¡Gracias por participar!
    </div>
    <button id="restartButton" onclick="reset_game()">Jugar de nuevo</button>
    `
    current_screen = 'FINISHED'
    current_streak = 0
}

function time_out_screen() {
    finish_timeout = setTimeout(reset_by_time, time_before_reset_ms)
    document.body.innerHTML = `
    <img id="question-image" src="assets/background.png">
    <div id="finish-text"> 
    ¡Se acabó el tiempo!
    <br>
    Gracias por participar.
    </div>
    <button id="restartButton" onclick="reset_game()">Jugar de nuevo</button>
    `
    current_screen = 'FINISHED'
    current_streak = 0
}

function you_win_screen() {
    finish_timeout = setTimeout(reset_by_time, time_before_reset_ms)
    document.body.innerHTML = `
    <img id="question-image" src="assets/background.png">
    <div id="finish-text"> 
    <br><br><br><br><br>
    ¡Felicidades, ganaste!
    <br><br><br><br><br><br><br>
    </div>
    <button id="restartButton" onclick="reset_game()">Jugar de nuevo</button>
    `
    current_screen = 'FINISHED'
    current_streak = 0
}

function update_progress_bar() {
    if (question_timeleft_s <= 0) {
        time_out_screen();
        reset_question_timer()
    }
    if (current_screen == 'IN_QUESTION') {
        document.getElementById("progress-bar").value = question_timeleft_s;
        question_timeleft_s -= 1;
    }
}

function reset_question_timer() {
    question_timeleft_s = time_per_question_s
}

