const HEADER_HEIGHT = $('header').height(); // The height of the navbar
var headerIsHide = false;

const ROTATION_ANGLE = "15deg";
var avatarIsRotated = false;	// status of avatar: rotated or not

const CONTENT_TITLE = '.content .title';
const AVATAR_IMAGE = '.banner .avatar .img';

const TIMELINE_PARAGRAPHS = $('.timeline .hide');

$(document).ready(function () {

	$(window).scroll(function () {
		YummyYam.scrollHeaderFunction();
	});
	YummyYam.scrollHeaderFunction();	// call function after loading page

	YummyYam.setupAvatarRotations();

	YummyYam.setupStars();

	YummyYam.setupCornerImages();
});

var YummyYam = {

	/**
	 * Add small or large background corner images
	 */
	setupCornerImages: function() {

		var origin = window.location.origin;

		$('.yummy-yam-corner-images').append(`<img class="corner-image bottom-left large" alt="corner image bottom left" src="${origin}/img/theme/corner-left.png">
			<img class="corner-image bottom-right large" alt="corner image bottom right" src="${origin}/img/theme/corner-right.png">`);
	},

	/**
	 * Add stars in titles and paragraphs
	 */
	setupStars: function() {

		$('.list-articles h1').addClass(CONTENT_TITLE);

		// In titles h1
		$(`<p class="star">⚝</p>`).insertBefore(CONTENT_TITLE);
		$(`<p class="star">⚝</p>`).insertAfter(CONTENT_TITLE);
	},

	/**
	 * Setup avatar rotations:
	 * 	- on click on navbar button
	 * 	- on mouse over
	 */
	setupAvatarRotations: function() {

		$(AVATAR_IMAGE).mouseenter(function () {	// mouse entre: rotate avatar
			$(AVATAR_IMAGE).css('rotate', `-${ROTATION_ANGLE}`);
		});

		$(AVATAR_IMAGE).mouseout(function () {	// mouse out: reset avatar rotation
			$(AVATAR_IMAGE).css('rotate', '0deg');
		});

		$('.banner .button').click(function () {	// on click on navbar button
			rotateAvatar();
		});
	},

	/**
	 * Rotate avatar on expend navbar
	 */
	rotateAvatar: function() {

		if (avatarIsRotated) {
			$(AVATAR_IMAGE).css('rotate', '0deg');	// reset avatar rotation
			avatarIsRotated = false;
		} else {
			$(AVATAR_IMAGE).css('rotate', `+${ROTATION_ANGLE}`);	// rotate avatar
			avatarIsRotated = true;
		}
	},

	/**
	 * Fade out navbar after scroll down.
	 * Fade in navbar if scroll to top page. 
	 */
	scrollHeaderFunction: function() {

		const header = $('header');

		var scroll = $(window).scrollTop();

		if (false == headerIsHide && scroll > HEADER_HEIGHT) {
			headerIsHide = true;
			header.fadeOut(500);
		} else {
			if(true == headerIsHide && scroll <= HEADER_HEIGHT) {
				headerIsHide = false;
				header.fadeIn(500);
			}
		}
	},

};