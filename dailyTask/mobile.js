function showMenu(menuId, menuButton) {
    console.log('dziala?')
    var menu = document.getElementById('nav');
    menu.style.display = (menu.style.display == 'grid') ? 'none' : 'grid'



}

function closeMobileMenu() {
    var menu = document.getElementById('nav');
    menu.style.display = 'none';

}

function showFilterOptions() {
    var menu = document.getElementById('myPlanFilter');
    menu.style.display = (menu.style.display == 'grid') ? 'none' : 'grid'

}
var mainLayoutReset = document.getElementsByClassName('layout')[0];
window.onresize = function(event) {

    if (document.clientWidth > 481) {
        var menuFiltr = document.getElementById('myPlanFilter');
        menuFiltr.style.display = "grid"
        var menuNav = document.getElementById('nav');
        menuNav.style.display = "grid"

    }
    var mainLayout = document.getElementById('layout')


};

function fullPageSize() {


}

function defaultOffFilter() {
    var filter = document.getElementById('myPlanFilter');
    filter.style.display = 'none'
}