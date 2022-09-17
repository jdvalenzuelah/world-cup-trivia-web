//Possible screens
// START, IN_QUESTION, FINISHED

var current_screen = 'START'
var current_streak = 0
var streak_to_win = 3
var current_question
var time_per_question = 15
var question_timeleft = time_per_question;
var question_timer = setInterval(update_progress_bar, 1000);
var max_finish_timeleft = 10
var finish_timeleft = max_finish_timeleft

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
            you_lost_screen()
        }
    }
}, false);

function reset_game() {
    console.log("reset game")
    current_screen = 'START'
    current_streak = 0
    start_screen()
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
    var backgrounds = Array('background1.png', 'background2.png', 'background3.png')
    var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    question_list = questions.questions
    current_question = question_list[Math.floor(Math.random() * question_list.length)]
    document.body.innerHTML = `
    <img id="question-image" src="assets/${background}">
    <progress id="progress-bar" value="${time_per_question}" max="${time_per_question}" id="progressBar"></progress>
    <div id="question-text">
    ${current_question.text}
    <br><br><br><br>
    ${current_question.options}
    </div>
    `
}

function you_lost_screen() {
    var backgrounds = Array('background1.png', 'background2.png', 'background3.png')
    var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.innerHTML = `
    <img id="question-image" src="assets/${background}">
    <div id="finish-text"> 
    ¡Respuesta incorrecta!
    <br><br>
    Gracias por participar.
    <br><br><br><br><br><br><br><br><br><br>
    Presiona "Reset" para jugar de nuevo
    </div>
    `
    current_screen = 'FINISHED'
    current_streak = 0
}

function time_out_screen() {
    var backgrounds = Array('background1.png', 'background2.png', 'background3.png')
    var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.innerHTML = `
    <img id="question-image" src="assets/${background}">
    <div id="finish-text"> 
    ¡Se acabó el tiempo!
    <br><br>
    Gracias por participar.
    <br><br><br><br><br><br><br><br><br><br>
    Presiona "Reset" para jugar de nuevo
    </div>
    `
    current_screen = 'FINISHED'
    current_streak = 0
}

function you_win_screen() {
    var backgrounds = Array('background1.png', 'background2.png', 'background3.png')
    var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.innerHTML = `
    <img id="question-image" src="assets/${background}">
    <div id="finish-text"> 
    <br><br><br><br><br>
    ¡Felicidades, haz ganado!
    <br><br><br><br><br><br><br>
    Presiona "Reset" para jugar de nuevo
    </div>
    `
    current_screen = 'FINISHED'
    current_streak = 0
}

function update_progress_bar() {
    if (question_timeleft <= 0) {
        time_out_screen();
        reset_question_timer()
    }
    if (current_screen == 'IN_QUESTION') {
        document.getElementById("progress-bar").value = question_timeleft;
        question_timeleft -= 1;
    }
}

function reset_question_timer() {
    question_timeleft = time_per_question
}

function reset_by_time() {
    console.log("reset by time")
    if (finish_timeleft <= 0) {
        reset_game()
    }
    if (current_screen == 'FINISHED') {
        finish_timeleft -= 1;
    }
}

