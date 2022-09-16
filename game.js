//Possible screens
// START, IN_QUESTION, FINISHED

var current_screen = 'START'
var current_streak = 0
var streak_to_win = 3
var current_question

document.addEventListener('keydown', (event) => {
    console.log(`current screen: ${current_screen}`)
    console.log(`current streak: ${current_streak}`)
    var key = event.key;
    var code = event.code;
    if (key == 'r') {
        current_screen = 'START'
        current_streak = 0
        start_screen()
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
    console.log("new_question_screen")
    var backgrounds = Array('background1.png', 'background2.png', 'background3.png')
    var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    question_list = questions.questions
    current_question = question_list[Math.floor(Math.random() * question_list.length)]
    document.body.innerHTML = `
    <img id="question-image" src="assets/${background}">
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
    <div id="question-text"> 
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

function you_win_screen() {
    var backgrounds = Array('background1.png', 'background2.png', 'background3.png')
    var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.innerHTML = `
    <img id="question-image" src="assets/${background}">
    <div id="question-text"> 
    <br><br><br><br><br>
    ¡Felicidades, haz ganado!
    <br><br><br><br><br><br><br>
    Presiona "Reset" para jugar de nuevo
    </div>
    `
    current_screen = 'FINISHED'
    current_streak = 0
}

