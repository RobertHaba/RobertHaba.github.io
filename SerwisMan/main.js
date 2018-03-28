Vue.component('modal', {
    template: '#modal-template'
})

// start app
new Vue({
    el: '#price',
    data: {
        showPopup: false,
        scroll: 'hidden'

    },
    methods: {
        stopScroll: function() {
            console.log(this.scroll)
            document.getElementsByTagName('body')[0].style.overflow = this.scroll;

        }

    }

})
Vue.component('services', {
    template: '#modal-services'
})
var vueServices = new Vue({
        el: '#services2',
        data: {
            showWindow: false,
            content: {
                header: 'Usługi dotyczące laptopów',
                imgSrc: './img/picture/laptop-dell.jpg',
                services: [

                ],

            }
        },
        methods: {
            pushLaptop: function() {



                var arr = new Array
                arr.push({ text: "wymiana napędów optycznych" }, { text: "wymiana zasilacza" }, { text: "świetlówki do matryc" }, { text: "odwirsuowywanie" }, { text: "odzyskiwanie danych" }, { text: "archiwizacja danych" }, { text: "odzyskiwanie utraconych haseł" }, { text: "reinstalacja systemu operacyjnego / format" }, { text: "partycjonowanie dysków" }, { text: "dołożenie pamięci" }, { text: "wymiana klawiatury" }, { text: "aktualizacja oprogramowania" }, { text: "instalacja oprogramowania do ochrony dzieci w internecie" }, { text: "projektowanie i realizacja sieci komputerowych" }, { text: "wymiana złącza zasilania" }, )

                this.$set(this.content, 'services', arr)

            },
            pushTv: function() {



                var arr = new Array
                arr.push({ text: "wymiana nTVh" }, { text: "wymiana zasilacza" }, { text: "świetlówki do matryc" }, { text: "odwirsuowywanie" }, { text: "odzyskiwanie danych" }, { text: "archiwizacja danych" }, { text: "odzyskiwanie utraconych haseł" }, { text: "reinstalacja systemu operacyjnego / format" }, { text: "partycjonowanie dysków" }, { text: "dołożenie pamięci" }, { text: "wymiana klawiatury" }, { text: "aktualizacja oprogramowania" }, { text: "instalacja oprogramowania do ochrony dzieci w internecie" }, { text: "projektowanie i realizacja sieci komputerowych" }, { text: "wymiana złącza zasilania" }, )

                this.$set(this.content, 'services', arr)

            },
            pushPhone: function() {



                var arr = new Array
                arr.push({ text: "wymiana PHONE" }, { text: "wymiana zasilacza" }, { text: "świetlówki do matryc" }, { text: "odwirsuowywanie" }, { text: "odzyskiwanie danych" }, { text: "archiwizacja danych" }, { text: "odzyskiwanie utraconych haseł" }, { text: "reinstalacja systemu operacyjnego / format" }, { text: "partycjonowanie dysków" }, { text: "dołożenie pamięci" }, { text: "wymiana klawiatury" }, { text: "aktualizacja oprogramowania" }, { text: "instalacja oprogramowania do ochrony dzieci w internecie" }, { text: "projektowanie i realizacja sieci komputerowych" }, { text: "wymiana złącza zasilania" }, )

                this.$set(this.content, 'services', arr)

            },
            pushSystem: function() {



                var arr = new Array
                arr.push({ text: "wymiana system" }, { text: "wymiana zasilacza" }, { text: "świetlówki do matryc" }, { text: "odwirsuowywanie" }, { text: "odzyskiwanie danych" }, { text: "archiwizacja danych" }, { text: "odzyskiwanie utraconych haseł" }, { text: "reinstalacja systemu operacyjnego / format" }, { text: "partycjonowanie dysków" }, { text: "dołożenie pamięci" }, { text: "wymiana klawiatury" }, { text: "aktualizacja oprogramowania" }, { text: "instalacja oprogramowania do ochrony dzieci w internecie" }, { text: "projektowanie i realizacja sieci komputerowych" }, { text: "wymiana złącza zasilania" }, )

                this.$set(this.content, 'services', arr)

            },
            pushComputer: function() {



                var arr = new Array
                arr.push({ text: "wymiana PC" }, { text: "wymiana zasilacza" }, { text: "świetlówki do matryc" }, { text: "odwirsuowywanie" }, { text: "odzyskiwanie danych" }, { text: "archiwizacja danych" }, { text: "odzyskiwanie utraconych haseł" }, { text: "reinstalacja systemu operacyjnego / format" }, { text: "partycjonowanie dysków" }, { text: "dołożenie pamięci" }, { text: "wymiana klawiatury" }, { text: "aktualizacja oprogramowania" }, { text: "instalacja oprogramowania do ochrony dzieci w internecie" }, { text: "projektowanie i realizacja sieci komputerowych" }, { text: "wymiana złącza zasilania" }, )

                this.$set(this.content, 'services', arr)

            },
            pushOthers: function() {



                var arr = new Array
                arr.push({ text: "wymiana Other" }, { text: "wymiana zasilacza" }, { text: "świetlówki do matryc" }, { text: "odwirsuowywanie" }, { text: "odzyskiwanie danych" }, { text: "archiwizacja danych" }, { text: "odzyskiwanie utraconych haseł" }, { text: "reinstalacja systemu operacyjnego / format" }, { text: "partycjonowanie dysków" }, { text: "dołożenie pamięci" }, { text: "wymiana klawiatury" }, { text: "aktualizacja oprogramowania" }, { text: "instalacja oprogramowania do ochrony dzieci w internecie" }, { text: "projektowanie i realizacja sieci komputerowych" }, { text: "wymiana złącza zasilania" }, )

                this.$set(this.content, 'services', arr)

            },
            clickModalMenu: function(el) {

                var modalItems = document.getElementsByClassName('modal-menu-item')
                console.log(modalItems)
                for (let i = 0; i < modalItems.length; i++) {
                    console.log(modalItems[i])
                    modalItems[i].classList = "bg-c-white modal-menu-item flex-center"
                }
                console.log(el)
                modalItems[el].classList = "bg-c-orange modal-menu-item flex-center"
            }
        }
    })
    // RUN DEFAULT SERVICES
vueServices.pushLaptop()

function showScroll() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
}
window.onresize = function() {
    console.log(this.innerWidth)
    if (this.innerWidth > 625) {
        document.getElementById('mainNav').style.display = 'flex'
    }
}

function menu() {
    console.log('dasda')
    var menuEl = document.getElementById('mainNav');
    menuEl.style.display = (menuEl.style.display == 'flex') ? 'none' : 'flex';
}

function shadowAnim() {
    var section = document.getElementById('services2');
    var boxs = section.getElementsByClassName('tile-con')
    console.log(boxs)
    for (let i = 0; i < boxs.length; i++) {
        (function(index) {
                setTimeout(function() {
                    boxs[i].className += ' shadowAnim';

                }, i * 500)
            }

        )(i)
    }
}
window.onload = scrollFunction();

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function scrollFunction() {
    var topSecAbout = document.getElementById('services').offsetTop
    var topSecAllegro = document.getElementsByClassName('allegro-sec')[0].offsetTop
    window.addEventListener("scroll", function showEl() {
        let scrollPosition = window.scrollY
        if (scrollPosition >= topSecAbout) {
            shadowAnim()
            topSecAbout = getDocHeight()
        }
        if (scrollPosition >= (topSecAllegro - 100)) {
            countAnim()
            topSecAllegro = getDocHeight()
        }
    })
}
console.log(getDocHeight())

function countAnim() {
    var boxNumber1 = document.getElementsByClassName('count')[0];
    const number1 = 400
    let zero = 0
    var boxNumber2 = document.getElementsByClassName('count')[1];
    const number2 = 75

    var time1 = 2000 / number1;
    var time2 = 2000 / number2;
    const allegroSec = document.getElementById('countAction')
    var icons = allegroSec.getElementsByClassName('i-big');
    var helpWidth1 = 0;
    var countInterval = setInterval(function() {
        helpWidth1 += 70 / number1;
        icons[0].style.width = helpWidth1 + 'px';
        zero++;
        if (zero == number1) {
            clearInterval(countInterval);
        }
        boxNumber1.innerHTML = zero
    }, time1)
    var helpWidth2 = 0;
    let zero2 = 0;
    var countInterval2 = setInterval(function() {
        helpWidth2 += 70 / number2;
        icons[1].style.width = helpWidth2 + 'px';
        zero2++;
        if (zero2 == number2) {
            clearInterval(countInterval2);
        }
        boxNumber2.innerHTML = zero2
    }, time2)
    countAnimFun = undefined;
}


smoothScroll = (element) => {
    let scrollTo = document.getElementById(element)
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: scrollTo.offsetTop - 100
    });
    console.log('asd')
    console.log(scrollTo.offsetTop)
}