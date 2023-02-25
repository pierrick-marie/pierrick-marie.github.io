/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2023, Pierrick MARIE contact at pierrickmarie.info
 * All rights reserved.
 **/

const GALLERY = 'simple-gallery';		// the class of the main section of the gallery
const IMAGES = `.${GALLERY} .images img`;		// all the images of the gallery
const THUMBNAILS = `${GALLERY}-thumbnails`;	// the class of thumbnails section
const TITLE = `${GALLERY}-title`;		// the class of title section
const ARROWS = `${GALLERY}-arrows`;		// the class of arrows section
const LEGENDS = `.${GALLERY}-legends`;	// legends of images

var CURRENT_IMAGE_NUMBER = 0;		// the number of the current image displayed on the screen
var NB_IMAGES = 0;		// the total number of images
var THUMBNAIL_SIZE = 0;

$(document).ready(function () {

	setupGallerySections();

	setupImages();

	setupGalleryLegend();

	setupKeyboardBinding();
});

/**
 * Add event handler on left, right and escape key to change current image
 */
function setupKeyboardBinding() {

	$(document).keydown(function (event) {
		if (event.which == 37) { 	// left key pressed
			leftArrowClicked();
		} else {
			if (event.which == 39) { 	// right key pressed
				rightArrowClicked();
			}
		}
	});
}

function copyToClipBoard(code) {


	var text = $(`#${code}`).text();
	text = text.trim();
	navigator.clipboard.writeText(text);

	$(`#${code}`).next('.code-copied').fadeIn(); // .css('display', 'inline')
	setTimeout(function() {
		$(`#${code}`).next('.code-copied').fadeOut();
	}, 1000);
}

function setupGalleryLegend() {

	var index = 0;

	$('.images').after(`<p class="projects-description" id="${GALLERY}-legend"></p>`);

	$(`${LEGENDS} p`).each(function () {
		$(this).attr('id', `${GALLERY}-legend-${index}`);
		
		var code = $(this).find('code').attr('id', `${GALLERY}-legend-code-${index}`)
			.attr('onclick', `copyToClipBoard("${GALLERY}-legend-code-${index}")`)
			.attr('title', 'Copy snippet')
			.addClass('snippet');
		$(this).append('<p class="code-copied">Copié <i class="fa-solid fa-check"></i></p>');
		
		index++;
	});

	$(`#${GALLERY}-legend`).html(
		$(`#${GALLERY}-legend-${CURRENT_IMAGE_NUMBER}`).html());
}

/**
 * Init the sections: title, arrows and thumbnails
 */
function setupGallerySections() {

	$(`.${GALLERY}`).addClass('sizeOfGallery')	// Defines the size of the gallery
		.addClass('positionOfGallery')	// Defines the position of the gallery
		.addClass('decorationGallery');	// Decorates the gallery

	setupTitlesSection();

	setupThumbnailsSection();

	setupArrows();
}

/**
 * Setup all images in the gallery:
 * 	- init global var NB_IMAGES
 * 	- add class defaultView
 * 	- hide all images except the first
 * 	- add class to all images
 */
function setupImages() {

	NB_IMAGES = $(IMAGES).length;	// Count number of images to display

	$(IMAGES).first().addClass('defaultView');	// Add classes defaultView to the first image
	$(IMAGES).first().show();	// Show first image

	setupImagesClass();
}

/**
 * Configure the section for thumbnails
 */
function setupThumbnailsSection() {

	$(`.${GALLERY}`).append(`<section class="${THUMBNAILS}"></section>`);	// Add a section for thumbnails after the images

	setupThumbnailImages();
}

/**
 * Setup thumbnails of images
 * It clones all images in '.thumbnails' class.
 * Then it adds an class like .thumbnail-{number}
 *  where {number} starts from 0 to the number of images
 * Finally it adds '.cursorPointer' class to all images except the first
 */
function setupThumbnailImages() {

	const _thumbnailClass = `${GALLERY}-thumbnail-`;	// Class of thumbnail
	var index = 0;

	$(IMAGES).each(function () {
		$(`.${THUMBNAILS}`).append(
			$(this).clone()
				.attr('class', _thumbnailClass.concat(index))	// Add class .thumbnails-{index}
				.click({ class: index }, callChangeCurrentImage) 	// on click to a thumbnails, call function to display the new image
		);
		index++;
	});

	$(`.${THUMBNAILS} img`).slice(1).addClass('cursorPointer'); // Add cursor clickable to all thumbnails except first
	$(`.${THUMBNAILS} img`).first().addClass('shadow-gallery'); // Add shadow on first thumbnail

	THUMBNAIL_SIZE = $(`.${THUMBNAILS} img`).first().width();
}

/**
 * Add a section that will contain the title of the current image
 * Setup the title with attribut from the first image
 */
function setupTitlesSection() {

	const _titleValue = $(IMAGES).first().attr('title');	// Get title of the first image

	$(`.${GALLERY}`).prepend(`<h2 class="${TITLE}">${_titleValue}</h2>`);	// Insert h1 section
}

/**
 * Add left and right arrows to navigate between the images
 * ! Be sure the section for titles is correctly enabled before !
 */
function setupArrows() {

	$(`.${TITLE}`).after(`
		<nav>
			<img class="${GALLERY}-left-arrow ${ARROWS}" src="./img/projects/left-arrow.png" onclick="leftArrowClicked()"/>
			<img class="${GALLERY}-right-arrow ${ARROWS}" src="./img/projects/right-arrow.png" onclick="rightArrowClicked()"/>
		</nav>
	`);	// Insert the arrows
}

/**
 * Setup class for each images
 * classes are: .images-{number}
 * {number} starts at 0 and increase to the number of images
 */
function setupImagesClass() {

	const _imageClass = `${GALLERY}-image`; // Class of images

	var index = 0;

	$(IMAGES).each(function () {
		$(this).addClass(`${_imageClass}-${index}`); // Add class .image-{index}
		index++;
	});
}

/**
 * Get index number from event parameter and call changeMainImage.
 * This function have to be called from click on thumbnails
 */
function callChangeCurrentImage(event) {
	changeCurrentImage(event.data.class);
}

/**
 * Display next image
 */
function changeCurrentImage(newIndex) {

	if (CURRENT_IMAGE_NUMBER != newIndex) {

		const _image = `.${GALLERY}-image`;			// class of images
		const _thumbnail = `.${GALLERY}-thumbnail`;	// class of thumbnails

		const _newImageClass = `${_image}-${newIndex}`; 		// Compute new index of .image-
		const _newThumbnailClass = `${_thumbnail}-${newIndex}`;	// Compute new index of .thumbnail-

		const _currentImageClass = `${_image}-${CURRENT_IMAGE_NUMBER}`;		// Compute current index of is .image-
		const _currentThumbnailClass = `${_thumbnail}-${CURRENT_IMAGE_NUMBER}`;	// Compute current index of is .thumbnail-

		CURRENT_IMAGE_NUMBER = newIndex;	// update currentIndex with new value

		$(_currentImageClass).hide();	// hide previous image
		$(_newImageClass).show(); 		// display new image


		displayDefaultView();

		$(_currentThumbnailClass).removeClass('shadow-gallery').removeClass('cursorDefault').addClass('cursorPointer');	// change skin of current thumbnail
		$(_newThumbnailClass).addClass('shadow-gallery').addClass('cursorDefault').removeClass('cursorPointer'); 		// change skin of new selected thumbnail

		$(`.${TITLE}`).html($(_newImageClass).attr('title')); // Update title
	}
}

/**
 * Get index of previous image
 */
function leftArrowClicked() {

	var index = CURRENT_IMAGE_NUMBER - 1;

	if (index < 0) {
		index = NB_IMAGES - 1;
	}

	changeCurrentImage(index);
}

/**
 * Get index of next image
 */
function rightArrowClicked() {

	var index = CURRENT_IMAGE_NUMBER + 1;

	if (index >= NB_IMAGES) {
		index = 0;
	}

	changeCurrentImage(index);
}

/**
 * Display image in default view
 */
function displayDefaultView() {

	const _currentImage = `.${GALLERY}-image-${CURRENT_IMAGE_NUMBER}`;

	$(_currentImage).addClass('defaultView');

	$(`#${GALLERY}-legend`).html(
		$(`#${GALLERY}-legend-${CURRENT_IMAGE_NUMBER}`).html());

	var scrollPosition = CURRENT_IMAGE_NUMBER * THUMBNAIL_SIZE;
	$(`.${THUMBNAILS}`).scrollLeft(scrollPosition);
}
