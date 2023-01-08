var HEADER_HEIGHT = 0;

$(document).ready(function () {

	HEADER_HEIGHT = $('header').height();

	$(window).scroll(function () {
		scrollFunction();
	});


});

function scrollFunction() {

	const header = $('header');

	var scroll = $(window).scrollTop();

	if( scroll > HEADER_HEIGHT ) {
		header.stop().fadeOut(700);
	} else {
		header.stop().fadeIn(700);
	}
}

