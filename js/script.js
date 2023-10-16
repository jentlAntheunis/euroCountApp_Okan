let maxAmount = 100;
let successAmountGoal = 10;
let successCounter = 0;

let jsObjectsContainer, htmlGoalField, goalAmount, htmlSuccessGoal, htmlSuccessCounter;

let total = 0;

const init = () => {
    console.log('Hello World');

    const htmlOptions = document.querySelectorAll('.js-option');
    jsObjectsContainer = document.querySelector('.js-objects-container');
    htmlGoalField = document.querySelector('.js-goal-field');
    htmlSuccessGoal = document.querySelector('.js-success-goal');
    htmlSuccessCounter = document.querySelector('.js-success-counter');

    htmlSuccessGoal.innerHTML = successAmountGoal;
    htmlSuccessCounter.innerHTML = successCounter;

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
    document.querySelector('.js-field-undo').addEventListener('click', (e) => {
        clearLastMoney();
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

const clearLastMoney = () => {
    const lastMoney = document.querySelector('.object-placed:last-child');
    // delete last money
    lastMoney.remove();
    total -= parseFloat(lastMoney.dataset.value);
}

const winAnimation = () => {
    console.info('win animation');
    document.querySelector('.js-overlay').classList.remove('c-success__overlay--hidden');
    successCounter++;
    htmlSuccessCounter.innerHTML = successCounter;
    setTimeout(() => {
        document.querySelector('.js-overlay').classList.add('c-success__overlay--hidden');
    }, 2000);
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