(function sliderHome(sliderTime) {
    const sliderBox = document.getElementById("slider")
    const pictures = sliderBox.querySelectorAll("img")
    const sliderSwitchBox = document.querySelector('#sliderSwitch')
    const switchEl = sliderSwitchBox.querySelectorAll("div")
    var a = -1
    var convertToSeconds = sliderTime / 1000 + "s"
    setInterval(function() {

        a += 1;


        for (let i = 0; i < pictures.length; i++) {
            pictures[i].className = "sliderNone"
            switchEl[i].className = 'i-dot-circle'
        }
        switchEl[a].className = 'i-circle';

        pictures[a].style.animationDuration = convertToSeconds
        pictures[a].className = "sliderAnim"

        if (a == 2) {
            a = -1;
        }
    }, sliderTime)
})(5000);
window.onload = scrollFunction();

function scrollFunction() {
    const saleSection = document.getElementById('sale')
    let saleSectionPosition = saleSection.offsetTop / 2
    let saleSlide = document.querySelectorAll(".sale-slide")
    let saleBox = document.querySelectorAll('.sale-box')

    const lastestSection = document.getElementById('lastest')
    let lastestSectionPosition = lastestSection.offsetTop - 600
    let tileBox = document.querySelectorAll('.tile-small')
    window.addEventListener("scroll", function showEl() {

        let scrollStart = window.scrollY

        if (scrollStart >= saleSectionPosition) {


            for (let i = 0; i < saleBox.length; i++) {
                setTimeout(function() {
                    saleBox[i].classList = "sale-box flex-column flex-center sale-slide anim-saleSlide"
                }, 1000)
            }

        }
        if (scrollStart >= lastestSectionPosition) {
            console.log(scrollStart)
            console.log(lastestSectionPosition)

            for (let i = 1; i < tileBox.length; i++) {
                tileBox[i].className = 'tile-small anim-square flex-column flex-center'
            }
            document.getElementById('lastestTileBig').className = 'tile-big flex-center flex-column anim-square'

        }
    })
}

function mobileMenu() {
    var buttonMobileMenu = document.querySelectorAll('.m-nav')[0];
    buttonMobileMenu.style.display = (buttonMobileMenu.style.display == 'flex') ? "none" : "flex"
}