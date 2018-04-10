 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyCc5adTK-FUS2ef398_K3GTe6pCRWXRG2k",
     authDomain: "reflex-game-389ae.firebaseapp.com",
     databaseURL: "https://reflex-game-389ae.firebaseio.com",
     projectId: "reflex-game-389ae",
     storageBucket: "reflex-game-389ae.appspot.com",
     messagingSenderId: "576992994056"
 };
 firebase.initializeApp(config);
 Vue.use(VueFire)
 var db = firebase.database()
 var usersRef = db.ref('name')

 var app = new Vue({
     el: '#ranking',
     data: {

         name: '',
         score: 0,
         best: 0,
         average: 0,
         usersArr: []
     },
     firebase: {
         users: usersRef

     },

     methods: {
         start() {
             usersRef.push({ name: this.name, score: this.score, best: this.best, average: this.average })

         },
         test() {
             var scoreEl = document.querySelectorAll('.score');
             var scoreArr = []
             for (var [index, el] of scoreEl.entries()) {
                 scoreArr.push(parseFloat(scoreEl[index].innerHTML))

             }

             scoreArr.sort((a, b) => a > b)
             console.log()
             console.log(sessionReactionTime[0].score)
             console.log(usersRef)
             if (sessionReactionTime[0].score < scoreArr[0]) {
                 console.log('asdas')
                 var refBase = db.ref('name')
                 refBase.set(['0'])

                 db.ref('name/0').set([{
                         ['average']: sessionReactionTime[0].average,
                     },
                     {
                         ['best']: sessionReactionTime[0].best
                     }, {
                         ['name']: 'asd'
                     },
                     {
                         ['score']: sessionReactionTime[0].score
                     }
                 ])




             } else {
                 console.log(sessionReactionTime.score)
                 console.log(scoreArr[0])

                 usersRef.child('-L9LkFuxfkOxOITWd97R').remove()

             }
             console.log(scoreArr)
         }

     }
 })
 console.log(db)