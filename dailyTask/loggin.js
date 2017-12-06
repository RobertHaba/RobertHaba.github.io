if (localStorage.getItem('Login') && localStorage.getItem('Password') && localStorage.getItem('profilType')) {
    registerLayout.style.display = "none";


    document.getElementById('accountPicture').style.backgroundImage = "url('" + localStorage.getItem('profilType') + "')";
    var accountPic = document.getElementById('accountPicture')
    accountPic.title = localStorage.getItem('Login')

} else {
    localStorage.clear()
}

var cloneAll
var sessionTimeAchi = 0;
var filterOpt = document.getElementsByClassName('plan-nav-option')
var cloneFilterArray = new Array
for (var dd = 0; dd < filterOpt.length; dd++) {
    filterOpt[dd].cloneNode(true)
    cloneFilterArray.push(filterOpt[dd])

}

function createAccount() {
    var loginInput = document.getElementById('register-login').value;
    var passInput = document.getElementById('register-pass').value;
    var profilPicture = localStorage.getItem('profilType');
    var imageBox = document.getElementsByClassName('profil-image-pick')
    var registerLayout = document.getElementById('registerLayout')
    console.log()
    if (loginInput.length > 0 && loginInput.length < 14) {
        var loginCheck = true;
        document.getElementById('labelLogin').style.color = "#444";

    } else {

        document.getElementById('labelLogin').style.color = "#9d0019";


    }
    if (passInput.length > 0 && passInput.length < 14) {
        var passCheck = true;
        document.getElementById('labelPass').style.color = "#444";

    } else {

        document.getElementById('labelPass').style.color = "#9d0019";


    }
    if (profilPicture) {
        var profilChceck = true;

        for (var i = 0; imageBox.length > i; i++) {
            imageBox[i].style.border = "none"
        }

    } else {

        for (var i = 0; imageBox.length > i; i++) {

            imageBox[i].style.backgroundColor = '#9d0019';
        }

    }
    var checkAll = loginCheck + passCheck + profilChceck;


    if (checkAll == 3) {
        localStorage.setItem('Login', loginInput)
        localStorage.setItem('Password', passInput)
        registerLayout.style.display = "none";

        document.getElementById('accountPicture').style.backgroundImage = "url('" + localStorage.getItem('profilType') + "')";

    }

}





function profilType(typePerson) {
    var imageBox = document.getElementsByClassName('profil-image-pick')
    for (var i = 0; imageBox.length > i; i++) {
        imageBox[i].style.backgroundColor = '#FFFFFF';
    }
    if (typePerson == "man") {
        var imagePath = "icon/account/admin.svg"
        imageBox[0].style.backgroundColor = '#051021';
    }
    if (typePerson == "woman") {
        var imagePath = "icon/account/woman.svg"
        imageBox[1].style.backgroundColor = '#051021';
    }
    localStorage.setItem("profilType", imagePath)

}

function showAccountOpt() {
    var accountOpt = document.getElementById('account-opt');
    accountOpt.style.display = (accountOpt.style.display == 'flex') ? 'none' : 'flex'

}
var loadingWindow = document.getElementById('loading')
setTimeout(function() {
    logout();
    loadingWindow.style.display = "none"
}, 50)

function logout() {
    var layout = document.getElementById('layout-main');
    var layoutLogin = document.getElementById('layot-loggin');
    var logoLogin = document.getElementById('logoLogin')
    logoLogin.style.display = "flex"
    var shortPassBox = document.getElementById('short-loggin-pass')
    var shortLogginButton = document.getElementById('shortLogginBtn')
    var accountOpt = document.getElementById('account-opt');
    accountOpt.style.display = 'none'

    shortPassBox.style.display = 'none'
    shortLogginButton.style.display = 'none'
    cloneAll = layout.cloneNode(true);
    layout.remove();
    sessionTimeAchi = 0;

    checkAchiTime('break', sessionTimeAchi)




    layoutLogin.style.display = 'grid';

    return cloneAll

}




function loggin() {
    var login = document.getElementById('loggin')
    var pass = document.getElementById('password')
    var layoutLogin = document.getElementById('layot-loggin');
    var body = document.getElementsByTagName('body')[0]


    if (login.value == localStorage.getItem('Login') && pass.value == localStorage.getItem('Password')) {
        // czyszczenie inputów po zalogowaniu
        login.value = ""
        pass.value = ""

        layoutLogin.style.display = "none"


        body.appendChild(cloneAll);

        document.getElementById('myPlanFilter').innerHTML = "" // reset filtrów

        for (var i = 0; i < cloneFilterArray.length; i++) {


            document.getElementById('myPlanFilter').appendChild(cloneFilterArray[i])

        }
        cloneAll = ""

        sessionTimeAchi = 0;
        var picture = localStorage.getItem('profilType')


        var imageProfil = document.getElementById('imageProfil');

        imageProfil.style.backgroundImage = "url(" + picture + ")";
        var profilName = document.getElementById('accountName')
        profilName.innerHTML = localStorage.getItem('Login')
        checkAchiTime('start', sessionTimeAchi)
        taskLength()
        if (localStorage.getItem('countCreatedTask')) {
            achievements()
        }
        return cloneAll = ""
    } else {
        popUpId('popUpLogin', '3500');
    }


}

function rememberLoggin() {
    var shortPassBox = document.getElementById('short-loggin-pass')
    var shortLogginButton = document.getElementById('shortLogginBtn')

    shortPassBox.style.display = (shortPassBox.style.display == 'flex') ? 'none' : 'flex'
    shortLogginButton.style.display = (shortLogginButton.style.display == 'flex') ? 'none' : 'flex'
}

function shortLoggin() {

    var accountPic = document.getElementById('accountPicture')
    var login = accountPic.title // tytuł obrazka profilu jako login
    var pass = document.getElementById('shortPass')
    var layoutLogin = document.getElementById('layot-loggin');
    var body = document.getElementsByTagName('body')[0]
    var accountLogin = accountPic.title


    if (login == accountLogin && pass.value == localStorage.getItem('Password')) {
        pass.value = "";
        layoutLogin.style.display = "none"
        body.appendChild(cloneAll);
        document.getElementById('myPlanFilter').innerHTML = ""

        for (var i = 0; i < cloneFilterArray.length; i++) {


            document.getElementById('myPlanFilter').appendChild(cloneFilterArray[i])

        }
        cloneAll = ""

        sessionTimeAchi = 0;

        checkAchiTime('start', sessionTimeAchi)
        taskLength()
        if (localStorage.getItem('countCreatedTask')) {
            achievements()
        }
        var picture = localStorage.getItem('profilType')


        var imageProfil = document.getElementById('imageProfil');

        imageProfil.style.backgroundImage = "url(" + picture + ")";
        var profilName = document.getElementById('accountName')
        profilName.innerHTML = localStorage.getItem('Login')


        return cloneAll = ""
    } else {

        popUpId('popUpLogin', '3500');
    }
}


function checkAchiTime(breakFun, sessionTimeAchi) {


    if (breakFun == 'start' && !localStorage.getItem('firstMinutesSession')) {
        var countTime = setInterval(countMinutes, 60000)

        countTime

    }

    if (breakFun == 'break') {
        clearInterval(countTime)

    }

    if (cloneAll == "" && localStorage.getItem('firstMinutesSession')) {

        var achiBox = document.getElementById('sesion-time-box')
        var completeAchi = achiBox.getElementsByClassName('achi-small-con')[0]
        completeAchi.innerHTML = ""

        completeAchi.style.backgroundImage = "url('icon/checked.svg')";
        completeAchi.style.backgroundSize = "50px 50px"
        completeAchi.style.backgroundRepeat = 'no-repeat'
        completeAchi.style.backgroundPosition = 'center'
    }



}

function countMinutes() {

    sessionTimeAchi += 1;

    if (cloneAll == "" && !localStorage.getItem('firstMinutesSession')) {
        var achiBox = document.getElementById('sesion-time-box')
        var completeAchi = achiBox.getElementsByClassName('achi-small-con')[0]



        if (sessionTimeAchi >= 5) {

            if (completeAchi.innerHTML != '') {
                achiPop('sesion-time-box')
                localStorage.setItem('firstMinutesSession', "5")

            }
            completeAchi.innerHTML = ""

            completeAchi.style.backgroundImage = "url('icon/checked.svg')";
            completeAchi.style.backgroundSize = "50px 50px"
            completeAchi.style.backgroundRepeat = 'no-repeat'
            completeAchi.style.backgroundPosition = 'center'





        }
        if (completeAchi.innerHTML != '' && !localStorage.getItem('firstMinutesSession')) {
            var timeHunter = document.getElementById('timeHunter')
            var parentTimeHunter = timeHunter.parentElement
            var infoTimeHunter = parentTimeHunter.getElementsByClassName('countAchi')[0]
            countMinutes = parseInt(sessionTimeAchi) * 20
            var help = 100 - countMinutes
            timeHunter.style.width = "calc(100% - " + help + "%)"
            infoTimeHunter.innerHTML = sessionTimeAchi
        }

    }






}

function forgetPass() {
    var forgetBox = document.getElementById('forget-pass');

    if (localStorage.getItem('Password')) {
        forgetBox.innerHTML = "Twoje hasło to: " + String(localStorage.getItem('Password'));
    } else {
        forgetBox.innerHTML = "Twoje hasło to: Admin";
    }
    setTimeout(function() {
        forgetBox.innerHTML = "Przypomnij hasło."
    }, 4000)
}