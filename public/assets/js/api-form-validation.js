'use strict';

console.log('api-form-validation-file');

// consts to hold input elements for filter form validation
const filterArtistInput = document.getElementById('filter-artist-input');
const filterTitleInput = document.getElementById('filter-title-input');
const filterYearInput = document.getElementById('filter-year-input');
const filterGenreInput = document.getElementById('filter-genre-input');
const filterFormatInput = document.getElementById('filter-format-input');
const filterQuantityInput = document.getElementById('filter-quantity-input');
const filterIsStaffPick = document.getElementById('filter-isStaffPick-input');

// const to hold filter submit button element
const searchFilterSubmit = document.getElementById('api-search-submit');

// consts to hold input elements for add new album form validation
const createArtistInput = document.getElementById('create-artist-input');
const createTitleInput = document.getElementById('create-title-input');
const createYearInput = document.getElementById('create-year-input');
const createGenreInput = document.getElementById('create-genre-input');
const createPriceInput = document.getElementById('create-price-input');
const createFormatInput = document.getElementById('create-format-input');
const createImgURLInput = document.getElementById('create-imgURL-input');
const createQuantityInput = document.getElementById('create-quantity-input');
const createIsStaffPick = document.getElementById('create-isStaffPick-input');

// const to hold add new album submit button element
const addNewAlbumSubmit = document.getElementById('api-add-new-album-submit');

// const to hold regex for numbers
const nums = /^[0-9]*$/gm;

// console.log(artistInput);
// console.log(titleInput);
// console.log(yearInput);
// console.log(genreInput);
// console.log(formatInput);
// console.log(quantityInput);
// console.log(isStaffPick);
// console.log(searchFilterSubmit);
console.log(addNewAlbumSubmit);

searchFilterSubmit.addEventListener('click', (e) => {
	if (typeof filterArtistInput.value !== 'string') {
		console.log('problem with artist input');
		e.preventDefault();
		filterArtistInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof filterTitleInput.value !== 'string') {
		console.log('problem with title input');
		e.preventDefault();
		filterTitleInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof filterYearInput.value !== 'string' || filterYearInput.value.length > 4 || filterYearInput.value.length === 1 || filterYearInput.value.length === 2 || filterYearInput.value.length === 3) {
		console.log('problem with year input');
		e.preventDefault();
		filterYearInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof filterGenreInput.value !== 'string' || filterGenreInput.value == nums) {			/* need to add check against numbers here */
		console.log('problem with genre input');
		e.preventDefault();
		filterGenreInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof filterFormatInput.value !== 'string' || filterFormatInput.value.length > 2) {			/* need to add check against letters here */
		console.log('problem with format input');
		e.preventDefault();
		filterFormatInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof filterQuantityInput.value !== 'string' || filterQuantityInput.value.length > 2) {	/* need to add check against letters here */
		console.log('problem with quantity input');
		console.log(typeof quantityInput.value);
		e.preventDefault();
		filterQuantityInput.style.boxShadow = '0 0 15px red';
	};

	// isStaffPick.value.toLowerCase();  ?? not working ??
	// console.log('isStaffPick value after .toLowerCase() called ' + isStaffPick.value);
	// if (isStaffPick.value !== 'true' || isStaffPick.value !== 'false') {
	if (typeof filterIsStaffPick.value !== 'string') {
		console.log(typeof filterIsStaffPick.value);
		console.log('problem with isStaffPick input');
       	e.preventDefault();
       	filterIsStaffPick.style.boxShadow = '0 0 15px red';
	};
});


addNewAlbumSubmit.addEventListener('click', (e) => {
	if (typeof createArtistInput.value !== 'string' || createArtistInput.value === '' || createArtistInput.value === undefined) {
		console.log('problem with artist input');
		e.preventDefault();
		createArtistInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof createTitleInput.value !== 'string' || createTitleInput.value === '' || createTitleInput.value === undefined) {
		console.log('problem with title input');
		e.preventDefault();
		createTitleInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof createYearInput.value !== 'string' || createYearInput.value === '' || createYearInput.value === undefined || createYearInput.value.length !== 4) {
		console.log('problem with year input');
		e.preventDefault();
		createYearInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof createPriceInput.value !== 'number' || createPriceInput.value === '' || createPriceInput.value === undefined) {
		console.log('problem with price input');
		e.preventDefault();
		createPriceInput.style.boxShadow = '0 0 15px red';
	}

	if (typeof createGenreInput.value !== 'string' || createGenreInput.value === '' || createGenreInput.value === undefined || createGenreInput.value === nums) {
		console.log('problem with genre input');
		e.preventDefault();
		createGenreInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof createFormatInput.value !== 'string' ||  createFormatInput.value === '' || createFormatInput.value === undefined ||createFormatInput.value.length > 2) {			/* need to add check against letters here */
		console.log('problem with format input');
		e.preventDefault();
		createFormatInput.style.boxShadow = '0 0 15px red';
	};

	if (typeof createImgURLInput.value !== 'string' || createImgURLInput.value === '' || createImgURLInput.value === undefined) {
		console.log('problem with imgURL input');
		e.preventDefault();
		createImgURLInput.style.boxShadow = '0 0 15px red';
	}

	if (typeof createQuantityInput.value !== 'number' || createQuantityInput.value === '' || createQuantityInput.value === undefined || createQuantityInput.value.length > 2) {	/* need to add check against letters here */
		console.log('problem with quantity input');
		e.preventDefault();
		createQuantityInput.style.boxShadow = '0 0 15px red';
	};

	// isStaffPick.value.toLowerCase();  ?? not working ??
	// console.log('isStaffPick value after .toLowerCase() called ' + isStaffPick.value);
	// if (isStaffPick.value !== 'true' || isStaffPick.value !== 'false') {
	if (typeof createIsStaffPick.value !== 'string' || createIsStaffPick.value === '' || createIsStaffPick.value === undefined) {
		console.log('problem with isStaffPick input');
       	e.preventDefault();
       	createIsStaffPick.style.boxShadow = '0 0 15px red';
	};
});

// function to remove red box-shadow for error; called in each form input
function removeRed() {
	filterArtistInput.style.boxShadow = 'none';
	filterTitleInput.style.boxShadow = 'none';
	filterYearInput.style.boxShadow = 'none';
	filterGenreInput.style.boxShadow = 'none';
	filterFormatInput.style.boxShadow = 'none';
	filterQuantityInput.style.boxShadow = 'none';
	filterIsStaffPick.style.boxShadow = 'none';

	createArtistInput.style.boxShadow = 'none';
	createTitleInput.style.boxShadow = 'none';
	createYearInput.style.boxShadow = 'none';
	createGenreInput.style.boxShadow = 'none';
	createPriceInput.style.boxShadow = 'none';
	createFormatInput.style.boxShadow = 'none';
	createImgURLInput.style.boxShadow = 'none';
	createQuantityInput.style.boxShadow = 'none';
	createIsStaffPick.style.boxShadow = 'none';
}