const CARD_POSITION_STEP = 360;

const leftButton = document.querySelector('.steps__button.button__round--left')
const rightButton = document.querySelector('.steps__button.button__round--right')
const listSwipeIcons = document.querySelectorAll('.steps__list-swipe-item');
const stageList = document.querySelectorAll('.steps__list-item')

let cardPosition = 0;

leftButton.setAttribute("disabled", "")

const moveCardRight = (currentList, step, listLength) => {
	leftButton.removeAttribute("disabled", "")

	if (CARD_POSITION_STEP * listLength.length === cardPosition + CARD_POSITION_STEP * 2) {
		rightButton.setAttribute("disabled", "")
	}

	if (CARD_POSITION_STEP * listLength.length <= cardPosition + CARD_POSITION_STEP) {
		return false
	}

	cardPosition = cardPosition + step;

	currentList.forEach((listItem) => {
		listItem.style.right = `${cardPosition}px`
	})
}

const moveCardLeft = (currentList, step) => {
	rightButton.removeAttribute("disabled", "")

	if (CARD_POSITION_STEP === cardPosition) {
		leftButton.setAttribute("disabled", "")
	}

	if (0 >= cardPosition) {
		return false
	}

	cardPosition = cardPosition - step;

	currentList.forEach((listItem) => {
		listItem.style.right = `${cardPosition}px`
	})
}

const moveMarkerRight = () => {
	if (markerPosition >= listSwipeIcons.length) {
		return false;
	}

	listSwipeIcons[markerPosition - 1].classList.remove('steps__list-swipe-item--active');
	listSwipeIcons[markerPosition].classList.add('steps__list-swipe-item--active');

	markerPosition++;
}

const moveMarkerLeft = () => {
	if (markerPosition <= 1 ) {
		return false;
	}

	listSwipeIcons[markerPosition - 1].classList.remove('steps__list-swipe-item--active');
	listSwipeIcons[markerPosition - 2].classList.add('steps__list-swipe-item--active');

	markerPosition--;
}

let markerPosition = 1;

const addButtonsPlane = () => {
	rightButton.addEventListener('click', () => {
		moveCardRight(stageList, CARD_POSITION_STEP, listSwipeIcons);
		moveMarkerRight();
	})
	
	leftButton.addEventListener('click', () => {
		moveCardLeft(stageList, CARD_POSITION_STEP);
		moveMarkerLeft();
	})
}

export {addButtonsPlane}