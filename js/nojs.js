const ACTIVE_CARDS_DESKTOP = 3;
const ACTIVE_CARDS_MOBILE = 1;

const steps = document.querySelector('.steps')
const participants = document.querySelector('.participants')
const membersList = document.querySelectorAll('.participants__list-item');

const deleteClass = () => {
	steps.classList.remove('steps--nojs')
	participants.classList.remove('participants--nojs')

	changeStep();

	window.addEventListener('resize', () => {
		changeStep();
	})
}

const changeStep = () => {
	participants.classList.remove('participants--nojs')

	if (window.matchMedia("(min-width: 1366px)").matches & membersList.length <= ACTIVE_CARDS_DESKTOP) {
		participants.classList.add('participants--nojs')
	}

	if (membersList.length <= ACTIVE_CARDS_MOBILE) {
	participants.classList.add('participants--nojs')
	}
}



export {deleteClass}