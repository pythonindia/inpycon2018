(function ($) {

	new WOW().init();

	jQuery(window).load(function() {
		jQuery("#preloader").delay(100).fadeOut("slow");
		jQuery("#load").delay(100).fadeOut("slow");
	});


	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar .container").css("width","1170px");
			$("#logo").css("display","inline-block");
			$("#logo").css("float","left");
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar .container").css("width","970px");
			$("#logo").css("display","none");
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {

		$('.nav li a').on('click', function(event) {

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
