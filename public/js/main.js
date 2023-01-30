var HEADER_HEIGHT = 0;	// The height of the navbar

var ROTATION_ANGLE = "15deg";
var avatarIsRotated = false;	// status of avatar: rotated or not

$(document).ready(function () {

	HEADER_HEIGHT = $('header').height();

	$(window).scroll(function () {
		scrollFunction();
	});
	scrollFunction();	// call function after loading page

	setupAvatarRotations();
});

/**
 * Setup avatar rotations:
 * 	- on click on navbar button
 * 	- on mouse over
 */
function setupAvatarRotations() {

	$('.avatar-img').mouseenter(function() {	// mouse entre: rotate avatar
		$('.avatar-img').css('rotate', `-${ROTATION_ANGLE}`);
	});
	
	$('.avatar-img').mouseout(function() {	// mouse out: reset avatar rotation
		$('.avatar-img').css('rotate', '0deg');
	});

	$('#navbar-button').click(function() {	// on click on navbar button
		rotateAvatar();
	});
}

/**
 * Rotate avatar on expend navbar
 */
function rotateAvatar() {

	if(avatarIsRotated) {
		$('.avatar-img').css('rotate', '0deg');	// reset avatar rotation
		avatarIsRotated = false;
	} else {
		$('.avatar-img').css('rotate', `+${ROTATION_ANGLE}`);	// rotate avatar
		avatarIsRotated = true;
	}
}

/**
 * Fade out navbar after scroll down.
 * Fade in navbar if scroll to top page. 
 */
function scrollFunction() {

	const header = $('header');

	var scroll = $(window).scrollTop();

	if( scroll > HEADER_HEIGHT ) {
		header.stop().fadeOut(700);
	} else {
		header.stop().fadeIn(700);
	}
}

