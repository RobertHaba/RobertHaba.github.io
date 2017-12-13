 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyB8qn4HXU_au6UmhLDabubdvj2B05t7Sg0",
     authDomain: "chatvue-47c11.firebaseapp.com",
     databaseURL: "https://chatvue-47c11.firebaseio.com",
     projectId: "chatvue-47c11",
     storageBucket: "chatvue-47c11.appspot.com",
     messagingSenderId: "494119206157"
 };
 firebase.initializeApp(config)
 var usersRef = firebase.database().ref('users')

 var msg = new Vue({
     el: '#msg-app',
     data: {
         newMsg: {

             msg: ''
         }
     },
     firebase: {
         users: usersRef

     },
     methods: {
         addMsg: function() {
             usersRef.push(this.newMsg)
             this.newMsg.msg = ''
         }
     }
 })
 console.log(msg.users)