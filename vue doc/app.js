Vue.component("greeting", {
    template: "<p>Siemka {{name}} <button v-on:click='changeName()'>Change Name</button></p>",
    data: function() {

        return {
            name: "Robert"
        }
    },
    methods: {
        changeName: function() {
            this.name = "Haba"
        }
    }

});


new Vue({
    el: '#vue-app',
    data: {
        name: 'Robert',
        job: 'Kierowca',
        website: 'https://roberthaba.github.io',
        websiteTag: '<a href="https://roberthaba.github.io">Haba Site sceond link</a>',
        age: 19,
        age2: 19,
        age3: 19,
        x: 0,
        y: 0,
        a: 0,
        b: 0,
        a1: 0,
        b1: 0,
        available: false,
        nearby: false,
        error: false,
        success: false,
        nameArray: ['Radek', 'Yoshi', 'Marek', 'Robert'],
        haba: [
            { name: 'Wiktor', age: '10' },
            { name: 'Radek', age: '30' },
            { name: 'Mietek', age: '25' }
        ],
        health: 100,
        ended: false
    },
    methods: {
        greet: function(time) {
            return time + this.name
        },
        addAge: function(inc) {
            return this.age2 += inc
        },
        subtractAge: function(dec) {
            return this.age2 -= dec
        },
        getCordinateXY: function(events) {

            this.x = event.offsetX;
            this.y = event.offsetY;
        },
        clickAlert: function() {
            alert('Go to Haba Site')
        },
        keyboardEvLogName: function() {
            console.log("You succesful add Name")
        },
        keyboardEvLogAge: function() {
            console.log("You succesful add Age")
        },
        addToA: function() {
            console.log("You succesful add Age + A / This work with B")
            return this.a + this.age3
        },
        addToB: function() {
            console.log("You succesful add Age + B / This work with A")
            return this.b + this.age3
        },
        punch: function() {
            this.health -= 10;
            if (this.health <= 0) {
                this.ended = true
            }
        },
        restartPunchGame: function() {
            this.health = 100;
            this.ended = false

        }
    },
    computed: {
        addToA1: function() {
            console.log("You succesful add Age + A1 / This work solo")
            return this.a1 + this.age3
        },
        addToB1: function() {
            console.log("You succesful add Age + B1 / This work solo")
            return this.b1 + this.age3
        },
        compClass: function() {
            return {
                available: this.available,
                nearby: this.nearby,
            }
        }
    }
})

var one = new Vue({
    el: '#vue-app-one',
    data: {
        title: "This is a 'vue-app-one'"
    },
    methods: {
        changeTitle: function() {
            two.title = "Successful change the title"
        }
    },
    computed: {
        greet: function() {
            return "Welcome"
        }
    }
})

var two = new Vue({
    el: '#vue-app-two',
    data: {
        title: "This is a 'vue-app-two'"
    },
    methods: {

    },
    computed: {
        greet: function() {
            return "Yooo"
        }
    }
})
var three = new Vue({
    el: '#vue-app-three',
    data: {
        title: "This is a 'vue-app-two'",
        refInput: "Siemka "
    },
    methods: {
        getRef: function() {

            this.refInput = this.$refs.inputRef.value
        }
    },
    computed: {
        greet: function() {
            return "Yooo"
        }
    }
})










function getCode() {

    var copyTextarea = document.querySelector('.copyArea');
    copyTextarea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
}