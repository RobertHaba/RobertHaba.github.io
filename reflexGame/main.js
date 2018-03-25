var time = (new Date()).getTime();
var startTime = (new Date()).getTime()
var countClick = 0;
var timeArray = []
var sessionReactionTime = []
var startPar = false;
var countAllClick = 0;
var timeForStop
var player = {}
document.getElementById('game-window').addEventListener('click', function() {
    allClick()
})

function allClick() {
    countAllClick += 1;
    console.log('Wszystkie kliknięcia: ' + countAllClick)
}
start(false)
var stopGame

function start(par, configure) {
    player = {
        name: 0,
        reaction: 0,
        time: 10000
    }

    if (par == false) {
        if (configure == 'yes') {
            stopGame.pause()
        }

        popUp()
    } else {
        valForm()

    }
}



function stop() {
    stopGame = new Timer(function() {
        console.log('STOP')
        reactionTimeStats()
        showStats()
    }, player.time);
}

function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}






function reactionTimeStats() {
    var reactionObj = {
        best: 0,
        worst: 0,
        average: 0,
        missClick: countAllClick - countClick,
        allClick: countAllClick
    }
    if (1 > timeArray.length) {
        timeArray[0] = 0;
    }
    reactionObj.best = timeArray.sort(sortTime)[0].toFixed(3)

    reactionObj.worst = timeArray.sort(sortTime).slice(-1)[0].toFixed(3)
    var result = 0;
    for (var index of timeArray.keys()) {
        result += timeArray[index]
    }
    reactionObj.average = (result / countClick).toFixed(3);

    if (reactionObj.average == "NaN") {
        reactionObj.average = 0;
    }
    console.log(reactionObj)
    sessionReactionTime.push(reactionObj)
    console.log("Dobre kliknięcia: " + countClick)
    console.log(sessionReactionTime)
    findBestTime()

}

function findBestTime() {
    var sessionArr = []
    for (var session in sessionReactionTime) {
        if (sessionReactionTime[session].best > 0.000) {
            sessionArr.push(sessionReactionTime[session].best)
        }

    }
    sessionArr = sessionArr.sort(function(a, b) {
        console.log(a + " " + Number(b))
        return Number(a) - Number(b)
    })
    console.log("______________________________________")
    for (var index in sessionReactionTime) {
        if (sessionArr[0] == sessionReactionTime[index].best) {
            return sessionReactionTime[index]
        }
    }
    console.log("______________________________________")
}

function showStats() {
    clearTimeout(stopGame)
    var stats
    document.querySelector('.pop-up-stats').style.display = "flex";
    document.querySelector('#player-name').innerHTML = player.name
    document.querySelector('#gameTime').innerHTML = player.time / 1000
    stats = sessionReactionTime
    console.log(stats)
    console.log(sessionReactionTime)
    lastStats = stats[stats.length - 1]
    var showLast = document.querySelector('.stats-right__div--last');
    var showLastEl = showLast.querySelectorAll('tr')

    for (let i = 0; i < showLastEl.length; i++) {

        showLastEl[i].querySelector('td:last-child').innerHTML = lastStats[Object.keys(lastStats)[i]]
    }
    var showBest = document.querySelector('.stats-right__div--best');
    var showBestEl = showBest.querySelectorAll('tr')
    var bestStats = findBestTime()
    console.log(bestStats)
    for (let i = 0; i < showBestEl.length; i++) {

        showBestEl[i].querySelector('td:last-child').innerHTML = bestStats[Object.keys(bestStats)[i]]
    }

}


function clickBlock(el) {
    console.log(time)
    var timeNow = (new Date()).getTime();

    var reactionTime = timeNow - time
    spawnBlock(el, reactionTime)
    timeArray.push((timeNow - time) / 1000)
    time = timeNow

    countClick += 1;


}

function spawnBlock(lastEl, reactionTime) {


    var position = newPosition(lastEl, reactionTime)

    lastEl.style.marginTop = position.topH + "px";
    lastEl.style.marginLeft = position.leftW + "px";



}

function sortTime(a, b) {
    return a - b;
}



function newPosition(lastEl, reactionTime) {
    var widthWindow = document.getElementById('game-window').offsetWidth;
    var heightWindow = window.innerHeight - 50;

    reactionTime = reactionTime / 1000;
    var w = widthWindow
    var h = heightWindow

    var left = lastEl.offsetLeft;
    var top = lastEl.offsetTop;
    var time = reactionTime;

    //

    w = w / time;
    h = h / time;
    //
    w = w - h;
    h = h - (top / time + 0.3);
    console.log(w)
    console.log(h)
    if (left < (widthWindow / 2)) {
        console.log('Tu działa pierwsza połowa dla W: Left: ' + left + " W: " + w)

        w = w + left;
        if (w >= (widthWindow - lastEl.clientWidth)) {
            w = (widthWindow - lastEl.clientWidth) / (time + 1);
            if (w <= 0) {
                w = clientHeight * (time + 1)
                if (w >= (widthWindow - lastEl.clientWidth)) {
                    w = widthWindow - clientWidth
                }
            }
        }

    } else if (left >= (widthWindow / 2)) {

        w = (w - left) / time;
        console.log('Tu działa druga połowa dla W: Left: ' + left + " W: " + w)
        if (w <= 0) {
            w = w * (-1);
        } else if (w >= (widthWindow - lastEl.clientWidth)) {
            w = lastEl.clientWidth / (time + 1);
        }
    }

    if (top < (heightWindow / 2)) {

        h = h - (top / time + 0.2);
        console.log('Tu działa pierwsza połowa dla H: Top: ' + top + " H: " + h)
        if (h >= (heightWindow - lastEl.clientHeight)) {
            h = (heightWindow - (lastEl.clientHeight - (top / time) / 2)) / 3;


        }
        if (h <= 50) {
            h = h + (top / (time + 1.2));
            if (h >= (heightWindow - lastEl.clientHeight)) {
                h = (heightWindow - lastEl.clientHeight) / (time + 1)
            }
        }
    } else if (top >= (heightWindow / 2)) {
        console.log('Tu działa druga połowa dla H: Top: ' + top + " H: " + h)
        h = (heightWindow - lastEl.clientHeight) / (time + 1.3)
        if (h >= (heightWindow - lastEl.clientHeight)) {
            h = (h - (top / (time + 1))) / 2;
            if (h <= 50) {
                h = lastEl.clientHeight + 5;
            }
            if (h >= (heightWindow - lastEl.clientHeight)) {
                h = (heightWindow - lastEl.clientHeight) / (time + 1)

            }
            console.log(' Powinno działać normalnie')
        } else {
            h = (h + (top / (time + 1.3))) / 2;
            console.log(' h jest większe od FullH')
            if (h >= (heightWindow - lastEl.clientHeight)) {
                h = ((h - heightWindow) <= heightWindow) ? h + lastEl.clientHeight - heightWindow : 60 + lastEl.clientHeight;
                if (h >= (heightWindow - lastEl.clientHeight)) {
                    h = (heightWindow - lastEl.clientHeight) / (time + 1);
                }
                console.log(' Bład')
            }
        }

    }
    console.log("po w " + w)
    console.log("po h " + h)
    var positionObj = {
        leftW: w,
        topH: h
    }
    return positionObj;
}

function popUp() {
    var popUpCon = document.getElementsByClassName('pop-up-loggin')[0];

    var form = document.getElementsByClassName('pop-up-form')[0];

    popUpCon.style.display = 'flex';
    popUpCon.style.animation = 'popUpAnim 1s ease-in forwards'

    form.style.display = "flex";
    form.style.animation = "formAnim 1s ease-in forwards"

}

function closePopUp(popUp) {
    popUp = document.querySelector('#' + popUp)
    popUp.style.display = 'none'



}
var intervalSec

function valForm() {

    var popUpCon = document.getElementsByClassName('pop-up-form')[0];
    var namePlayer = document.querySelectorAll('input[name="name"]')[0]
    var timeGame = document.querySelectorAll('input[name="timeGame"]')
    var radio = document.querySelectorAll('input[name="obstacle"]')
    var obstacle = validateRadio(radio)
    var timeChecked = validateRadio(timeGame)
    console.log(timeChecked.value)
    if (namePlayer.value.length > 0) {

        popUpCon.style.display = 'none'
        player.name = namePlayer.value;
        player.obstacle = obstacle.value
        player.time = timeChecked.value * 1000;
        timeForStop = player.time
        document.querySelector('.pop-up-loggin').style.display = 'none'
        resetParm()


    }

    namePlayer.style.border = (namePlayer.value.length <= 0) ? "1px solid rgba(223, 64, 85, 1)" : "1px solid #6babff"

}

function resetParm() {
    var popUp = document.getElementsByClassName('pop-up-loggin')[0];
    clearInterval(intervalSec)
    popUp.style.display = "none"
    time = (new Date()).getTime();
    startTime = (new Date()).getTime()
    countClick = 0;
    timeArray = []
    timeForStop = player.time
    countAllClick = 0;
    clearTimeout(stopGame)
    stop()
}

function runSmallPopUp(popUpName) {
    stopGame.pause();
    document.querySelector('#' + popUpName).style.display = 'flex'

}

function continueGame() {
    stopGame.resume();
}

function validateRadio(radios) {
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i];
    }
    return false;
}