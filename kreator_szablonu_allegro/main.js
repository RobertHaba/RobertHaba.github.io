(() => {
    const addEvents = () => {
        let copyBtn = document.querySelector('#copyBtn')
        copyBtn.addEventListener('click', () => {
            copy('advanced')
        })
        let inputProducts = document.querySelectorAll('[data-element="product-input"]');
        for (const element of inputProducts) {
            element.addEventListener('keyup',function(){
                changeValue(element)
                checkLengthOfText()
            },false)
        }
        let copyTitleBtn = document.querySelector('#copyTitleBtn')
        copyTitleBtn.addEventListener('click', () => {
            copy('normal')
        })
    }
    const selectText = () => {
        let copyBox = document.querySelector('#templateBox')
        if (window.getSelection) {
            let range = document.createRange()
            range.selectNodeContents(copyBox)
            window.getSelection().removeAllRanges()
            window.getSelection().addRange(range)

        } else if (document.selection) {
            let range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(copyBox));
            range.select();
        }
    }
    const copy = (mode) => {
        if(mode === 'advanced'){
            selectText()
        }
        else if(mode=== "normal"){
            let titleText = document.querySelector('#showHeaderText');
            titleText.select()
        }
        document.execCommand('copy')
    }
    let productParamArray = [
        {
            'type': 'Model',
            'tag': 'h1',
            'position': '0'
        },
        {
            'type': 'Name',
            'tag': 'ul',
            'position': '0'
        },
        {
            'type': 'Code',
            'tag': 'ul',
            'position': '1'
        },
        {
            'type': 'Description',
            'tag': 'ul',
            'position': '4'
        }
        ,
        {
            'type': 'Gratis',
            'tag': 'ul',
            'position': '5'
        }
    ]
    const changeValue = (inputElement)=>{
        let elementType =inputElement.dataset.elementType
        for (const element of productParamArray) {
            templateChild = findTagParent(element)
            console.log(element);
            console.log(elementType);
            if(element.type === elementType && element.tag !== 'h1'){
                findBreakInString(inputElement, ',', element)
                console.log('test232');
                
            }
            else if(element.type === elementType && element.tag === 'h1'){
                templateChild[element.position].innerText = inputElement.value
                console.log('test');
                
            }
        }
    }
    let templateChild, tagParent
    const findTagParent = (element)=>{
        let copyBox = document.querySelector('#templateBox')
        tagParent = copyBox.querySelectorAll(element.tag)
        return tagParent
    }
    const findBreakInString = (text, requirement, productParam) =>{
        let test = text.value.split(requirement)
        console.log(productParam.position);
        let tag = (productParam.tag === 'ul')? 'li' : 'h1'
        if(test.length >= 1){

            let parentEl = tagParent[productParam.position]
            parentEl.innerHTML = ''
            
            for (const elementText of test) {
                createNewListItem(elementText, parentEl, tag)
            }
        }

    }
    const createNewListItem = (text, parentEl,tag)=>{
        parentEl.innerHTML += `<${tag} data-test="asd">${text}</${tag}>`

    }
    const checkLengthOfText = () => {
        let elementsNormal = document.querySelectorAll('[data-check-length="normal"]');
        let elementAdvanced = document.querySelector('[data-check-length="advanced"]')
        let boxToShowLength = document.querySelector('#textLength');
        let totalNormal = 0
        let total = 0
        for (const element of elementsNormal) {
            totalNormal += element.value.length
            console.log(totalNormal);
        }
        total = totalNormal + elementAdvanced.value.length
        boxToShowLength.innerText = totalNormal + ' + ' + elementAdvanced.value.length + " = " + total
        let propertyArray = [elementsNormal, elementAdvanced, totalNormal, total]
        createHeaderText(propertyArray)
    }
    const createHeaderText = (propertyArray) => {
        let codeProduct, namesTotalLen, totalLen, text
        model = propertyArray[0][0].value
        nameProduct = propertyArray[0][1].value
        codeProduct = propertyArray[1].value
        namesTotalLen = propertyArray[2]
        totalLen = propertyArray[3]
        text = ''
        console.log(totalLen);
            console.log(namesTotalLen);
        if(namesTotalLen < totalLen && totalLen <= 50){
            text = model + ' ' + nameProduct + ' ' + codeProduct
            console.log('1');
        }
        else{
            text = model + ' ' + nameProduct
            console.log('2');
        }
        addNewTextToInput(text)
    }
    const addNewTextToInput = (text) => {
        let headerText = document.querySelector('#showHeaderText');
        headerText.value = text
    }
    
    addEvents()

})()