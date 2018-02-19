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

function showScroll() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
}