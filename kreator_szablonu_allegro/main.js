(() => {
    const addEvents = () => {
        let copyBtn = document.querySelector('#copyBtn')
        copyBtn.addEventListener('click', () => {
            copy()
        })
        let inputProducts = document.querySelectorAll('[data-element="product-input"]');
        for (const element of inputProducts) {
            element.addEventListener('keyup',function(){
                changeValue(element)
            },false)
        }
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
    const copy = () => {
        selectText()
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
        parentEl.innerHTML += `<${tag}>${text}</${tag}>`

    }



    addEvents()

})()