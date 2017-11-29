var countCreated

function taskLength() {

    if (!localStorage.getItem('countCreatedTask')) {
        countCreated = 0

    } else if (localStorage.getItem('countCreatedTask') == "2") {
        countCreated = parseInt(localStorage.getItem('countCreatedTask'))
    } else {
        countCreated = parseInt(localStorage.getItem('countCreatedTask'))
    }
    return countCreated;
}



function createNewTask(buttonEl) {
    var category = document.getElementsByName('task-category')[0];
    var name = document.getElementsByName('task-name')[0];
    var shortName = document.getElementsByName('task-short-name')[0];
    var date = document.getElementsByName('task-date')[0];
    var time = document.getElementsByName('task-time')[0];
    var description = document.getElementsByName('task-description')[0];
    var rang = document.getElementsByName('rang')[0];
    var button = document.getElementsByClassName('create-task');
    var buttonParent = buttonEl.parentElement;
    var contentPopUp = buttonParent.getElementsByClassName('textPopUp')[0];


    // \/ \/ \/ \/ \/ \/Sprawdzanie formularza (Value) \/ \/ \/ \/ \/ \/



    var nameError = "",
        shortNameError = ""

    // name name name name name name name name name name
    if (name.value.length >= 1) {
        name.className = "positive"
        var b = 1;
    } else {
        name.className = "negative";
        nameError = "Twoje zadanie nie zostało utworzone. Wypełnij odpowiednio pola.";
    }

    //shortname shortname shortname shortname shortname shortname
    if (shortName.value.length >= 1) {
        shortName.className = "positive"
        var c = 2;

    } else {
        shortName.className = "negative";
        shortNameError = "Twoje zadanie nie zostało utworzone. Wypełnij odpowiednio pola.";
    }

    // Sprawdzenie pola date 

    var d = new Date(date.value);

    if (!!d.valueOf()) { // Podany czas
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
        hours = time.value.substring(0, 2);

        minutes = time.value.substring(3, 5);
        // Obecny czas
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

        /* sprawdzanie czy podany czas jest większy od obecnego 
            wzór 
            if(wartość >= wartość2){
                if(wartość == wartość2){
                    testy dalej
                }
                else{
                    oki
                }
            }
            else{
                zle
            }
    
            */


        if (year >= yyyy && String(year).length == 4) {

            if (year == yyyy) {
                if (month >= mm) {
                    if (month == mm) {
                        if (day >= dd) {
                            if (day == dd) {
                                if (hours > h) {
                                    date.className = "positive"
                                    time.className = "positive"
                                    var d = 3;
                                } else {
                                    date.className = "negative"
                                    time.className = "negative"
                                    if (nameError == shortNameError) {
                                        shortNameError = ""
                                    }
                                    contentPopUp.innerHTML = " Podana godzina nie może być mniejsza od obecnej. " + nameError + " " + shortNameError
                                }
                            } else {
                                date.className = "positive"
                                time.className = "positive"
                                var d = 3;
                            }
                        } else {
                            date.className = "negative"
                            time.className = "negative"
                            contentPopUp.innerHTML = "Twoje zadanie nie zostało utworzone. Wypełnij odpowiednio pola.";
                        }
                    } else {
                        date.className = "positive"
                        time.className = "positive"
                        var d = 3;
                    }
                } else {
                    date.className = "negative"
                    time.className = "negative"
                    contentPopUp.innerHTML = "Twoje zadanie nie zostało utworzone. Wypełnij odpowiednio pola.";
                }
            } else {
                date.className = "positive"
                time.className = "positive"
                var d = 3;
            }
        } else {
            date.className = "negative"
            time.className = "negative"
            if (String(year).length != 4) {
                contentPopUp.innerHTML = "Twoje zadanie nie zostało utworzone. Maksymalny dopuszczalny rok to 9999.";
            } else {
                contentPopUp.innerHTML = "Twoje zadanie nie zostało utworzone. Wypełnij odpowiednio pola.";
            }

        }
    } else {
        date.className = "negative"
        time.className = "negative"
        contentPopUp.innerHTML = "Twoje zadanie nie zostało utworzone. Wypełnij odpowiednio pola.";
    }

    if (time.value == "") {
        time.className = "negative"
        contentPopUp.innerHTML = "Twoje zadanie nie zostało utworzone. Wypełnij odpowiednio pola.";
        d = 0;
    }

    var testDuplicateDate = date.value.slice(0, 4) + date.value.slice(5, 7) + date.value.slice(8, 10);
    var testDuplicateTime = time.value.slice(0, 2)
        //sprawdza czy w utworzonych zadaniach występują dwa te same zadania
    var checkDuplicate = repeatTask(testDuplicateDate, d, testDuplicateTime)
    checkDuplicate

    // jeżeli występują zwraca 0
    if (checkDuplicate == 0) {
        d = 0;
        var duplicateErrorText = "Twoje zadanie nie zostało utworzone. Posiadasz już 2 takie same zadania, zawierające podaną datę i godzinę."
    }
    var test = b + c + d;

    // funkcja popUp w main.js

    var mainLayout = document.getElementsByClassName('layout')[0];

    if (test == 6) {
        createTask(category, name, shortName, date, description, rang, time)
        achievements()


        if (mainLayout.offsetWidth < 481) {

        } else {
            contentPopUp.innerHTML = "Twoje zadanie zostało utworzone. Znajdziesz je w skecji 'Moje zadania'";

        }
        clear_InputNewTask()
    } else {

        if (checkDuplicate == 0) {
            contentPopUp.innerHTML = duplicateErrorText;
        }
        contentPopUp.innerHTML = "Twoje zadanie nie zostało utworzone. Wypełnij odpowiednio pola.";



    }




}



// Tworzenie zadania
function createTask(category, name, shortName, date, description, rang, time) {
    // zakończenie sekcji nowe zadanie


    var d = new Date(date.value);

    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();
    hours = time.value.substring(0, 2);

    minutes = time.value.substring(3, 5);
    if (day < 10) {
        day = '0' + day
    }

    if (month < 10) {
        month = '0' + month
    }

    var newDate = hours + ":" + minutes + " " + day + "." + month + "." + year;
    // Zmiana wagi zadania z cyfry na cyfry rzymski
    var changeRange = rang.value;
    var newRange, rangClass;
    switch (changeRange) {
        case "1":
            newRange = "I";
            rangClass = "a";

            break;
        case "2":
            newRange = "II";
            rangClass = "b";
            break;
        case "3":
            newRange = "III";
            rangClass = "c";
            break;
        case "4":
            newRange = "IV";
            rangClass = "d";
            break;
        case "5":
            newRange = "V";
            rangClass = "e";
            break;
    }

    var addPlan = document.getElementById('layout-plan');

    var createdTask = document.getElementsByClassName('taskPlan');
    var lastCreatedTask
    for (var i = 0; i < createdTask.length; i++) {
        lastCreatedTask = createdTask[i]
    }
    if (createdTask.length != 0) {
        var numberLastCreatedTask = lastCreatedTask.id.split("mytask").join('');

        var numberCreatedTask = parseInt(numberLastCreatedTask, 10) + 1;
    } else {
        var numberLastCreatedTask = 0;

        var numberCreatedTask = parseInt(numberLastCreatedTask, 10) + 1;
    }


    addPlan.innerHTML += ' <div class="taskPlan ' + rangClass + '" id="mytask' + numberCreatedTask + '"> ' +
        '<div class="task-date">' + newDate + '</div>' +
        '<div class="task-name"><a class="task-name-a">' + name.value + '</a>' +
        ' <a class="task-desc">' + description.value + '</a></div>' +
        '<div class="task-range ' + category.value + 'Tag">' +
        '<div class="task-description" onclick="showDescription(this)">Szczegóły</div>' +
        '<div class="task-range-circle">' + newRange + '</div>' +
        '<div class="task-category">#' + category.value + '</div>' +
        ' </div>' +
        '</div>';

    addTaskToLocalStorage("newTask", "empty")
    var myTaskSection = document.getElementById('myTask')
    openMyTask()
    openWindow(myTaskSection, '1')

    return countCreated += 1;

}

function countCharLength(maxLength, clickedEl) {

    if (clickedEl.value.length == maxLength) {
        clickedEl.style.border = "2px solid #051021";
        console.log('dziala')
    }

}

function countName() {
    document.getElementsByName('task-name')[0].addEventListener("keypress", countStart);
    var clickedKeyTaskName = document.getElementsByName('task-name')[0].addEventListener("click", countName, false);

}

function repeatTask(elTest, d, elTime) {
    var date = document.getElementsByName('task-date')[0];
    var time = document.getElementsByName('task-time')[0];
    var task = document.getElementsByClassName('taskPlan');
    var taskDate;
    var editDateTask = new Array;
    for (var i = 0; i < task.length; i++) {
        taskDate = document.getElementsByClassName('task-date')
        editDateTask.push(parseInt(taskDate[i].innerHTML.slice(12) + taskDate[i].innerHTML.slice(9, 11) + taskDate[i].innerHTML.slice(6, 8) + taskDate[i].innerHTML.slice(0, 2)))

    }
    var sorted_arr = editDateTask.slice().sort();


    var results = [];
    for (var i = 0; i < editDateTask.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    el = elTest + elTime

    for (var i = 0; i < results.length; i++) {
        if (results[i] == el) {

            date.className = "negative"
            time.className = "negative"
            return d = 0;

        }
    }


}

function autoDate() {
    var dateTask = document.getElementById('newDate');
    var timeTask = document.getElementById('newTime');
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
    if (m < 10) {
        m = '0' + m
    }

    var hour = parseInt(h) + 1;
    if (hour == 24) {
        hour = 00;

    }
    if (h < 10) {
        h = '0' + h
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    dateTask.value = yyyy + '-' + mm + '-' + dd;
    timeTask.value = hour + ":" + m;
}