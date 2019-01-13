(() => {
    const addEvent = () => {
        let inputs = document.querySelectorAll('[data-input="template"]');
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
            if (element.dataset.templateItem == inputType && input.value.charAt(input.value.length - 1) !== '`') {
                
                text = (input.dataset.templateInput === 'templateItem') ? autoCompletProductName(input) : getInputValue(input)
                showTheActivedItem(input, inputType)
                changeTextInTemplateItem(inputType, text)
            }
        }
    }
    const getInputValue = (input) => {
        let string, type
        type = input.dataset.templateText

        showInformationTypeText(type, input)
        string = (type === 'uppercase') ? input.value.toUpperCase() : capitalizeFirstLetter(input)
        return string
    }
    const autoCompletProductName = (input) => {
        let text = input.value
        
        for (const [index, element] of productAutocomplete.entries()) {
            if (text.toLowerCase() == element[0].name) {
                text = element[0].value
            }
        }
        input.value = text
        return capitalizeFirstLetter(input)
    }
    const capitalizeFirstLetter = (input) => {
        if (input.dataset.templateInput !== 'templateDescription') {
            string = input.value
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            string = string.split(',').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(',')
            console.log(string);
            string = capitalizeExceptions(string)
        } else {
            string = input.value.capitalize()
        }
        return string
    }
    const capitalizeExceptions = (string) => {
        let text = string.split(' ')
        let newText = ''
        let exceptions = ['SD', 'WLAN', 'WiFi', 'LAN', 'USB', 'pwrSW', 'Wi-Fi']
        for (let element of text) {

            for (const exception of exceptions) {
                if (element.toLowerCase() == exception.toLowerCase()) {
                    element = exception
                }

            }
            newText += element + " "
        }

        return newText
    }
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    const changeTextInTemplateItem = (itemType, text) => {
        let item = document.querySelector('[data-template-item="' + itemType + '"]');
        let textArray = findBreakLine(text)

        if (itemType == 'templateTitle') {
            item.innerText = text
        } else {
            item.innerHTML = ''
            if (itemType == 'templateDescription') {
                textArray.unshift('Stan wizualny widoczny na zdjęciach')
            }
            for (element of textArray) {
                item.innerHTML += `<li>${element}</li>`
            }
        }
    }
    const findBreakLine = (string) => {
        let stringArray = string.split(',').map((string)=> string.charAt(0).toUpperCase() + string.substring(1))
        return stringArray
    }
    const showTheActivedItem = (input, type) => {
        let items = document.querySelectorAll('[data-item-box]');
        for (const element of items) {
            if (element.dataset.itemBox === type && input.value !== '') {
                element.classList = 'show'
            } else if (input.value == '' && element.dataset.itemBox === type) {
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
            infoBox.insertBefore(newElement, infoBox.firstChild)
            btn.dataset.btnInfo = 'normal'
            btn.innerText = "(`3) Mniej sztuk "
        } else {
            btn.dataset.btnInfo = 'more'
            btn.innerText = "(`3) Więcej sztuk "
            infoBox.removeChild(infoBox.childNodes[0])
        }
    }
    const showInformationTypeText = () => {
        let textBox = document.querySelector('#informationText');
        let codeInput = document.querySelector('[data-template-input="templateCode"]');
        if (codeInput.value === '') {
            textBox.innerHTML = `Uprzejmie prosimy o dokładne porównanie przedmiotu ze <b>zdjęciem</b>
            przed zakupem. Unikniemy w ten sposób nieporozumień w postaci negatywnych opinii.</li>
        `
        } else {
            textBox.innerHTML = `Uprzejmie prosimy o porównanie <b>oznaczeń</b>, jak i dokładne porównanie przedmiotu ze <b>zdjęciem</b>
            przed zakupem. Unikniemy w ten sposób nieporozumień w postaci negatywnych opinii.</li>
        `
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
        showInput.value = title.replace(/  +/g, ' ')
        lengthBox.innerText = showInput.value.length
    }
    const getNecessaryInputsToTitle = () => {
        let name, item, code, gratis, arrayProp, arrayItem,text
        arrayProp = [
            [name, 'templateTitle'],
            [item, 'templateItem'],
            [code, 'templateCode'],
            [gratis, 'templateGratis']
        ]
        arrayItem = []
        for (const element of arrayProp) {
            element[0] = document.querySelector('[data-template-input="' + element[1] + '"]');
            text = getInputValue(element[0])
            element[0] = text.split(',').join(' ')
            element[0] = findBreakLine(element[0]).join(' ')
            arrayItem.push(removeCharInLastPosition(element[0], ' '))
        }
        return arrayItem
    }
    const removeCharInLastPosition = (text, char) => {
        if (text.charAt(text.length - 1) === char) {
            text = text.slice(0, -1)
        }
        return text;
    }
    let container = document.querySelector('#tempalteContainer');
    let lengthBox = document.querySelector('#textLength');
    let inputs = document.querySelectorAll('input');
    const resetAll = () => {
        container.innerHTML = template
        lengthBox.innerText = '0'
        for (const element of inputs) {
            element.value = ''
        }
    }
    const resetWithoutName = () => {
        container.innerHTML = template
        lengthBox.innerText = '0'
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

    const template = `<div contenteditable="true" id="templateBox">
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
    
        <p><b>Opis:</b></p>
        <ul data-template-item="templateDescription">
            <li>Stan wizualny widoczny na zdjęciach</li>
        </ul>
    
    <div data-item-box="templateGratis" data-item-hidden="true" class="hidden">
        <p><b>Dodatki:</b></p>
        <ul data-template-item="templateGratis">
            <li></li>
        </ul>
    </div>
    <p><b>Informacje:</b></p>
    <ul data-template-item="templateInformation">
        <li id="informationText">Uprzejmie prosimy o dokładne porównanie przedmiotu ze <b>zdjęciem</b>
            przed zakupem. Unikniemy w ten sposób nieporozumień w postaci negatywnych opinii.</li>
        <li>Serdecznie zapraszamy na nasze pozostałe aukcje.</li>
    </ul>

</div>`

    let lastKeyPressed
    const shortCutsEvents = () => {
        document.addEventListener('keydown', function (key) {

            lastKeyPressed = keyPressed(key)
        })
    }
    let shortcutArray = [{
            'keys': '`1',
            'run': function () {
                return copy(document.querySelector('[data-copy-attr="templateTitle"]'))
            }
        },
        {
            'keys': '`2',
            'run': function () {
                return copy(document.querySelector('[data-copy-attr="template"]'))
            }
        },
        {
            'keys': '`3',
            'run': function () {
                return morePieces(document.querySelector('#morePieces'))
            }
        },
        {
            'keys': '`w',
            'run': function () {
                return resetAll()
            }
        },
        {
            'keys': '`q',
            'run': function () {
                return resetWithoutName()
            }
        },

    ]
    const keyPressed = (el) => {
        let shortcut = lastKeyPressed + el.key
        matchKey(shortcut);
        if (el.key == '`') {
            document.querySelector('#clearSelect').select();
        }
        return el.key
    }
    const matchKey = (shortcut) => {
        for (const element of shortcutArray) {
            if (element.keys === shortcut) {
                element.run()
            }
        }
    }
    const productAutocomplete = [
        // wzór [{'name':'', 'value':''}],
        // obudowy
        [{
            'name': 'klapa',
            'value': 'Obudowa Klapa Matrycy'
        }],
        [{
            'name': 'ramka',
            'value': 'Obudowa Ramka Matrycy'
        }],
        [{
            'name': 'kadłubek',
            'value': 'Obudowa Dolna Kadłubek'
        }],
        [{
            'name': 'palmrest',
            'value': 'Obudowa Górna Palmrest'
        }],
        [{
            'name': 'klapka',
            'value': 'Klapka Zaślepka'
        }],
        [{
            'name': 'ram',
            'value': 'Klapka Zaślepka RAM'
        }],
        [{
            'name': 'listwa',
            'value': 'Listwa Maskownica Panel'
        }],
        //chłodzenia
        [{
            'name': 'chłodzenie',
            'value': 'Chłodzenie Wentylator Radiator'
        }],
        [{
            'name': 'wiatrak',
            'value': 'Chłodzenie Wentylator Wiatrak'
        }],
        [{
            'name': 'radiator',
            'value': 'Chłodzenie Radiator Heatpipe'
        }],
        //moduły
        [{
            'name': 'usb',
            'value': 'Moduł Gniazdo USB Port'
        }],
        [{
            'name': 'sd',
            'value': 'Moduł Czytnik Kart SD'
        }],
        [{
            'name': 'włącznik',
            'value': 'Moduł Włącznik Power pwrSW'
        }],
        //sieciowe itp
        [{
            'name': 'anteny',
            'value': 'Antena Anteny WLAN WiFi'
        }],
        [{
            'name': 'wifi',
            'value': 'Karta Sieciowa WLAN WiFi Wi-Fi'
        }],
        [{
            'name': 'listwa',
            'value': 'Listwa Maskownica Zaślepka'
        }],
        [{
            'name': 'bt',
            'value': 'Moduł Bluetooth Modem'
        }],
        //inne
        [{
            'name': 'głośnik',
            'value': 'Głośnik Głośniki Audio'
        }],
        [{
            'name': 'napęd',
            'value': 'Napęd DVD Maskownica'
        }],
        [{
            'name': 'nagrywarka',
            'value': 'Napęd DVD Nagrywarka'
        }],
        [{
            'name': 'kamerka',
            'value': 'Kamera Kamerka Webcam'
        }],
        [{
            'name': 'zawiasy',
            'value': 'Zawiasy Lewy Prawy Prowadnice'
        }],
        [{
            'name': 'prowadnice',
            'value': 'Prowadnica Prowadnice Zawiasów'
        }],
        //Gniazda
        [{
            'name': 'zasilania',
            'value': 'Gniazdo Zasilania Ładowania'
        }],
        // do matryc
        [{
            'name': 'inwerter',
            'value': 'Inwerter Matrycy LCD'
        }],
        [{
            'name': 'taśma',
            'value': 'Taśma Matrycy LCD'
        }],

    ]

    addEvent()
    shortCutsEvents()
    const showAllautocompletItems = () =>{
        let box = document.querySelector('#autocompleteText');
        for (const element of productAutocomplete) {
            box.innerHTML += `<li>${element[0].name} - ${element[0].value}</li>`
        }
    }
    showAllautocompletItems()
})()