var time = (new Date()).getTime();
var startTime = (new Date()).getTime()
var countClick = 0;
var timeArray = []
var sessionReactionTime = []
var startPar = false;
var countAllClick = 0;
var timeForStop
var player = {}
var timeCounter
var players = {
    first: {
        avatar: '',
        name: '',
        challenge: '',
        stats: '',
    },
    second: {
        avatar: '',
        name: '',
        challenge: '',
        stats: '',
    },
    third: {
        avatar: '',
        name: '',
        challenge: '',
        stats: '',
    }


}
var playersPosition = [0, 0, 0]
var countStopRivalry = 0;
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
    console.log(par, configure)
    player = {
        players: 1,
        time: 10000
    }
    nextCountRun = 1;
    countStopRivalry = 0;
    if (par == false) {
        if (configure == 'yes') {
            timeCounter.pause()
        }

        popUp()
    } else {

        valForm()

    }
}






var secondsCounter = 0,
    miliSecondsCounter = 0
var timeBox = document.querySelector('.nav-list__li--time-counter')

function stop() {

    addPenaltyToStats = 0;
    reactionTimeStats()
    showStats()

}


function stopRivalry(playerObject) {


    var oldElBtn = document.querySelector('#startRivalry');
    var newElBtn = oldElBtn.cloneNode(true)
    oldElBtn.parentNode.replaceChild(newElBtn, oldElBtn);

    document.querySelector('#startRivalry').addEventListener('click', closePopUp('pop-up-round'))
    console.log('---------------------------- dziasdas')
    reactionTimeStats(playerObject)
    timeCounter.pause();
    clearTimeout(timeCounter)
    console.log()
    countStopRivalry += 1;
    if (countStopRivalry == player.players) {
        console.log('asdas')
        findBestTime('friends')
        addPenaltyToStats = 0
        showChallengeStats()

        ranking()
    }
    secondsCounter = 0,
        miliSecondsCounter = 0
}


function startTimeCounter(playerObject) {

    timeCounter = new RecurringTimer(function() {

        miliSecondsCounter += 10;
        if (miliSecondsCounter % 100 == 0) {
            secondsCounter += 1;
            miliSecondsCounter = 00;

        }
        timeBox.innerHTML = secondsCounter + ":" + miliSecondsCounter;
        if (secondsCounter >= (player.time / 1000)) {

            if (player.players <= 1) {
                stop()
            } else {
                stopRivalry(playerObject)
                console.log('Grasz w trybie rywalizacji')
            }

            console.log('a')
            secondsCounter = 0;
            miliSecondsCounter = 0
            clearTimeout(timeCounter)
            timeCounter.pause()
            return;

        }
    }, 100)
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

function RecurringTimer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    var resume = function() {
        start = new Date();
        timerId = window.setTimeout(function() {
            remaining = delay;
            resume();
            callback();
        }, remaining);
    };

    this.resume = resume;

    this.resume();
}

// 
var addPenaltyToStats = 0;

function reactionTimeStats(playerObject) {
    addPenaltyToStats += 1;
    console.log(playerObject)
    var reactionObj = {
        best: 99,
        worst: 0,
        average: 99,
        missClick: countAllClick - countClick,
        allClick: countAllClick,
        score: 99 + addPenaltyToStats
    }
    if (1 > timeArray.length) {
        timeArray[0] = 0;
    }


    if (countClick !== 0) {
        reactionObj.best = timeArray.sort(sortTime)[0].toFixed(3)
        reactionObj.worst = timeArray.sort(sortTime).slice(-1)[0].toFixed(3)
        var result = 0;
        for (var index of timeArray.keys()) {
            result += timeArray[index]
        }
        console.log(result)
        reactionObj.score = ((result / countClick)) / countClick.toFixed(3);
        reactionObj.average = (result / countClick).toFixed(3);
        console.log(reactionObj.average)
        console.log("Dobre kliknięcia: " + countClick)

        console.log(playerObject)
        console.log(players.third)
        console.log(reactionObj)

    }
    if (typeof playerObject == 'undefined') {
        findBestTime('single')
        sessionReactionTime.push(reactionObj)
        console.log(sessionReactionTime)
    } else {
        if (playerObject == players.first) {
            playerObject.stats = reactionObj
            roundPlayers(players.second)
            console.log('Drugi gracz')
        } else if (playerObject == players.second) {
            playerObject.stats = reactionObj
            if (player.players == 3) {
                roundPlayers(players.third)
            }
            console.log('firsyt')
        } else if (playerObject == players.third) {
            playerObject.stats = reactionObj
            console.log('======================================================================')
        }


        console.log(playerObject)
    }





}

function findBestTime(gameMode) {
    if (gameMode == 'single') {
        var sessionArr = []
        console.log(sessionReactionTime)
        for (var session in sessionReactionTime) {
            if (sessionReactionTime[session].score > 0) {
                sessionArr.push(sessionReactionTime[session].score)
            }



        }

        sessionArr = sessionArr.sort(function(a, b) {
            console.log(a + " " + Number(b))
            return Number(a) - Number(b)
        })
        console.log("______________________________________")
        for (var index in sessionReactionTime) {
            if (sessionArr[0] == sessionReactionTime[index].score) {
                return sessionReactionTime[index]
            }
        }
        console.log("______________________________________")
    } else if (gameMode == 'friends') {
        var allStatsFriends = []
        for (var i = 0; i < player.players; i++) {
            allStatsFriends.push(players[Object.keys(players)[i]].stats.score)
        }
        allStatsFriends = allStatsFriends.sort(function(a, b) {
            console.log(a + " " + Number(b))
            return Number(a) - Number(b)
        })

        console.log("_____________________________________________________")
        console.log(allStatsFriends)
        var positionCount = 0
        for (var i = 0; i < player.players; i++) {

            if (allStatsFriends[0] == players[Object.keys(players)[i]].stats.score) {
                console.log(i)
                console.log(players[Object.keys(players)[i]].stats.score)
                playersPosition[0] = players[Object.keys(players)[i]]
            } else if (allStatsFriends[1] == players[Object.keys(players)[i]].stats.score) {
                console.log(i)
                console.log(players[Object.keys(players)[i]].stats.score)
                playersPosition[1] = players[Object.keys(players)[i]]
            } else if (allStatsFriends[2] == players[Object.keys(players)[i]].stats.score) {
                console.log('+++++++++++++++++++++++++++++++++++++++++To dziala')
                playersPosition[2] = players[Object.keys(players)[i]]
            }




        }
        console.log(playersPosition)
        console.log("_____________________________________________________")
    }

}

function showStats() {
    clearTimeout(stopGame)
    timeCounter.pause();
    clearTimeout(timeCounter)
    var stats
    document.querySelector('.pop-up-stats').style.display = "flex";

    document.querySelector('#gameTime').innerHTML = player.time / 1000
    stats = sessionReactionTime
    console.log(stats)
    console.log(sessionReactionTime)
    lastStats = stats[stats.length - 1]
    var showLast = document.querySelector('.stats-right__div--last');
    var showLastEl = showLast.querySelectorAll('tr')
    console.log(lastStats)
    if (typeof lastStats !== 'undefined') {
        for (let i = 0; i < showLastEl.length; i++) {

            showLastEl[i].querySelector('td:last-child').innerHTML = lastStats[Object.keys(lastStats)[i]]
        }
        var showBest = document.querySelector('.stats-right__div--best');
        var showBestEl = showBest.querySelectorAll('tr')
        if (lastStats.best !== "0.000") {
            var bestStats = findBestTime('single')


            for (let i = 0; i < showBestEl.length; i++) {

                showBestEl[i].querySelector('td:last-child').innerHTML = bestStats[Object.keys(bestStats)[i]]
            }
        }


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

    var popUpEl = document.querySelector('#' + popUp)
    popUpEl.style.display = 'none'


}
var intervalSec

function ranking() {
    var popUp = document.querySelector('#ranking')
    popUp.style.display = 'flex'
}

function valForm() {

    var popUpCon = document.getElementsByClassName('pop-up-form')[0];

    var timeGame = document.querySelectorAll('input[name="timeGame"]')
    var radio = document.querySelectorAll('input[name="players"]')
    var playersLength = validateRadio(radio)
    var timeChecked = validateRadio(timeGame)
    console.log(timeChecked.value)


    popUpCon.style.display = 'none'

    player.players = playersLength.value

    player.time = timeChecked.value * 1000;
    timeForStop = player.time
    document.querySelector('.pop-up-loggin').style.display = 'none'
    if (player.players == 1) {

        document.querySelector('#restartMenu').style.display = 'flex'
        document.querySelector('#statsMenu').style.display = 'flex'
        document.querySelector('#settingsMenu').style.display = 'flex'
        resetParm()
    } else {

        document.querySelector('#restartMenu').style.display = 'none'
        document.querySelector('#statsMenu').style.display = 'none'
        document.querySelector('#settingsMenu').style.display = 'none'

        console.log(players.first)
        if (player.players == 2) {
            players.third.stats = ''
        }
        nextCountRun = 1;
        popUpPlayersMenu(players.first)
    }


}

function resetParm(playerObject) {
    var popUp = document.getElementsByClassName('pop-up-loggin')[0];
    clearInterval(intervalSec)
    popUp.style.display = "none"
    time = (new Date()).getTime();
    startTime = (new Date()).getTime()
    countClick = 0;
    timeArray = []
    timeForStop = player.time
    countAllClick = 0;
    secondsCounter = 0;
    miliSecondsCounter = 0

    clearTimeout(timeCounter)
    clearInterval(timeCounter)
    startTimeCounter(playerObject)

    clearTimeout(stopGame)

}

function runSmallPopUp(popUpName) {

    timeCounter.pause()
    document.querySelector('#' + popUpName).style.display = 'flex'

}

var chosenAvatar = ''

function popUpPlayersMenu(playerObject) {
    var popUpEl = document.querySelector('#menuPlayers');
    popUpEl.style.display = 'flex';
    var allAvatars = document.querySelectorAll('.img-avatars')

    for (var index of allAvatars) {

        index.addEventListener('click', function() {
            var test = document.querySelectorAll('.img-avatars')

            for (var i = 0; i < 4; i++) {
                test[i].className = 'img-avatars unchecked'
            }
            this.className = (this.className == 'img-avatars unchecked') ? 'img-avatars checked' : 'img-avatars unchecked';
            console.log(this.alt)
            chosenAvatar = this.alt

        })
    }

}
var nextCountRun = 1;

function next() {
    var input = document.getElementsByTagName('input');
    var allAvatars = document.querySelectorAll('.img-avatars')
    var playerName = document.querySelector('[name="playerName"]').value
    var challenge = document.querySelector('[name="challenge"]').value
    console.log(playerName)
    console.log(parseInt(player.players))
    console.log(nextCountRun);
    for (var avatar of allAvatars) {
        console.log(avatar.className)
        avatar.className = 'img-avatars unchecked'
    }
    nextCountRun += 1;
    if (nextCountRun <= player.players) {

        if (nextCountRun == 2) {
            console.log('asdasd')
            players.first.name = playerName
            players.first.challenge = challenge
            players.first.avatar = chosenAvatar
            popUpPlayersMenu(players.second)

        } else if (nextCountRun == 3) {
            players.second.name = playerName
            players.second.challenge = challenge
            players.second.avatar = chosenAvatar
            popUpPlayersMenu(players.third)
        }
    } else {
        console.log('asdas')
        var popUpEl = document.querySelector('#menuPlayers');
        popUpEl.style.display = 'none';
        if (nextCountRun == 3) {
            players.second.name = playerName
            players.second.challenge = challenge
            players.second.avatar = chosenAvatar
        }
        if (nextCountRun == 4) {
            players.third.name = playerName
            players.third.challenge = challenge
            players.third.avatar = chosenAvatar
        }
        roundPlayers(players.first)

    }
    document.querySelector('[name="playerName"]').value = ''
    document.querySelector('[name="challenge"]').value = ''
    for (var el of input) {

        el.innerHTML = ""
    }
    playerName = ""
    challenge = ""
    console.log(players)
}

function roundPlayers(playerObject) {
    console.log(playerObject)
    console.log('Dziala roundplayers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var popUpEl = document.querySelector('.pop-up-round');
    popUpEl.style.display = 'flex';
    var playerName = document.querySelector('#player-name')
    var playerAvatar = document.querySelector('#player-avatar')
    var playerChallenge = document.querySelector('#player-challenge')
    playerName.innerHTML = playerObject.name;
    playerAvatar.classList = 'round-player__avatar ' + playerObject.avatar;
    playerChallenge.innerHTML = playerObject.challenge;

    document.querySelector('#startRivalry').addEventListener('click', function() {
        closePopUp('pop-up-round')
        resetParm(playerObject)

    })
}

function continueGame() {

    timeCounter.resume();
}

function validateRadio(radios) {
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i];
    }
    return false;
}

function showChallengeStats() {
    var usersBox = document.querySelectorAll('.ranking-user-box')
    var thirdPlayerActive = true
    if (players.third.stats == "") {
        console.log('Nie ma takiego gracza')
        usersBox[2].style.display = 'none'
        thirdPlayerActive = false

    } else {
        usersBox[2].style.display = 'flex'
    }

    console.log(thirdPlayerActive)
    console.log(usersBox)
    console.log(usersBox.length)
    console.log(usersBox.entries())
    for (var [index, user] of usersBox.entries()) {
        if (thirdPlayerActive == false) {
            if (index <= 1) {
                user.querySelector('.ranking-img').className = 'ranking-img ' + playersPosition[index].avatar
                user.querySelector('.right-column-top__name h3').innerHTML = playersPosition[index].name
                console.log('dzia')
                user.querySelector('.score').innerHTML = playersPosition[index].stats.score.toFixed(13)
                user.querySelector('.right-column-bottom__best span').innerHTML = playersPosition[index].stats.best
                user.querySelector('.right-column-bottom__average span').innerHTML = playersPosition[index].stats.average
            }
        } else {
            user.querySelector('.ranking-img').className = 'ranking-img ' + playersPosition[index].avatar
            user.querySelector('.right-column-top__name h3').innerHTML = playersPosition[index].name
            user.querySelector('.score').innerHTML = playersPosition[index].stats.score.toFixed(13)
            user.querySelector('.right-column-bottom__best span').innerHTML = playersPosition[index].stats.best
            user.querySelector('.right-column-bottom__average span').innerHTML = playersPosition[index].stats.average
        }
        var contentChallenge = document.querySelector('.ranking-user__challenge')
        if (playersPosition[0].challenge !== '') {
            contentChallenge.innerHTML = playersPosition[0].challenge;
        } else {
            contentChallenge.innerHTML = 'Gracz: ' + playersPosition[0].name + ' nie wybrał wyzwania. Waszym wyzwaniem może być rewanż :)'
        }


    }

    countStopRivalry = 0;
}