(function ($) {

	new WOW().init();

	jQuery(window).load(function() {
		jQuery("#preloader").delay(100).fadeOut("slow");
		jQuery("#load").delay(100).fadeOut("slow");
	});


	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		// share-bar-ribbon class toggle
		if($(".share-bar-ribbon").offset().top > $("#venue").offset().top - $(".share-bar-ribbon").outerHeight()){
    			$(".share-bar-ribbon").removeClass('share-bar-ribbon--dark').addClass('share-bar-ribbon--light');
    		}
    		else{
    		 	$(".share-bar-ribbon").removeClass('share-bar-ribbon--light').addClass('share-bar-ribbon--dark');
    		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {

		$('.navbar-custom li a').on('click', function(event) {

			if( $(this).is('a:not([href^="#"])') || $(this).attr("href") == '#' ) {
	     return;
	    }
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});

		$('.page-scroll a').on('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});

	});

})(jQuery);
