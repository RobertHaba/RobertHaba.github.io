// All variables //

var time = (new Date()).getTime();
var startTime = (new Date()).getTime()
var secondsCounter = 0,
    miliSecondsCounter = 0
var timeArray = []
var timeForStop
var timeCounter

var countClick = 0;
var countAllClick = 0;
var sessionReactionTime = []

var player = {}
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
var addPenaltyToStats = 0;
var chosenAvatar = ''
var nextCountRun = 1;

var timeCounterBox = document.querySelector('.nav-list__li--time-counter')


// Game engine
document.getElementById('game-window').addEventListener('click', function() {
    countClickInTheGame()
})

function countClickInTheGame() {
    countAllClick += 1;
}


start(false)

function start(runParameters, pause) {

    player = {
        players: 1,
        gameTime: 10000
    }
    nextCountRun = 1;
    countStopRivalry = 0;
    if (runParameters == false) {
        if (pause == 'yes') {
            timeCounter.pause()
        }
        popUp()
    } else {
        valForm()
    }
}

// Block spawn engine

function clickBlock(el) {
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
    if (left < (widthWindow / 2)) {

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
        if (w <= 0) {
            w = w * (-1);
        } else if (w >= (widthWindow - lastEl.clientWidth)) {
            w = lastEl.clientWidth / (time + 1);
        }
    }

    if (top < (heightWindow / 2)) {

        h = h - (top / time + 0.2);
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
        h = (heightWindow - lastEl.clientHeight) / (time + 1.3)
        if (h >= (heightWindow - lastEl.clientHeight)) {
            h = (h - (top / (time + 1))) / 2;
            if (h <= 50) {
                h = lastEl.clientHeight + 5;
            }
            if (h >= (heightWindow - lastEl.clientHeight)) {
                h = (heightWindow - lastEl.clientHeight) / (time + 1)

            }
        } else {
            h = (h + (top / (time + 1.3))) / 2;
            if (h >= (heightWindow - lastEl.clientHeight)) {
                h = ((h - heightWindow) <= heightWindow) ? h + lastEl.clientHeight - heightWindow : 60 + lastEl.clientHeight;
                if (h >= (heightWindow - lastEl.clientHeight)) {
                    h = (heightWindow - lastEl.clientHeight) / (time + 1);
                }

            }
        }

    }

    var positionObj = {
        leftW: w,
        topH: h
    }
    return positionObj;
}

// Time Engine


function startTimeCounter(playerObject) {

    timeCounter = new RecurringTimer(function() {

        miliSecondsCounter += 10;
        if (miliSecondsCounter % 100 == 0) {
            secondsCounter += 1;
            miliSecondsCounter = 00;

        }
        timeCounterBox.innerHTML = secondsCounter + ":" + miliSecondsCounter;
        if (secondsCounter >= (player.gameTime / 1000)) {

            if (player.players <= 1) {
                stop()
            } else {
                stopRivalry(playerObject)

            }


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

function sortTime(a, b) {
    return a - b;
}

function continueGame() {

    timeCounter.resume();
}
// Form Val and Reset Parm
function valForm() {

    var popUpCon = document.getElementsByClassName('pop-up-form')[0];

    var timeGame = document.querySelectorAll('input[name="timeGame"]')
    var radio = document.querySelectorAll('input[name="players"]')
    var playersLength = validateRadio(radio)
    var timeChecked = validateRadio(timeGame)



    popUpCon.style.display = 'none'

    player.players = playersLength.value

    player.gameTime = timeChecked.value * 1000;
    timeForStop = player.gameTime
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
        var name = document.querySelector('[name="playerName"]').placeholder
        name = 'Gracz 1';

        if (player.players == 2) {
            players.third.stats = ''
        }
        nextCountRun = 1;
        popUpPlayersMenu(players.first)
    }


}

function validateRadio(radios) {
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i];
    }
    return false;
}

function resetParm(playerObject) {
    var popUp = document.getElementsByClassName('pop-up-loggin')[0];

    popUp.style.display = "none"
    time = (new Date()).getTime();
    startTime = (new Date()).getTime()
    countClick = 0;
    timeArray = []
    timeForStop = player.gameTime
    countAllClick = 0;
    secondsCounter = 0;
    miliSecondsCounter = 0

    clearTimeout(timeCounter)
    clearInterval(timeCounter)
    startTimeCounter(playerObject)


}



// Stop Game 
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

    reactionTimeStats(playerObject)
    timeCounter.pause();
    clearTimeout(timeCounter)

    countStopRivalry += 1;
    if (countStopRivalry == player.players) {

        findBestTime('friends')
        addPenaltyToStats = 0
        showChallengeStats()

        ranking()
    }
    secondsCounter = 0,
        miliSecondsCounter = 0
}



//  STATS

function reactionTimeStats(playerObject) {
    addPenaltyToStats += 1;

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

        reactionObj.score = ((result / countClick)) / countClick.toFixed(3);
        reactionObj.average = (result / countClick).toFixed(3);


    }
    if (typeof playerObject == 'undefined') {
        findBestTime('single')
        sessionReactionTime.push(reactionObj)

    } else {
        if (playerObject == players.first) {
            playerObject.stats = reactionObj
            roundPlayers(players.second)

        } else if (playerObject == players.second) {
            playerObject.stats = reactionObj
            if (player.players == 3) {
                roundPlayers(players.third)
            }

        } else if (playerObject == players.third) {
            playerObject.stats = reactionObj

        }

    }





}

function findBestTime(gameMode) {
    if (gameMode == 'single') {
        var sessionArr = []

        for (var session in sessionReactionTime) {
            if (sessionReactionTime[session].score > 0) {
                sessionArr.push(sessionReactionTime[session].score)
            }



        }

        sessionArr = sessionArr.sort(function(a, b) {

            return Number(a) - Number(b)
        })

        for (var index in sessionReactionTime) {
            if (sessionArr[0] == sessionReactionTime[index].score) {
                return sessionReactionTime[index]
            }
        }

    } else if (gameMode == 'friends') {
        var allStatsFriends = []
        for (var i = 0; i < player.players; i++) {
            allStatsFriends.push(players[Object.keys(players)[i]].stats.score)
        }
        allStatsFriends = allStatsFriends.sort(function(a, b) {

            return Number(a) - Number(b)
        })

        var positionCount = 0
        for (var i = 0; i < player.players; i++) {

            if (allStatsFriends[0] == players[Object.keys(players)[i]].stats.score) {

                playersPosition[0] = players[Object.keys(players)[i]]
            } else if (allStatsFriends[1] == players[Object.keys(players)[i]].stats.score) {

                playersPosition[1] = players[Object.keys(players)[i]]
            } else if (allStatsFriends[2] == players[Object.keys(players)[i]].stats.score) {

                playersPosition[2] = players[Object.keys(players)[i]]
            }




        }
    }

}

function showStats() {

    timeCounter.pause();
    clearTimeout(timeCounter)
    var stats
    document.querySelector('.pop-up-stats').style.display = "flex";

    document.querySelector('#gameTime').innerHTML = player.gameTime / 1000
    stats = sessionReactionTime

    lastStats = stats[stats.length - 1]
    var showLast = document.querySelector('.stats-right__div--last');
    var showLastEl = showLast.querySelectorAll('tr')

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

function showChallengeStats() {
    var usersBox = document.querySelectorAll('.ranking-user-box')
    var thirdPlayerActive = true
    if (players.third.stats == "") {

        usersBox[2].style.display = 'none'
        thirdPlayerActive = false

    } else {
        usersBox[2].style.display = 'flex'
    }

    for (var [index, user] of usersBox.entries()) {
        if (thirdPlayerActive == false) {
            if (index <= 1) {
                user.querySelector('.ranking-img').className = 'ranking-img ' + playersPosition[index].avatar
                user.querySelector('.right-column-top__name h3').innerHTML = playersPosition[index].name
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

// Pop ups
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

function ranking() {
    var popUp = document.querySelector('#ranking')
    popUp.style.display = 'flex'
}


function runSmallPopUp(popUpName) {

    timeCounter.pause()
    document.querySelector('#' + popUpName).style.display = 'flex'

}

// Friends mode

function popUpPlayersMenu(playerObject) {
    var popUpEl = document.querySelector('#menuPlayers');
    popUpEl.style.display = 'flex';
    var allAvatars = document.querySelectorAll('.img-avatars')
    chosenAvatar = '';
    for (var index of allAvatars) {

        index.addEventListener('click', function() {
            var test = document.querySelectorAll('.img-avatars')

            for (var i = 0; i < 4; i++) {
                test[i].className = 'img-avatars unchecked'
            }
            this.className = (this.className == 'img-avatars unchecked') ? 'img-avatars checked' : 'img-avatars unchecked';

            chosenAvatar = this.alt

        })
    }

}


function createNextPlayer() {
    var input = document.getElementsByTagName('input');
    var allAvatars = document.querySelectorAll('.img-avatars')
    var playerName = document.querySelector('[name="playerName"]').value
    var challenge = document.querySelector('[name="challenge"]').value

    for (var avatar of allAvatars) {

        avatar.className = 'img-avatars unchecked'
    }

    nextCountRun += 1;
    var showCreatePlayerNumber = document.querySelector('#player-number')
    showCreatePlayerNumber.innerHTML = nextCountRun;

    if (nextCountRun <= player.players) {

        if (nextCountRun == 2) {

            players.first.name = (playerName.length < 1) ? 'Gracz 1' : playerName;
            players.first.challenge = challenge
            players.first.avatar = chosenAvatar
            popUpPlayersMenu(players.second)

        } else if (nextCountRun == 3) {
            players.second.name = (playerName.length < 1) ? 'Gracz 2' : playerName;
            players.second.challenge = challenge
            players.second.avatar = chosenAvatar
            popUpPlayersMenu(players.third)
        }
    } else {

        var popUpEl = document.querySelector('#menuPlayers');
        popUpEl.style.display = 'none';
        if (nextCountRun == 3) {
            players.second.name = (playerName.length < 1) ? 'Gracz 2' : playerName;
            players.second.challenge = challenge
            players.second.avatar = chosenAvatar
            showCreatePlayerNumber.innerHTML = 1
        }
        if (nextCountRun == 4) {
            players.third.name = (playerName.length < 1) ? 'Gracz 3' : playerName;
            players.third.challenge = challenge
            players.third.avatar = chosenAvatar
            showCreatePlayerNumber.innerHTML = 1

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

}

function roundPlayers(playerObject) {

    var popUpEl = document.querySelector('.pop-up-round');
    popUpEl.style.display = 'flex';
    var resetAvatar = document.querySelector('#player-avatar')
    resetAvatar.className = 'round-player__avatar'
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