(()=>{
    let productsArray = []
    let product = {
        name: String,
        quanity: Number,
        price: String
    }
    const getProducts = ()=>{
        let arrayName = document.querySelectorAll('.productName')
        let arrayQuanity = document.querySelectorAll('.productQuanity')
        let arrayPrice = document.querySelectorAll('.productPrice').value
        console.log(arrayName)
        createArrayWithProducts(arrayName, product.name)
        createArrayWithProducts(arrayQuanity, product.quanity)
    }
    const createArrayWithProducts = (arrayElements, object)=>{
        console.log(arrayElements)
        for(let[index, el] of arrayElements.entries()){
            object = el.value
            productsArray[index] = [object]
            console.log(productsArray[index])
        }
    }
    const matchResult = () =>{

    }
    getProducts()
})()