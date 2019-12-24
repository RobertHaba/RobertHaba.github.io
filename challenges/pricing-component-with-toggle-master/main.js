(() => {
    const togglePrice = () => {
        let checkbox = document.querySelector('#priceCheckbox');
        let priceAnnunalyItems = document.querySelectorAll('[data-price-type="annually"]')
        let priceMonthlyItems = document.querySelectorAll('[data-price-type="monthly"]')
        checkbox.addEventListener('click', function checkStatus() {
            if (checkbox.checked === true) {
                changePrice(priceAnnunalyItems, 'none')
                changePrice(priceMonthlyItems, 'block')
            } else {
                changePrice(priceAnnunalyItems, 'block')
                changePrice(priceMonthlyItems, 'none')
            }
        })

    }
    const changePrice = (arr, styleProp) => {
        arr.forEach(function(item) {
            item.style.display = styleProp
        })
    }
    togglePrice()
    console.log('added')
})()