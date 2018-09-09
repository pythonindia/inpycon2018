$(document).ready(function () {
    $('div#banner-text > h1').delay(400).fadeIn(1000);
    $('div#banner-text > h2').delay(1400).fadeIn(1000);
});

$(window).scroll(function() {
	if ($(".navbar").offset().top > 50) {
		$(".navbar .container").css("width","1170px");
		$(".index-logo").css("display","inline-block");
		$(".index-logo").css("float","left");
		$(".navbar-fixed-top").addClass("top-nav-collapse");
	} else {
		$(".navbar .container").css("width","970px");
		$(".index-logo").css("display","none");
		$(".navbar-fixed-top").removeClass("top-nav-collapse");
	}
});
