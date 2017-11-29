function layoutSetColor() {
    if (localStorage.getItem('layoutNormalColor')) {
        var normal = localStorage.getItem('layoutNormalColor')
        var light = localStorage.getItem('layoutLightColor')
        var dark = localStorage.getItem('layoutDarkColor')
        var grandient = localStorage.getItem('layoutGrandientColor')
        var image = localStorage.getItem('layoutImageColor')
        changeColor(normal, light, dark, grandient, image)
    }
}

function changeColor(normalColor, lightColor, darkColor, grandient, image) {

    localStorage.setItem('layoutNormalColor', normalColor)
    localStorage.setItem('layoutLightColor', lightColor)
    localStorage.setItem('layoutDarkColor', darkColor)
    localStorage.setItem('layoutGrandientColor', grandient)
    localStorage.setItem('layoutImageColor', image)

    //duże elementy
    var header = document.getElementById('layout-header');
    var nav = document.getElementById('nav');
    var popUpTaskTodayTask = document.getElementById('popUpDailyTask')
    var layoutLoggin = document.getElementById('layot-loggin'); // edycja grandient

    header.style.backgroundColor = normalColor;
    nav.style.backgroundColor = normalColor;
    popUpTaskTodayTask.style.backgroundColor = normalColor
    layoutLoggin.style.background = grandient
        // opcje logowania
    var accountCon = document.getElementsByClassName('account-con')[0];

    var logoutOpt = document.getElementsByClassName('logout-opt')[0];
    accountCon.style.backgroundColor = darkColor;

    logoutOpt.style.backgroundColor = darkColor

    //mobile

    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", darkColor)

    // edycja background-image

    var popUp = document.getElementsByClassName('pop-up-settings');
    for (var i = 0; i < popUp.length; i++) {
        popUp[i].style.backgroundImage = image;
    }


    //Potrzebna pętla
    var footerSection = document.getElementsByClassName('footer-mytask');
    var footerMobile = document.getElementsByClassName('mobile-btn-create')[0];

    var planNavOption = document.getElementsByClassName('plan-nav-option');
    var filterOptionInFooter = document.getElementsByClassName('footer-filter')
    for (var i = 0; i < footerSection.length; i++) {
        footerSection[i].style.backgroundColor = normalColor;
    }
    for (var i = 0; i < planNavOption.length; i++) {
        planNavOption[i].style.backgroundColor = lightColor;
    }
    for (var i = 0; i < filterOptionInFooter.length; i++) {
        filterOptionInFooter[i].style.backgroundColor = lightColor;
    }
    footerMobile.style.backgroundColor = normalColor;

}



function changeProfilPassword() {
    var oldPass = document.getElementById('oldPass').value;
    var newPass = document.getElementById('newPass').value;
    var popUpContent = document.getElementById('popUpSettingsChangePass')

    if (oldPass == accountPassword && newPass.length <= 14) {
        localStorage.setItem("Password", newPass)
        accountPassword = localStorage.getItem('Password')
        popUpContent.innerHTML = "Twoje hasło zostało zmienione."
    } else {
        popUpContent.innerHTML = "Twoje hasło nie zostało zmienione."
    }
    popUpId('popUpSettingsChangePass', "4000")
    return accountPassword;
}