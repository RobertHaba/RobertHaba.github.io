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
        el: '#services',
        data: {
            showWindow: false,
            content: {
                header: 'Usługi dotyczące laptopów',
                imgSrc: './img/picture/laptop-dell.jpg',
                services: [

                ]
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