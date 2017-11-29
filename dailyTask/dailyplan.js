function nowadayTask() {

    filterNowaday()


}
// wspomaga usunięcie funkcji 
var eventListenerPopUp = function addPopUpEvent() {

    popUpDailyTask(this, '')
}

function filterNowaday() {
    var task = document.getElementsByClassName('taskPlan');
    var taskDate = document.getElementsByClassName('task-date');
    var sliderNowaday = document.getElementById('slider-inline');
    var conCreateTaskInfo = document.getElementById('conCreateTaskInfo')


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    // Odpowiednie formatowanie obecnego czasu
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    var dateNow = dd + "." + mm + "." + yyyy;
    var timeNow = String(yyyy) + String(mm) + String(dd);
    var timeTask = new Array;
    var arrayTask = new Array;
    var cloneTask = new Array;
    var pushDate = document.getElementById('dateNow');
    pushDate.innerHTML = dateNow;
    // wszystkie zadania mieszczące się w dzisiejszym dniu

    for (var i = 0; i < task.length; i++) {
        timeTask.push([parseInt(taskDate[i].innerHTML.slice(12) + taskDate[i].innerHTML.slice(9, 11) + taskDate[i].innerHTML.slice(6, 8)), task[i]])
        if (timeTask[i][0] <= parseInt(timeNow)) {
            arrayTask.push(timeTask[i])
            cloneTask.push(task[i].cloneNode(true));

        }

    }
    var countHours = 0

    var range = document.getElementById('nowadayRange')
    var currenty = document.getElementById('currentyTask');
    var layout = document.getElementsByClassName("layout-dailyPlan")[0]
    if (cloneTask != "") {
        conCreateTaskInfo.style.display = "none";
        sliderNowaday.style.display = "flex"
        sortRangeLower(cloneTask, range, task)
        sortDate(cloneTask, currenty, countHours)
        popUpId('popUpNowadayTask', '5000');


    } // czyszczenie wszystkich timeBoxów- przy braku zadań 
    else {

        sliderNowaday.style.display = "none";
        var allTimeBoxForTask = document.getElementsByClassName('timeBox');
        var countTask = document.getElementsByClassName('taskNumbers')
        var timeBoxForTask = document.getElementsByClassName('timeBox')
        for (var i = 0; i < allTimeBoxForTask.length; i++) {


            if (allTimeBoxForTask[i].classList.contains('freeTime') == false) {
                allTimeBoxForTask[i].className += ' freeTime';

            }

            if (countTask[i].innerHTML != "") {

                countTask[i].innerHTML = "";
                timeBoxForTask[i].removeEventListener('click', eventListenerPopUp, false)
            }
        }

        conCreateTaskInfo.style.display = "flex";
        sliderNowaday.style.display = "none"



    }


    slider()

}



function slider() {
    var arraySliderEl = new Array;

    var range = document.getElementById('sliderNowaday');
    var currenty = document.getElementById("sliderCurrenty")
    arraySliderEl = [range, currenty]


}

function sortRangeLower(cloneTask, range, task) {

    var sortTask = new Array
    for (var b = 0; b < (cloneTask.length); b++) {

        sortTask.push([cloneTask[b].className + " " + b, cloneTask[b]]);
    }
    sortTask.sort();
    sortTask.reverse();

    var cln = sortTask[0][1].cloneNode(true);
    cln.style.display = "grid"
    range.innerHTML = "";
    range.appendChild(cln)



}

function sortDate(cloneTask, currenty, count) {

    var arrayTask = new Array
    var hoursTask, minutesTask, suma = 0;
    for (var i = 0; i < cloneTask.length; i++) {
        hoursTask = cloneTask[i].getElementsByClassName('task-date')[0].innerHTML.slice(0, 2);
        minutesTask = cloneTask[i].getElementsByClassName('task-date')[0].innerHTML.slice(3, 5);
        suma = hoursTask + minutesTask;
        arrayTask.push([suma, cloneTask[i]]);
    }

    var sortArrayTask = ""
    sortArrayTask = arrayTask.sort()

    var cln = sortArrayTask[0][1].cloneNode(true)
    currenty.innerHTML = ""
    currenty.appendChild(cln);
    showBetweenHours(cloneTask, sortArrayTask, count)
}

function showBetweenHours(task, sortArrayTask, count) {

    var timeTask;
    var timeBoxForTask, countTaskInHour;
    var allNumberBox = document.getElementsByClassName('taskNumbers');
    var allTimeBoxForTask = document.getElementsByClassName('timeBox');
    eventListenerPopUp = function addPopUpEvent() {

        popUpDailyTask(this, sortArrayTask)
    }
    for (var i = 0; i < allNumberBox.length; i++) {
        allNumberBox[i].innerHTML = "";

    }

    for (var i = 0; i < task.length; i++) {
        timeTask = task[i].getElementsByClassName('task-date')[0]


        timeBoxForTask = document.getElementsByClassName('timeBox H' + timeTask.innerHTML.slice(0, 2))[0];

        countTaskInHour = timeBoxForTask.getElementsByClassName('taskNumbers')[0];

        count = 0;

        count++;
        if (countTaskInHour.innerHTML == 'Ilość zadań 1') {
            count++;
        }
        countTaskInHour.innerHTML = 'Ilość zadań ' + count;
        if (countTaskInHour.innerHTML != "") {
            countTaskInHour.innerHTML = 'Ilość zadań ' + count;



            if (timeBoxForTask.classList.contains('freeTime') == true) {
                timeBoxForTask.classList.remove('freeTime');

            }

        }



        if (countTaskInHour != "") {

            timeBoxForTask.addEventListener('click', eventListenerPopUp, false)

        }

    }

    var countTask = document.getElementsByClassName('taskNumbers')
    var helpCountTask
    for (var i = 0; i < allTimeBoxForTask.length; i++) {

        if (countTask[i].innerHTML == "") {

            if (allTimeBoxForTask[i].classList.contains('freeTime') == false) {
                allTimeBoxForTask[i].className += ' freeTime';

            }


        }


    }




}

function popUpDailyTask(timeBox, el) {
    var popUpParent = document.getElementById('popUpDailyTask');
    var popUpFirstTask = document.getElementById('popUpTask1')
    var popUpSecondTask = document.getElementById('popUpTask2')
    var closePop = document.getElementsByClassName("popDailyTask-close")[0];

    popUpParent.style.display = "flex";
    var test, count = 0;

    for (var i = 0; i < el.length; i++) {
        test = el[i][0].slice(0, 2)
        if (timeBox.className.slice(9, 11) == test) {

            count++
            if (count == 1) {
                popUpFirstTask.innerHTML = (el[i][1]).innerHTML
                popUpSecondTask.style.display = "none";
            }


            if (count == 2) {
                popUpSecondTask.style.display = "grid";
                popUpSecondTask.innerHTML = (el[i][1]).innerHTML
            }
        }
    }



}

function closePopUpDailyTask() {
    var popUpParent = document.getElementById('popUpDailyTask');

    popUpParent.style.display = "none";
}