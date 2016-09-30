'use strict';

console.log('api-form-validation-file');

// consts to hold input elements for form validation
const artistInput = document.getElementById('artist-input');
const titleInput = document.getElementById('title-input');
const yearInput = document.getElementById('year-input');
const genreInput = document.getElementById('genre-input');
const formatInput = document.getElementById('format-input');
const quantityInput = document.getElementById('quantity-input');
const isStaffPick = document.getElementById('isStaffPick-input');

// const to hold filter submit button element
const searchFilterSubmit = document.getElementById('api-search-submit');

// const to hold add new album submit button element
const addNewAlbumSubmit = document.getElementById('api-add-new-album-submit');

// console.log(artistInput);
// console.log(titleInput);
// console.log(yearInput);
// console.log(genreInput);
// console.log(formatInput);
// console.log(quantityInput);
// console.log(isStaffPick);
// console.log(searchFilterSubmit);
console.log(addNewAlbumSubmit);

function formValidation(e) {
	if (typeof artistInput.value !== 'string') {		/* need to add check against numbers here */
		console.log('problem with artist input');
		e.preventDefault();
		artistInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof titleInput.value !== 'string') {			/* need to add check against numbers here */
		console.log('problem with title input');
		e.preventDefault();
		titleInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof yearInput.value !== 'string' || yearInput.value.length > 4) {
		console.log('problem with year input');
		e.preventDefault();
		yearInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof genreInput.value !== 'string') {			/* need to add check against numbers here */
		console.log('problem with genre input');
		e.preventDefault();
		genreInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof formatInput.value !== 'string' ||formatInput.value.length > 2) {			/* need to add check against letters here */
		console.log('problem with format input');
		e.preventDefault();
		formatInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof quantityInput.value !== 'string' || quantityInput.value.length > 2) {	/* need to add check against letters here */
		console.log('problem with quantity input');
		console.log(typeof quantityInput.value);
		e.preventDefault();
		quantityInput.style.boxShadow = '0 0 15px red';
	};

	// isStaffPick.value.toLowerCase();  ?? not working ??
	// console.log('isStaffPick value after .toLowerCase() called ' + isStaffPick.value);
	// if (isStaffPick.value !== 'true' || isStaffPick.value !== 'false') {
	if (typeof isStaffPick.value !== 'string') {
		console.log(typeof isStaffPick.value);
		console.log('problem with isStaffPick input');
       	e.preventDefault();
       	isStaffPick.style.boxShadow = '0 0 15px red';
	};
}

searchFilterSubmit.addEventListener('click', (e) => {
	formValidation(e);
});

