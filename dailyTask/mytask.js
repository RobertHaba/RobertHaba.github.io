function loadFilterBar(displayProperty) {
    var filterBar = document.getElementById("myPlanFilter");
    var mainLayout = document.getElementsByClassName('layout')[0];
    var filterBarChildren = filterBar.children
    for (var i = 9; i < 16; i++) {
        filterBarChildren[i].style.display = "none";
    }
    for (var i = 0; i <= 8; i++) {
        console.log("dziaaala?")
        filterBarChildren[i].style.display = "flex";
        if (mainLayout.offsetWidth < 481) {
            filterBar.style.gridTemplateColumns = "100%";

        } else {
            filterBar.style.gridTemplateColumns = "repeat(9,1fr)";
        }

    }
    console.log("dziala?")
}

function openMyTask() {

    var layout = document.getElementById("layout-plan")
    var layoutScroll = document.getElementsByClassName("layout-plan-scroll")[0]
    var task = layout.getElementsByClassName('taskPlan');
    var noTasks = document.getElementsByClassName('noTasksCon')[0];
    var filterBar = document.getElementById('myPlanFilter');
    var filterBarMobile = document.getElementsByClassName('mobile-filter-nav')[0];
    var mainLayout = document.getElementsByClassName('layout')[0];

    filterBar.style.display = "grid"
    if (mainLayout.offsetWidth < 481) {
        filterBarMobile.style.display = "flex"
        defaultOffFilter()
    }
    if (task.length == 0) {
        layoutScroll.style.backgroundImage = "url('icon/mytask/unhappy.svg')"
        layout.style.display = "none";
        noTasks.style.display = "flex";
    }
    if (task.length > 0) {
        layout.style.display = "grid";
        noTasks.style.display = "none";
        layoutScroll.style.backgroundImage = "none"

    }

    popUpId('popUpInteraction', 3000)

}

function showFilters() {
    var filterBar = document.getElementById("myPlanFilter");
    var filterBarChildren = filterBar.children
    var mainLayout = document.getElementsByClassName('layout')[0];
    if (mainLayout.offsetWidth < 481) {
        filterBar.style.gridTemplateColumns = "100%";
    } else {
        filterBar.style.gridTemplateColumns = "repeat(7,1fr)";

    }


    for (var i = 0; i <= 8; i++) {
        filterBarChildren[i].style.display = "none ";

    }

    for (var i = 9; i < filterBarChildren.length; i++) {
        filterBarChildren[i].style.display = "grid";

    }

    document.getElementById('closeFiltr').addEventListener("click", function() {
        closeFiltr()

    });

    document.getElementById('lowerRang').addEventListener("click", function() {
        filtr('lowerRang', this);
    });

    document.getElementById('higherRang').addEventListener("click", function() {
        filtr('higherRang', this);
    });

    document.getElementById('higherDate').addEventListener("click", function() {
        filtr('higherDate', this);
    });

    document.getElementById('lowerDate').addEventListener("click", function() {
        filtr('lowerDate', this);
    });
    document.getElementById('lowerDateCreated').addEventListener("click", function() {
        filtr('lowerDateCreated', this);
    });
    document.getElementById('higherDateCreated').addEventListener("click", function() {
        filtr('higherDateCreated', this);
    });

}

function closeFiltr() {
    var mainLayout = document.getElementsByClassName('layout')[0];
    var filterBar = document.getElementById("myPlanFilter");
    var filterBarChildren = filterBar.children
    if (mainLayout.offsetWidth < 481) {
        filterBar.style.gridTemplateColumns = "100%";
    } else {
        filterBar.style.gridTemplateColumns = "repeat(9,1fr)";
    }


    for (var i = 0; i <= 9; i++) {
        filterBarChildren[i].style.display = "grid";
    }
    for (var i = 9; i < filterBarChildren.length; i++) {
        filterBarChildren[i].style.display = "none";
    }

}
var layoutPlan = document.getElementById('layout-plan');


function filtr(select, el) {
    var selectedFilter = document.getElementsByClassName('plan-nav-option')
        // czyści efekt po klikniętym filtrze
    if (selectedFilter)
        for (var i = 0; i < selectedFilter.length; i++) {

            selectedFilter[i].className = "plan-nav-option";
        }
        // dodaje efekt przy wybranym filtrze
    el.className = "plan-nav-option clickFilter"


    var footerTaskChildren = document.getElementsByClassName("footer-options");

    var taskPlan = document.getElementsByClassName("taskPlan");
    var layout = document.getElementById('layout-plan');


    function sortNumber(a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    // sorotwanie liczb malejąco
    function resortNumber(a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? 1 : -1;
        }
    }
    /* 


    Sortowanie rangi


    */

    if (taskPlan.length > 0) {


        if (select == "higherRang" || select == "lowerRang") {
            footerTaskChildren[0].style.display = "block"
            document.getElementById("footerFiltr").style.display = "flex";

            // Tworzenie tablicy dwuwymiarowej
            var sortTask = [
                [taskPlan[0].className + " " + 0, taskPlan[0]]
            ];


            for (var b = 1; b < (taskPlan.length); b++) {
                // sortowanie za pomocą klasy + przypisanie sortowanego elementu
                sortTask.push([taskPlan[b].className + " " + b, taskPlan[b]]);
            }
            // sorotwanie wg pobranego parametru select
            if (select == "higherRang") {
                sortTask.sort();
                footerTaskChildren[0].innerHTML = "Rosnąco(Ranga)"

            }
            if (select == "lowerRang") {
                footerTaskChildren[0].innerHTML = "Malejąco(Ranga)"
                sortTask.sort(); //konieczne do działania
                sortTask.reverse(); //z do a

            }
            // wyświetlenie posorotwanych elementów
            for (var b = 0; b < (taskPlan.length); b++) {

                layout.appendChild(sortTask[b][1]);

            }
        }
        /* 


        Sortowanie daty 


        */
        else if (select == "higherDate" || select == "lowerDate") {
            footerTaskChildren[0].style.display = "block"
            document.getElementById("footerFiltr").style.display = "flex";
            var taskDate = document.getElementsByClassName('task-date');
            var taskArray = new Array;
            // Działanie tablicy taskArray (rok + Miesiac + Dzien + Godzina + Minuta)

            taskArray.push([taskDate[0].innerHTML.slice(12) + taskDate[0].innerHTML.slice(9, 11) + taskDate[0].innerHTML.slice(6, 8) + taskDate[0].innerHTML.slice(0, 2) + taskDate[0].innerHTML.slice(3, 5), taskPlan[0]]);
            // sortowanie liczb rosnąco




            // Działanie tablicy taskArray (rok + Miesiac + Dzien + Godzina + Minuta) pętla
            for (var i = 1; i < taskPlan.length; i++) {
                taskArray.push([taskDate[i].innerHTML.slice(12) + taskDate[i].innerHTML.slice(9, 11) + taskDate[i].innerHTML.slice(6, 8) + taskDate[i].innerHTML.slice(0, 2) + taskDate[i].innerHTML.slice(3, 5), taskPlan[i]])
            }
            // wywołanie funkcji sortowania rosnąco
            if (select == "higherDate") {
                footerTaskChildren[0].innerHTML = "Rosnąco(Data zakończenia)"
                taskArray.sort(sortNumber)
            }
            // wywołanie funkcji sortowania malejąco
            if (select == "lowerDate") {
                footerTaskChildren[0].innerHTML = "Malejąco(Data zakończenia)"
                taskArray.sort(resortNumber)
            }

            // wyświetlenie wyników sortowania
            for (var b = 0; b < (taskPlan.length); b++) {
                layout.appendChild(taskArray[b][1]);

            }

        } else if (select == "higherDateCreated" || select == "lowerDateCreated") {
            footerTaskChildren[0].style.display = "block"
            document.getElementById("footerFiltr").style.display = "flex";

            var getNameIdTask = new Array;
            var addIdTask = new Array;
            for (var i = 0; i < taskPlan.length; i++) {
                getNameIdTask.push(taskPlan[i].id);
            }
            if (select == "higherDateCreated") {
                footerTaskChildren[0].innerHTML = "Rosnąco(Data utworzenia)"
                getNameIdTask.sort();
                for (var i = 0; i < taskPlan.length; i++) {
                    addIdTask.push(document.getElementById(getNameIdTask[i]));
                    layout.appendChild(addIdTask[i]);
                }

            }
            if (select == "lowerDateCreated") {
                var arrayLower = new Array

                footerTaskChildren[0].innerHTML = "Malejąco(Data utworzenia)"
                for (var i = 0; i < taskPlan.length; i++) {
                    arrayLower.push(getNameIdTask[i].slice(6));

                }
                arrayLower.sort(resortNumber)

                for (var i = 0; i < taskPlan.length; i++) {
                    addIdTask.push(document.getElementById("mytask" + arrayLower[i]));

                    layout.appendChild(addIdTask[i]);
                }
            }





        } // Sortowanie po kategoriach 
        else {
            document.getElementById("footerCategory").style.display = "flex";
            footerTaskChildren[1].style.display = "block"
            if (select == "hobby") {
                var hobby = document.getElementsByClassName("hobbyTag");
                footerTaskChildren[1].innerHTML = "Hobby"

                for (var i = 0; i < taskPlan.length; i++) {
                    taskPlan[i].style.display = "none";

                }
                for (var i = 0; i < hobby.length; i++) {
                    hobby[i].parentElement.style.display = "grid";
                }

            }
            if (select == "sport") {
                var sport = document.getElementsByClassName("sportTag");
                footerTaskChildren[1].innerHTML = "Sport"
                for (var i = 0; i < taskPlan.length; i++) {
                    taskPlan[i].style.display = "none";

                }
                for (var i = 0; i < sport.length; i++) {
                    sport[i].parentElement.style.display = "grid";
                }
            }
            if (select == "nauka") {
                var nauka = document.getElementsByClassName("naukaTag");
                footerTaskChildren[1].innerHTML = "Nauka"
                for (var i = 0; i < taskPlan.length; i++) {
                    taskPlan[i].style.display = "none";

                }
                for (var i = 0; i < nauka.length; i++) {
                    nauka[i].parentElement.style.display = "grid";
                }
            }
            if (select == "biznes") {
                var biznes = document.getElementsByClassName("biznesTag");
                footerTaskChildren[1].innerHTML = "Biznes"
                for (var i = 0; i < taskPlan.length; i++) {
                    taskPlan[i].style.display = "none";

                }
                for (var i = 0; i < biznes.length; i++) {
                    biznes[i].parentElement.style.display = "grid";
                }
            }
            if (select == "praca") {
                var praca = document.getElementsByClassName("pracaTag");
                footerTaskChildren[1].innerHTML = "Praca"
                for (var i = 0; i < taskPlan.length; i++) {
                    taskPlan[i].style.display = "none";

                }
                for (var i = 0; i < praca.length; i++) {
                    praca[i].parentElement.style.display = "grid";
                }
            }
            if (select == "rodzina") {

                var rodzina = document.getElementsByClassName("rodzinaTag");
                footerTaskChildren[1].innerHTML = "Rodzina"
                for (var i = 0; i < taskPlan.length; i++) {
                    taskPlan[i].style.display = "none";

                }
                for (var i = 0; i < rodzina.length; i++) {
                    rodzina[i].parentElement.style.display = "grid";
                }
            }
            if (select == "inne") {
                var inne = document.getElementsByClassName("inneTag");
                footerTaskChildren[1].innerHTML = "Inne"
                for (var i = 0; i < taskPlan.length; i++) {
                    taskPlan[i].style.display = "none";

                }
                for (var i = 0; i < inne.length; i++) {
                    inne[i].parentElement.style.display = "grid";
                }
            }
            if (select == "wszystkie") {
                footerTaskChildren[1].innerHTML = "Wszystkie"
                for (var i = 0; i < taskPlan.length; i++) {
                    taskPlan[i].style.display = "grid";


                }
            }

        }
    }




}


function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);

}

function allowDrop(ev) {
    ev.preventDefault();


}
passwordSettings = "1"

function dropRemove(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/plain");
    var protect = prompt("Aby usunąć wpisz 1", "");
    var task = document.getElementsByClassName('taskPlan')
    var navOptionsMyTask = document.getElementsByClassName('nav-opt')[2]

    var footerTaskChildren = document.getElementsByClassName("footer-options");
    var footerTaskFiltr = document.getElementsByClassName("footer-filter");
    if (protect == passwordSettings) {
        document.getElementById(data).remove()
    }
    if (task.length == 0) {
        var taskLength = 0;
        addTaskToLocalStorage('deleted', taskLength)
        openWindow(myTask, navOptionsMyTask), openMyTask();
        footerTaskChildren[0].style.display = 'none'
        footerTaskChildren[1].style.display = 'none'
        footerTaskFiltr[0].style.display = 'none'
        footerTaskFiltr[1].style.display = 'none'

    }

    addTaskToLocalStorage('deleted', taskLength)
}



function interaction() {
    var task = document.getElementsByClassName("taskPlan");

    // Przenoszenie elementów
    for (var i = 0; i < task.length; i++) {
        task[i].classList.add("taskPlanMove");
        task[i].setAttribute('draggable', true);
        task[i].style.cursor = "pointer";
        task[i].setAttribute('ondragstart', 'drag(event)')
    }
}


function interactionOff() {
    var task = document.getElementsByClassName("taskPlan");
    var interaction = document.getElementById('checkInteraction').checked = false;
    for (var i = 0; i < task.length; i++) {
        task[i].classList.remove("taskPlanMove");
        task[i].setAttribute('draggable', false);
        task[i].style.cursor = "default";
        task[i].setAttribute('ondragstart', false)
    }
}

function showDescription(el) {
    // wyświetlanie opisu
    var parent = el.parentElement.parentElement;
    var description = parent.getElementsByClassName("task-desc")[0];
    var name = parent.getElementsByClassName('task-name-a')[0];

    if (el.innerHTML == "Szczegóły") {
        description.style.display = "block";
        name.style.display = "none";
        el.innerHTML = "Nazwa";

    } else if (el.innerHTML == "Nazwa") {
        description.style.display = "none";
        name.style.display = "block";
        el.innerHTML = "Szczegóły";

    }


}