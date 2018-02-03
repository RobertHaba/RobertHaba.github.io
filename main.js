var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var config = {
    apiKey: "AIzaSyCvmhW3-gBnQEDIob4FxLRNyMyJD9iB1ck",
    authDomain: "portfolio-f92f6.firebaseapp.com",
    databaseURL: "https://portfolio-f92f6.firebaseio.com",

};
firebase.initializeApp(config);


var msg = firebase.database().ref(this.email)
new Vue({
    el: "#contact-section",
    data: {
        newUser: {
            email: "",
            title: "",
            message: ""
        }
    },
    firebase: {
        email: msg
    },
    computed: {
        validation: function() {
            console.log(emailRE.test(this.newUser.email))
            return {

                email: emailRE.test(this.newUser.email)

            }
        },
        isValid: function() {
            var validation = this.validation

            return Object.keys(validation).every(function(key) {
                return validation[key]
            })
        }

    },
    methods: {
        getRef: function() {


            if (this.isValid) {
                document.getElementsByClassName('email-input')[0].className = 'email-input';
                if (this.$refs.titleRef.value.length >= 3 && this.$refs.messageRef.value.length >= 3) {

                    document.getElementsByClassName('title-input')[0].className = 'title-input';
                    document.getElementsByTagName('textarea')[0].className = '';

                    var convertEmail = this.newUser.email.split(".");
                    var date = new Date()
                    var currentdate = new Date();
                    var datetime = " | Data " + currentdate.getDate() + "-" +
                        (currentdate.getMonth() + 1) + "-" +
                        currentdate.getFullYear() + " |Godzina " +
                        currentdate.getHours()


                    var newEmail = ""
                    for (a in convertEmail) {
                        newEmail = newEmail + "," + convertEmail[a]
                    }

                    this.newUser.email = this.$refs.emailRef.value
                    this.newUser.title = this.$refs.titleRef.value
                    this.newUser.message = this.$refs.messageRef.value
                    var dataBaseName = firebase.database().ref(newEmail + datetime)
                    dataBaseName.push(this.newUser.title)
                    dataBaseName.push(this.newUser.message)
                    document.getElementById('contact-form').reset()
                    popUp()
                } else {
                    if (this.$refs.titleRef.value.length < 3) {
                        document.getElementsByClassName('title-input')[0].className = 'title-input validation-error';
                    } else {
                        document.getElementsByClassName('title-input')[0].className = 'title-input';
                    }
                    if (this.$refs.messageRef.value.length < 3) {
                        document.getElementsByTagName('textarea')[0].className = 'validation-error';
                    } else {
                        document.getElementsByTagName('textarea')[0].className = '';
                    }
                }
            } else {


                document.getElementsByClassName('email-input')[0].className = 'email-input validation-error';

            }



        }
    }
})


function popUp() {
    document.getElementsByClassName('pop-up')[0].style.display = "block";
    setTimeout(function() {
        document.getElementsByClassName('pop-up')[0].style.display = "none";
    }, 2000)
}