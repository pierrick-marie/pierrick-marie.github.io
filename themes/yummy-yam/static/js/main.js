var HEADER_HEIGHT = 0;	// The height of the navbar

$(document).ready(function () {

	HEADER_HEIGHT = $('header').height();

	$(window).scroll(function () {
		scrollFunction();
	});
	scrollFunction();	// call function after loading page
});

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

