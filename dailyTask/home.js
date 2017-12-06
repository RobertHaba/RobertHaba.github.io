function nowadayHome() {
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
    var cloneAllTask = new Array;
    var pushDate = document.getElementById('dateNow');
    pushDate.innerHTML = dateNow;
    // wszystkie zadania mieszczące się w dzisiejszym dniu

    for (var i = 0; i < task.length; i++) {
        cloneAllTask.push(task[i].cloneNode(true));
        timeTask.push([parseInt(taskDate[i].innerHTML.slice(12) + taskDate[i].innerHTML.slice(9, 11) + taskDate[i].innerHTML.slice(6, 8)), task[i]])
        if (timeTask[i][0] <= parseInt(timeNow)) {
            arrayTask.push(timeTask[i])
            cloneTask.push(task[i].cloneNode(true));

        }


    }


    var taskArray = new Array;

    function sortNumber(a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }


    for (var i = 0; i < cloneAllTask.length; i++) {
        taskArray.push([taskDate[i].innerHTML.slice(12) + taskDate[i].innerHTML.slice(9, 11) + taskDate[i].innerHTML.slice(6, 8) + taskDate[i].innerHTML.slice(0, 2) + taskDate[i].innerHTML.slice(3, 5), cloneAllTask[i]])

        taskArray.sort(sortNumber)

    }



    var firstTaskHome = document.getElementById('firstTaskHome')


    var textFirstTask = document.getElementsByClassName('text-firstTask')[0]
    if (cloneAllTask != "") {
        firstTaskHome.innerHTML = ""
        taskArray[0][1].style.display = "grid"
        firstTaskHome.appendChild(taskArray[0][1]);

        textFirstTask.innerHTML = "Twoje najbliższe zadanie:";
    } else {

        textFirstTask.innerHTML = "Brak zadań";

    }

    if (cloneTask != "") {


        rangeLvl(cloneTask)


    } else {
        noTaskNowaday()



    }

}


function rangeLvl(cloneTask) {


    var rangeTask = new Array
    for (var b = 0; b < (cloneTask.length); b++) {


        if (cloneTask[b].className.slice(9, 10) == 'a') {
            rangeTask.push(1)
        }
        if (cloneTask[b].className.slice(9, 10) == 'b') {
            rangeTask.push('2')
        }
        if (cloneTask[b].className.slice(9, 10) == 'c') {
            rangeTask.push('3')
        }
        if (cloneTask[b].className.slice(9, 10) == 'd') {
            rangeTask.push('4')
        }
        if (cloneTask[b].className.slice(9, 10) == 'e') {
            rangeTask.push('5')
        }

    }
    var suma = 0;
    for (var i = 0; i < rangeTask.length; i++) {
        suma += parseInt(rangeTask[i]);
    }

    var textRange = document.getElementsByClassName('textRange')[0]
    var quoteRange = document.getElementsByClassName('quoteRange')[0]


    if (suma <= 2) {
        textRange.innerHTML = "Dzisiejszy dzień zapowiada się spokojnie."
        quoteRange.innerHTML = '"Droga do sukcesu jest zawsze w budowie."'

    } else if (suma <= 4) {
        textRange.innerHTML = "Dzisiejsze zadania nie są specjalnie trudne."
        quoteRange.innerHTML = '"Miej jasno określony cel. Nie podążaj na ślepo. Dąż do bycia najlepszym. To będzie Twoją motywacją/tym co Cię napędza."'
    } else if (suma <= 7) {
        textRange.innerHTML = "Dzisiejszy zadania pozwolą Ci się trochę wysilić."
        quoteRange.innerHTML = '"Kiedy przestajesz się rozwijać i pracować nad sobą. Nie stajesz się lepszy. To właśnie dzień, w którym umierasz."'
    } else if (suma <= 10) {
        textRange.innerHTML = "Przygotuj się na męczący dzień."
        quoteRange.innerHTML = '"Dziś zrób to czego innym się nie chce, a jutro będziesz miał to czego inni pragną."'
    } else if (suma >= 11) {
        textRange.innerHTML = "Okey... Dzisiaj będzie naprawdę ciężko."
        quoteRange.innerHTML = '"To czego boimy się najbardziej jest przeważnie tym, co właśnie powinniśmy zrobić."'
    }
    textRange.innerHTML += " (" + suma + ")";



}

function noTaskNowaday() {
    var textRange = document.getElementsByClassName('textRange')[0]
    var quoteRange = document.getElementsByClassName('quoteRange')[0]
    textRange.innerHTML = "Brak zadań na dzień dzisiejszy"
    quoteRange.innerHTML = "Twoja przyszłość jest tworzona przez to, co robisz dzisiaj, nie jutro "
}

// achievements





function achievements() {

    var achiBox = document.getElementById('planning-maniac-box')
    var completeAchi = achiBox.getElementsByClassName('achi-small-con')[0]
    console.log(localStorage.getItem('countCreatedTask'))
    if (parseInt(localStorage.getItem('countCreatedTask')) >= "50") {



        completeAchi.innerHTML = ""

        completeAchi.style.backgroundImage = "url('icon/checked.svg')";
        completeAchi.style.backgroundSize = "50px 50px"
        completeAchi.style.backgroundRepeat = 'no-repeat'
        completeAchi.style.backgroundPosition = 'center'

    } else {

        var habitue = document.getElementById('habitue')
        var dailyStrategist = document.getElementById('dailyStrategist')

        var planningManiac = document.getElementById('planningManiac')
        var parentPlanningManiac = planningManiac.parentElement;
        var infoPlanningManiac = parentPlanningManiac.getElementsByClassName('countAchi')[0]



        var countPlanningManiac = countCreated
        var countCreatedTaskLocalStorage = localStorage.setItem('countCreatedTask', countCreated)


        if (countPlanningManiac != "0" && countCreated <= "50") {
            countPlanningManiac = parseInt(countPlanningManiac) * 2;
            infoPlanningManiac.innerHTML = countCreated
            var help = 100 - countPlanningManiac

            planningManiac.style.width = "calc(100% - " + help + "%)"

        }
        if (countCreated == "50") {
            achiPop('planning-maniac-box')

            completeAchi.innerHTML = ""

            completeAchi.style.backgroundImage = "url('icon/checked.svg')";
            completeAchi.style.backgroundSize = "50px 50px"
            completeAchi.style.backgroundRepeat = 'no-repeat'
            completeAchi.style.backgroundPosition = 'center'
        }
    }






}