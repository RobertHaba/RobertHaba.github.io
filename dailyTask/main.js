var imgDraggable = document.getElementsByTagName("img");
for (var i = 0; i < imgDraggable.length; i++) {
    imgDraggable[i].draggable = false;
}


function openWindow(options, thisEl) {
    var layoutStart = document.getElementById('layout-start');
    layoutStart.style.display = "none";
    var home = document.getElementById('home');
    var achievementsBox = document.getElementsByClassName('achievements-box')[0]
    if (home != options) {
        home.style.display = "none"
        achievementsBox.style.display = "none"
    } else {
        achievementsBox.style.display = "grid"
    }
    console.log(options);
    // Zamknięcie wszystkich sekcji menu
    closeWindow();
    if (thisEl == 0) {
        thisEl = document.getElementsByClassName('nav-opt')[1]
    }
    if (thisEl == 1) {
        thisEl = document.getElementsByClassName('nav-opt')[2]
    }

    // otwarcie wybranej sekcji
    var openBox = options;
    openBox.style.display = "block";

    var allNavOpt = document.getElementsByClassName('nav-opt');
    for (var i = 0; i < allNavOpt.length; i++) {
        if (allNavOpt[i].classList.contains('nav-opt-focus') == true)
            allNavOpt[i].classList.remove('nav-opt-focus')
    }
    thisEl.classList.add('nav-opt-focus');
    // Naprawa bugu przy "szybkim przejściu" z powiększonym screen'em
    var widthScreen = screen.width;
    var nav = document.getElementById('nav');
    var mainLayout = document.getElementsByClassName("layout")[0];
    var footerAll = document.getElementsByClassName('footer-mytask');
    var layout = document.getElementsByClassName('help-newTask')[0];
    var footer = document.getElementById('footerNewTask');
    var mainLayout = document.getElementsByClassName('layout')[0];

    if (mainLayout.offsetWidth < 481) {
        closeMobileMenu()

    } else {
        if (layout.offsetWidth == widthScreen) {
            mainLayout.style.gridTemplateColumns = "22vw 78vw";
            footer.style.width = "calc(78vw)";
            nav.style.display = "grid"
            for (var i = 0; i < footerAll.length; i++) {
                footerAll[i].style.width = "calc(78vw)";
            }
        }
    }
    // Czyszczenie klonowanych zadań
    var firstTaskHome = document.getElementById('firstTaskHome')
    var currenty = document.getElementById('currentyTask');
    if (firstTaskHome.innerHTML != "") {
        firstTaskHome.childNodes[0].remove()
    }
    if (currenty.innerHTML != "") {
        currenty.childNodes[0].remove()
    }


    var mainLayout = document.getElementsByClassName('layout')[0];
    if (mainLayout.offsetWidth < 481) {
        closeMobileMenu()

    }
    localStorageElements()
}

function closeWindow() {
    document.getElementById('newTask').style.display = "none";
    document.getElementById('myTask').style.display = "none";
    document.getElementById('dailyPlan').style.display = "none";
    document.getElementById('settings').style.display = "none";

    clear_InputNewTask()
    clearNowadayRecommended()

}



function clear_InputNewTask() {
    var clearSectionParent = document.getElementById('newTask');
    var input = document.getElementsByTagName("input")

    for (var i = 0; i < 3; i++) {
        clearSectionParent.getElementsByTagName('input')[i].value = "";
        clearSectionParent.getElementsByTagName('textarea')[0].value = "";

        document.getElementById('newTime').value = ""

    }
    for (var i = 0; i < input.length; i++) {
        input[i].className = ""
        input[i].style.border = "1px solid #CCC"

    }
    clearSectionParent.getElementsByTagName('textarea')[0].style.border = "1px solid #CCC"
    autoDate()
}
// Naprawa bugu z klonowaniem elementów
function clearNowadayRecommended() {
    var range = document.getElementById('nowadayRange')
    range.innerHTML = "";
    var currenty = document.getElementById('currentyTask')
    currenty.innerHTML = "";
    var popUpFirstTask = document.getElementById('popUpTask1')
    var popUpSecondTask = document.getElementById('popUpTask2')
    popUpFirstTask.innerHTML = "";
    popUpSecondTask.innerHTML = "";
}



function fullScreen(changeImg, idFooter, layoutClass) {
    var nav = document.getElementById('nav');
    var mainLayout = document.getElementsByClassName("layout")[0];
    var footer = document.getElementById(idFooter);
    var img = changeImg.childNodes;
    var layout = document.getElementsByClassName(layoutClass)[0];


    if (nav.style.display == "none") {
        nav.style.display = "grid";
        img[0].src = "icon/resize.svg"
        mainLayout.style.gridTemplateColumns = "22vw 78vw";


        footer.style.width = "calc(78vw)";
    } else {

        nav.style.display = "none";
        footer.style.width = "calc(100vw)";

        img[0].src = "icon/fit.svg"
        mainLayout.style.gridTemplateColumns = "0vw 100vw";
        mainLayout.style.transition = "width 1s ease";
    }


}




function popUpId(idEl, timeOut) {
    var popUpElement = document.getElementById(idEl);
    if (idEl == "popUpLogin") {
        if (document.body.clientWidth < 481) {

        } else {



            popUpElement.style.display = "flex";
            setTimeout(function() {

                popUpElement.style.display = "none";
            }, timeOut)
        }

    } else {
        var mainLayout = document.getElementsByClassName('layout')[0];
        if (mainLayout.offsetWidth < 481) {

        } else {



            popUpElement.style.display = "flex";
            setTimeout(function() {

                popUpElement.style.display = "none";
            }, timeOut)
        }
    }




}

function removeOldTask() {
    var task = document.getElementsByClassName('taskPlan');
    var taskDate = new Array
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
    var timeNow = String(yyyy) + String(mm) + String(dd);
    var timeTask = new Array
    var removeTaskArray = new Array

    for (var i = 0; i < task.length; i++) {
        taskDate = task[i].getElementsByClassName('task-date')[0]
        timeTask.push([parseInt(taskDate.innerHTML.slice(12) + taskDate.innerHTML.slice(9, 11) + taskDate.innerHTML.slice(6, 8)), task[i]])

        if (timeTask[i][0] < timeNow) {


            removeTaskArray.push(task[i])
        }
    }
    for (var i = 0; i < removeTaskArray.length; i++) {

        document.getElementById(removeTaskArray[i].id).remove()
    }




}






function achiPop(el) {
    var popUpName = document.getElementById('achi-name');
    var popUpBox = document.getElementById('popUpAchi')
    popUpBox.style.display = 'inline-block';
    var achiBox = document.getElementById(el)
    var nameAchi = achiBox.getElementsByClassName('achi-con-header')[0]
    popUpBox.style.animation = "8s achi-slide ease"

    popUpName.innerHTML = '"' + nameAchi.innerHTML + '"'
    setTimeout(function() {
        popUpBox.style.display = "none"
    }, 8000)

}


function localStorageElements() {

    var layoutPlan = document.getElementById('layout-plan')
    var taskLocal = layoutPlan.getElementsByClassName('taskPlan')

    var countTask = taskLocal.length
    var tab = new Array
    if (localStorage.getItem('myTasks')) {

        layoutPlan.innerHTML = JSON.parse(localStorage.getItem('myTasks'))

        for (var i = 0; i < JSON.parse(localStorage.myTasks).length; i++) {
            tab.push(taskLocal[i])


        }

        layoutPlan.innerHTML = "";
        for (var i = 0; i < JSON.parse(localStorage.myTasks).length; i++) {
            layoutPlan.appendChild(tab[i])

        }
        // Zapobiega sklonowaniu zadań z włączoną interakcją
        for (var i = 0; i < JSON.parse(localStorage.myTasks).length; i++) {
            taskLocal[i].classList.remove("taskPlanMove");
            taskLocal[i].setAttribute('draggable', false);
            taskLocal[i].style.cursor = "default";
            taskLocal[i].setAttribute('ondragstart', false)
        }

        removeOldTask()
    } else {
        addTaskToLocalStorage()

    }



}

function addTaskToLocalStorage(value, taskLengthEl) {
    var task = document.getElementsByClassName('taskPlan');
    var navOptionsMyTask = document.getElementsByClassName('nav-opt')[2]
    var allTaskArray = new Array

    if (value == "deleted" && taskLengthEl != "0") {
        for (var i = 0; i < JSON.parse(localStorage.myTasks).length - 1; i++) {
            allTaskArray.push(task[i].outerHTML);


        }
    } else if (taskLengthEl != "0" && task.length > 1 && value != "newTask") {

        if (localStorage.getItem('myTasks')) {
            for (var i = 0; i < JSON.parse(localStorage.myTasks).length + 1; i++) {

                allTaskArray.push(task[i].outerHTML);


            }
        } else {
            for (var i = 0; i < task.length; i++) {
                allTaskArray.push(task[i].outerHTML);
            }
        }
    }
    if (value == "newTask" && task.length == 1) {

        for (var i = 0; i < task.length; i++) {
            allTaskArray.push(task[i].outerHTML);
        }
    } else if (value == "newTask") {
        for (var i = 0; i < task.length; i++) {
            allTaskArray.push(task[i].outerHTML);
        }
    }

    if (taskLengthEl == "0") {

        layoutPlan.innerHTML = "";
        openWindow(myTask, navOptionsMyTask), openMyTask();

    }

    localStorage.setItem('myTasks', JSON.stringify(allTaskArray));

}