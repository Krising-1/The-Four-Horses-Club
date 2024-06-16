const MOBILE_VIEW_STEP = 360;
const DESKTOP_VIEW_STEP = 1241;
const MOBILE_CARD_STEP = 1;
const DESKTOP_CARD_STEP = 3;
const MOBILE_START_POINT = 1;
const DESKTOP_START_POINT = 3;
const ACTIVE_CARDS_DESKTOP = 3;

const leftButton = document.querySelector('.participants__button.button__round--left')
const rightButton = document.querySelector('.participants__button.button__round--right')
const membersList = document.querySelectorAll('.participants__list-item');
const currentValueIncrement = document.querySelector('.participants__current-number');
const maxValueIncrement = document.querySelector('.participants__maximum-number');

maxValueIncrement.textContent = membersList.length


let cardPositionStep = MOBILE_VIEW_STEP;
let currentValue = currentValueIncrement.innerHTML
let cardPosition = 0;

const changeStep = () => {
	membersList.forEach((listItem) => {
		listItem.style.right = "0"
	})

	cardPosition = 0;

	if (window.matchMedia("(min-width: 1366px)").matches) {
		cardPositionStep = DESKTOP_VIEW_STEP;
		currentValue = DESKTOP_START_POINT;
		currentValueIncrement.textContent = DESKTOP_START_POINT;
	} else {
		cardPositionStep = MOBILE_VIEW_STEP;
		currentValue = MOBILE_START_POINT;
		currentValueIncrement.textContent = MOBILE_START_POINT;
	}
}

changeStep();

window.addEventListener('resize', () => {
	changeStep();
})

const counterIncrement = () => {
	if (cardPositionStep === DESKTOP_VIEW_STEP) {
		currentValue = +currentValue + DESKTOP_CARD_STEP
	} else {
		currentValue++
	}

	if (currentValue >= maxValueIncrement.innerHTML) {
		if(cardPositionStep === DESKTOP_VIEW_STEP) {
			currentValueIncrement.textContent = maxValueIncrement.textContent

			currentValue = 0;

			return;
		} else {
			currentValueIncrement.textContent = maxValueIncrement.textContent

			currentValue = 0;

			return;
		}
	}

	currentValueIncrement.textContent = currentValue;
}

const counterReduction = () => {
	if (cardPositionStep === DESKTOP_VIEW_STEP) {
		currentValue = +currentValue - DESKTOP_CARD_STEP
	} else {
		currentValue--
	}

	if (currentValue <= 0) {
		currentValue = membersList.length 
	}

	currentValueIncrement.textContent = currentValue;
}

const moveCardRight = (currentList, step, listLength) => {
	if (cardPositionStep === DESKTOP_VIEW_STEP) {
		if (step * Math.ceil(listLength.length / ACTIVE_CARDS_DESKTOP) <= cardPosition + step) {
			cardPosition = -step;
		}
	} else {
		if (step * listLength.length <= cardPosition + step) {
			cardPosition = -step;
		}
	}

	cardPosition = cardPosition + step;

	currentList.forEach((listItem) => {
		listItem.style.right = `${cardPosition}px`
	})
}

const moveCardLeft = (currentList, step, listLength) => {
	if (cardPositionStep === DESKTOP_VIEW_STEP) {
		if (0 >= cardPosition) {
			cardPosition = step * Math.ceil(listLength.length / ACTIVE_CARDS_DESKTOP);
		}
	} else {
		if (0 >= cardPosition) {
			cardPosition = step * listLength.length
		}
	}

	cardPosition = cardPosition - step;

	currentList.forEach((listItem) => {
		listItem.style.right = `${cardPosition}px`
	})
}

setInterval(() => {
	counterIncrement()
	moveCardRight(membersList, cardPositionStep, membersList)
	},
	4000
)

const addButtonsMembers = () => {
	rightButton.addEventListener('click', () => {
		moveCardRight(membersList, cardPositionStep, membersList);
		counterIncrement();
	})
	
	leftButton.addEventListener('click', () => {
		moveCardLeft(membersList, cardPositionStep, membersList );
		counterReduction();
	})
}

export {addButtonsMembers}