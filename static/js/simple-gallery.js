/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2023, Pierrick MARIE contact at pierrickmarie.info
 * All rights reserved.
 **/
const TECHNOLOGIES_TOP = $('#technologies .cv').first().offset().top;
var technologiesAreHide = true;

const GALLERY = '.projects-gallery';		// the class of the main section of the gallery
const PROJECTS_LEGENDS = `${GALLERY} .legends .legend`;	// all the images of the gallery
const PROJECT = `${GALLERY} .project`;
const THUMBNAILS = `${GALLERY} .thumbnails .horizontal-scroll`

const LEGENDS = `${GALLERY} .legends`;	// legends of images

var CURRENT_PROJECT_ID = 0;		// the number of the current image displayed on the screen
var NB_PROJECTS = 0;		// the total number of images
var THUMBNAIL_SIZE = 0;

$(document).ready(function () {

	$(window).scroll(function () {
		SimpleGallery.scrollTechnologiesFunction();
	});
	SimpleGallery.scrollTechnologiesFunction();	// call function after loading page

	SimpleGallery.setupThumbnails();

	SimpleGallery.setupProject();

	SimpleGallery.setupArrows();
	
	SimpleGallery.setupLegends();

	SimpleGallery.showCurrentProject();

	SimpleGallery.setupKeyboardBinding();

	SimpleGallery.fadeInTimeline();
});

var SimpleGallery = {

	/**
	 * Fade in timeline
	 */
	fadeInTimeline: function() {

		var index = 0;

		(function fadeInTimelineParagraph() {
			TIMELINE_PARAGRAPHS.eq(index++).fadeIn(300, fadeInTimelineParagraph);

		})();
	},

	/**
	 * Add event handler on left, right and escape key to change current image
	 */
	setupKeyboardBinding: function() {

		$(document).keydown(function (event) {
			if (event.which == 37) { 	// left key pressed
				SimpleGallery.leftArrowClicked();
			} else {
				if (event.which == 39) { 	// right key pressed
					SimpleGallery.rightArrowClicked();
				}
			}
		});
	},

	copyToClipBoard: function() {

		var text = $(`${PROJECT} .git-clone`).html();
		var copyText = text.trim();
		copyText = copyText.replaceAll('<br>', '\n');
		navigator.clipboard.writeText(copyText);

		$(`${PROJECT} .git-clone`).fadeOut('fast').promise().done(function() {
			$(`${PROJECT} .git-clone`).html('Copié <i class="fa-solid fa-check"></i>');
			$(`${PROJECT} .git-clone`).fadeIn('fast');

			setTimeout(function() {
				$(`${PROJECT} .git-clone`).html(text);
			}, 1500);
		});

	},

	setupLegends: function() {

		var index = 0;
		
		$(`${LEGENDS} .legend`).each(function () {
			$(this).attr('id', `legend-${index}`);

			$(this).find('h2').addClass('subtitle');

			$(this).find('img').addClass('logo');

			$(this).find('p').addClass('description');

			$(this).find('code')
				.addClass('git-clone')
				.attr('onclick', `copyToClipBoard()`);
			
			index++;
		});

		NB_PROJECTS = index;
	},

	/**
	 * Configure the section for thumbnails
	 * 
	 * Setup thumbnails of images
	 * It clones all images in '.thumbnails' class.
	 * Then it adds an class like .thumbnail-{number}
	 *  where {number} starts from 0 to the number of images
	 * Finally it adds '.cursorPointer' class to all images except the first
	 */
	setupThumbnails: function() {

		$(GALLERY).prepend('<section class="thumbnails"></section>');	// Add a section for thumbnails after the images
		$(`${GALLERY} .thumbnails`).prepend('<div class="horizontal-scroll"></div>');

		const _thumbnailClass = `thumbnail`;	// Class of thumbnail
		var index = 0;

		$(PROJECTS_LEGENDS).each(function () {
			$(THUMBNAILS).append(
				$(this).find('img').clone()
					.addClass(`${_thumbnailClass}-${index}`) // Add class .thumbnails-{index}
					.addClass('thumbnail')
					.click({ class: index }, SimpleGallery.callChangeCurrentImage) 	// on click to a thumbnails, call function to display the new image
			);
			index++;
		});

		$(`${THUMBNAILS} img`).slice(1).addClass('cursorPointer'); // Add cursor clickable to all thumbnails except first
		$(`${THUMBNAILS} img`).first().addClass('shadow-gallery'); // Add shadow on first thumbnail

		THUMBNAIL_SIZE = $(`${THUMBNAILS} img`).first().width();
	},


	/**
	 * Add a section that will contain the title of the current project
	 * Setup the title with attribut from the first legend
	 */
	setupProject: function() {
		$(`${GALLERY}`).prepend('<section class="project">');
	},

	/**
	 * Add left and right arrows to navigate between the images
	 * ! Be sure the section for titles is correctly enabled before !
	 */
	setupArrows: function() {

		$('.thumbnails').after(`
			<nav class="arrow">
				<img class="left" src="./img/projects/left-arrow.png" onclick="SimpleGallery.leftArrowClicked()"/>
				<img class="right" src="./img/projects/right-arrow.png" onclick="SimpleGallery.rightArrowClicked()"/>
			</nav>
		`);	// Insert the arrows
	},

	/**
	 * Get index number from event parameter and call changeMainImage.
	 * This function have to be called from click on thumbnails
	 */
	callChangeCurrentImage: function(event) {
		SimpleGallery.changeCurrentImage(event.data.class);
	},

	/**
	 * Display next image
	 */
	changeCurrentImage: function(newIndex) {

		if (CURRENT_PROJECT_ID != newIndex) {


			const _newThumbnail = `.thumbnail-${newIndex}`;	// Compute new index of .thumbnail-

			const _currentThumbnail = `.thumbnail-${CURRENT_PROJECT_ID}`;	// Compute current index of is .thumbnail-

			CURRENT_PROJECT_ID = newIndex;	// update currentIndex with new value

			SimpleGallery.showCurrentProject();

			$(_currentThumbnail).removeClass('shadow-gallery').removeClass('cursorDefault').addClass('cursorPointer');	// change skin of current thumbnail
			$(_newThumbnail).addClass('shadow-gallery').addClass('cursorDefault').removeClass('cursorPointer'); 		// change skin of new selected thumbnail
		}
	},

	/**
	 * Get index of previous image
	 */
	leftArrowClicked: function() {

		var index = CURRENT_PROJECT_ID - 1;

		if (index < 0) {
			index = NB_PROJECTS - 1;
		}

		SimpleGallery.changeCurrentImage(index);
	},

	/**
	 * Get index of next image
	 */
	rightArrowClicked: function() {

		var index = CURRENT_PROJECT_ID + 1;

		if (index >= NB_PROJECTS) {
			index = 0;
		}

		SimpleGallery.changeCurrentImage(index);
	},

	/**
	 * Display image in default view
	 */
	showCurrentProject: function() {

		const _currentLegend = `#legend-${CURRENT_PROJECT_ID}`;

		$(PROJECT).fadeOut(200).promise().done(function() {
			$(PROJECT).html($(`${_currentLegend}`).html());
			$(PROJECT).fadeIn(200);
		});

		var scrollPosition = CURRENT_PROJECT_ID * THUMBNAIL_SIZE;
		$(`${THUMBNAILS}`).scrollLeft(scrollPosition);
	},

	/**
	 * Fade out navbar after scroll down.
	 * Fade in navbar if scroll to top page. 
	 */
	scrollTechnologiesFunction: function() {

		var scroll = $(window).scrollTop();

		scroll += $(window).height();

		if (true == technologiesAreHide && scroll >= TECHNOLOGIES_TOP) {
			var indexLanguages = 0;
			var indexTools = 0;
			(function showTechnologies() {
				$(`.languages .hide`).eq(indexLanguages++).fadeIn(300, showTechnologies);
			})();
			(function showTechnologies() {
				$(`.tools .hide`).eq(indexTools++).fadeIn(300, showTechnologies);
			})();
			technologiesAreHide = false;
		}
	},
}