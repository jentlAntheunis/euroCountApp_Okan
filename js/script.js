let maxAmount = 100;

let jsObjectsContainer; let htmlGoalField; let goalAmount;

let total = 0;

const init = () => {
    console.log('Hello World');

    const htmlObjectsContainer = document.querySelector('.js-objects-container');
    const htmlOptions = document.querySelectorAll('.js-option');
    jsObjectsContainer = document.querySelector('.js-objects-container');
    htmlGoalField = document.querySelector('.js-goal-field');
    console.info(htmlObjectsContainer);
    console.info(htmlOptions);

    htmlOptions.forEach((option) => {
        dragElement(option);
    });

    //generate random goal amount, also activate button
    generateGoalAmount();
    console.info(goalAmount);
    document.querySelector('.js-goal-reset').addEventListener('click', (e) => {
        generateGoalAmount();
        clearMoney();
        goalAmount = parseFloat(document.querySelector('.js-goal-amount').innerHTML);
    });
    document.querySelector('.js-field-reset').addEventListener('click', (e) => {
        clearMoney();
    });
}

const dragElement = (option) => {
    option.addEventListener('click', (event) => {
        // create a copy of the element and change its position to the mouse position
        const htmlCopy = document.createElement('img');
        htmlCopy.src = event.currentTarget.src;
        htmlCopy.dataset.value = event.currentTarget.dataset.value;
        htmlCopy.classList.add('object-copy');
        htmlCopy.style.height = '5rem';
        htmlCopy.style.transform = 'translate(-50%, -50%)';
        htmlCopy.style.position = 'absolute';
        htmlCopy.style.top = `${event.clientY}px`;
        htmlCopy.style.left = `${event.clientX}px`;
        jsObjectsContainer.appendChild(htmlCopy);

        const defineMoveMoney = (event) => {
            moveMoney(event, htmlCopy);
        };
        // add mousemove event listener to the document
        document.addEventListener('mousemove', defineMoveMoney);

        // add second click event listener to the container, so nothing happens when clicked outside

        definePlaceMoney = event => {
            placeMoney(event, htmlCopy);
            document.removeEventListener('mousemove', defineMoveMoney);
            htmlGoalField.removeEventListener('click', definePlaceMoney);
        };

        htmlGoalField.addEventListener('click', definePlaceMoney);

    });
}

const winAnimation = () => {
    console.info('win animation');
}

const clearMoney = () => {
    console.info('money cleared');
    jsObjectsContainer.innerHTML = '';
    total = 0;
}

const moveMoney = (event, htmlCopy) => {
    console.info('mouse move');
    htmlCopy.style.top = `${event.clientY}px`;
    htmlCopy.style.left = `${event.clientX}px`;
}

const placeMoney = (event, htmlCopy) => {
    console.info('money placed');
    total += parseFloat(htmlCopy.dataset.value);
    console.info('total: ', total);
    console.info('goal: ', goalAmount);
    htmlCopy.classList.remove('object-copy');
    htmlCopy.classList.add('object-placed');
    if (total - goalAmount < 0.01 && total - goalAmount > -0.01) {
        console.info('goal reached');
        winAnimation();
        clearMoney();
        generateGoalAmount();
    }
}

const generateGoalAmount = () => {
    const randomGoalAmount = Math.floor(Math.random() * maxAmount);
    const randomAfterComma = Math.floor(Math.random() * 20) * 5;

    const htmlGoalAmount = document.querySelector('.js-goal-amount');
    htmlGoalAmount.innerHTML = `${randomGoalAmount}.${formatNumber(randomAfterComma)}`;
    console.info(document.querySelector('.js-goal-amount').innerHTML);
    goalAmount = parseFloat(document.querySelector('.js-goal-amount').innerHTML);
}

const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', init);