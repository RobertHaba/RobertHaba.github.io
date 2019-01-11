(() => {
    const addEvent = () => {
        let inputs = document.querySelectorAll('[data-input="template"]');
        console.log('Dodanie eventu: Działa');
        for (const input of inputs) {
            input.addEventListener('keyup', function () {
                matchTemplateElement(input)
                createTitle()
            }, false)
        }

        let moreInfoBtn = document.querySelector('#morePieces');
        moreInfoBtn.addEventListener('click', () => {
            morePieces(moreInfoBtn)
        })
        let resetAllBtn = document.querySelector('#resetAll');
        resetAllBtn.addEventListener('click', () => {
            resetAll()
        })
        let resetOthersBtn = document.querySelector('#resetOthers');
        resetOthersBtn.addEventListener('click', () => {
            resetWithoutName()
        })
        let copyTitleBtn = document.querySelector('#copyTitleBtn');
        copyTitleBtn.addEventListener('click', () => {
            copy(copyTitleBtn)
        })
        let copyCodeBtn = document.querySelector('#copyCode');
        copyCodeBtn.addEventListener('click', () => {
            copy(copyCodeBtn)
        })
        let copyTemplate = document.querySelector('#copyBtn');
        copyTemplate.addEventListener('click', () => {
            copy(copyTemplate)
        })

    }
    const matchTemplateElement = (input) => {
        let text
        let inputType = input.dataset.templateInput
        let itemsType = document.querySelectorAll('[data-template-item]');
        for (const element of itemsType) {
            if (element.dataset.templateItem == inputType) {
                console.log("Połączono z: " + inputType);
                text = getInputValue(input)
                showTheActivedItem(input, inputType)
                changeTextInTemplateItem(inputType, text)
            }
        }
    }
    const getInputValue = (input) => {
        let string, type
        type = input.dataset.templateText
        string = (type === 'uppercase') ? input.value.toUpperCase() : capitalizeFirstLetter(input)
        console.log('Dodanie wartości: ' + string);
        return string
    }

    const capitalizeFirstLetter = (input) => {
        if (input.dataset.templateInput !== 'templateDescription') {
            string = input.value
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        } else {
            string = input.value.capitalize()
        }
        return string
    }
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    const changeTextInTemplateItem = (itemType, text) => {
        let item = document.querySelector('[data-template-item="' + itemType + '"]');
        console.log('Zmiana tekstu dla: ' + itemType + " na: " + text);
        let textArray = findBreakLine(text)

        if (itemType == 'templateTitle') {
            item.innerText = text
        } else {
            item.innerHTML = ''
            for (element of textArray) {
                console.log(textArray.length);
                item.innerHTML += `<li>${element}</li>`

            }
        }
    }
    const findBreakLine = (string) => {
        let stringArray = string.split(',')
        return stringArray
    }
    const showTheActivedItem = (input, type) => {
        let items = document.querySelectorAll('[data-item-box]');
        console.log(items);
        for (const element of items) {
            if (element.dataset.itemBox === type && input.value !== '') {
                console.log(type + ' = ' + element.dataset.itemTitle);
                element.classList = 'show'
            } else if (input.value == '' && element.dataset.itemBox === type) {
                console.log(type + ' = ' + element.dataset.itemTitle);
                element.classList = 'hidden'
            }

        }

    }
    const morePieces = (btn) => {
        let infoBox = document.querySelector('[data-template-item="templateInformation"]');
        let requirement = btn.dataset.btnInfo
        if (requirement === 'more') {
            let newElement = document.createElement('li')
            newElement.setAttribute('data-item-info', 'more')
            newElement.innerText = 'Przedmioty wysyłane losowo - Stan techniczny i wizualny podobny'
            console.log(newElement);
            infoBox.insertBefore(newElement, infoBox.firstChild)
            btn.dataset.btnInfo = 'normal'
            btn.innerText = "(`3) Mniej sztuk "
        } else {
            btn.dataset.btnInfo = 'more'
            btn.innerText = "(`3) Więcej sztuk "
            infoBox.removeChild(infoBox.childNodes[0])
        }
    }
    const createTitle = () => {
        let inputsArray = getNecessaryInputsToTitle()
        let title = ''
        let lengthDefault = inputsArray[0].length + inputsArray[1].length
        let showInput = document.querySelector('#showHeaderText');
        let lengthBox = document.querySelector('#textLength');
        let length = 0
        let lengthWithGratis = lengthDefault + inputsArray[3].length
        let lengthWithCode = lengthDefault + inputsArray[2].length
        let lengthWithGratisAndCode = lengthWithGratis + inputsArray[2].length
        let minusLength
        if ((lengthWithGratisAndCode + 3) <= 50) {
            for (const element of inputsArray) {
                title += element + ' '

            }
            length = title.length
            minusLength = 3
        } else if ((lengthWithGratis + 2) <= 50) {
            title = inputsArray[0] + ' ' + inputsArray[1] + ' ' + inputsArray[3]
            length = title.length
            minusLength = 2

        } else if ((lengthWithCode + 2) <= 50) {
            title = inputsArray[0] + ' ' + inputsArray[1] + ' ' + inputsArray[2]
            length = title.length
            minusLength = 2

        } else if ((lengthDefault + 1) <= 50) {
            title = inputsArray[0] + ' ' + inputsArray[1]
            length = title.length
            minusLength = 1
        }
        showInput.value = title
        lengthBox.innerText = length + " (" + minusLength + ")"
    }
    const getNecessaryInputsToTitle = () => {
        let name, item, code, gratis
        name = document.querySelector('[data-template-input="templateTitle"]');
        item = document.querySelector('[data-template-input="templateItem"]');
        code = document.querySelector('[data-template-input="templateCode"]');
        gratis = document.querySelector('[data-template-input="templateGratis"]');
        name = getInputValue(name).split(',').join(' ')
        item = getInputValue(item).split(',').join(' ')
        code = getInputValue(code).split(',').join(' ')
        gratis = getInputValue(gratis).split(',').join(' ')
        return [name, item, code, gratis]
    }

    const resetAll = () => {
        let container = document.querySelector('#tempalteContainer');
        container.innerHTML = template
        let inputs = document.querySelectorAll('input');
        for (const element of inputs) {
            element.value = ''
        }
    }
    const resetWithoutName = () => {
        let container = document.querySelector('#tempalteContainer');
        container.innerHTML = template
        let inputs = document.querySelectorAll('input');
        for (const element of inputs) {
            if (element.dataset.templateInput !== 'templateTitle') {
                element.value = ''
            }

        }
    }
    const selectText = (boxToCopy) => {

        if (window.getSelection) {
            let range = document.createRange()
            range.selectNodeContents(boxToCopy)
            window.getSelection().removeAllRanges()
            window.getSelection().addRange(range)

        } else if (document.selection) {
            let range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(boxToCopy));
            range.select();
        }
    }
    const copy = (el) => {
        let type = el.dataset.copyAttr
        let boxToCopy = document.querySelector('[data-template-copy="' + type + '"]');
        let itemInput = document.querySelector('#clearSelect')
        if (type === 'template') {
            selectText(boxToCopy)
        } else {
            boxToCopy.select()
        }
        document.execCommand('copy')
        itemInput.select()
    }

    const template = `<div contenteditable="true" id="templateBox" >
    <h1 data-template-item="templateTitle">Nazwa</h1>
    <p><b>Przedmiot</b></p>
    <ul data-template-item="templateItem">
        <li></li>
    </ul>
    <div data-item-box="templateCode" data-item-hidden="true" class="hidden">
    <p><b>Oznaczenia:</b></p>
    <ul data-template-item="templateCode">
        <li></li>
    </ul>
</div>
    <p><b>Stan:</b></p>
    <ul data-template-item="templateCondition">
        <li>Przedmiot sprawny w 100%</li>
    </ul>
    <p><b>Stan wizualny:</b></p>
    <ul data-template-item="templateVisualCondition">
        <li>Widoczny na zdjęciach</li>
        <li>Ryski</li>
    </ul>
    <div data-item-box="templateDescription" data-item-hidden="true" class="hidden">
        <p><b>Opis:</b></p>
        <ul data-template-item="templateDescription">
            <li></li>
        </ul>
    </div>
    <div data-item-box="templateGratis" data-item-hidden="true" class="hidden">
        <p><b>Dodatki:</b></p>
        <ul data-template-item="templateGratis">
            <li></li>
        </ul>
    </div>
    <p><b>Informacje:</b></p>
    <ul data-template-item="templateInformation">
        <li>Uprzejmie prosimy o porównanie <b>oznaczeń</b>, jak i dokładne porównanie przedmiotu ze <b>zdjęciem</b>
            przed zakupem. Unikniemy w ten sposób nieporozumień w postaci negatywnych opinii.</li>
        <li>Serdecznie zapraszamy na nasze pozostałe aukcje.</li>
    </ul>

</div>`

    addEvent()
    let lastKeyPressed
    const shortCutsEvents = () => {
        document.addEventListener('keypress', function (key) {
            lastKeyPressed = keyPressed(key)
        })
    }
    let shortcutArray = [
        {
            'keys':'`1',
            'run':function(){
                return copy(document.querySelector('[data-copy-attr="templateTitle"]'))
            }
        },
        {
            'keys':'`2',
            'run':function(){
                return copy(document.querySelector('[data-copy-attr="template"]'))
            }
        },
        {
            'keys':'`3',
            'run':function(){
                return morePieces(document.querySelector('#morePieces'))
            }
        },
        {
            'keys':'`q',
            'run':function(){
                return resetAll()
            }
        },
        {
            'keys':'`w',
            'run':function(){
                return resetWithoutName()
            }
        },
        
    ]
    const keyPressed = (el) => {
        let shortcut = lastKeyPressed + el.key
        matchKey(shortcut);
        return el.key
    }
    const matchKey = (shortcut)=>{
        for (const element of shortcutArray) {
            if(element.keys === shortcut){
                element.run
                console.log(element.run());
            }
        }
    }
    shortCutsEvents()
})()