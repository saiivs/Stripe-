// Hime header bottom slider

$('.header-bottom-slider').owlCarousel({
  nav: false,
  loop: true,
  dots: false,
  center: false,
  autoplay: true,
     autoplayTimeout: 1500,
     autoplaySpeed: 1500,
  smartSpeed: 2500,
   fluidSpeed:true,
  responsive: {
    0: {
      items: 2
    },
    768: {
      items: 3
    },
    1199: {
      items: 4
    }
  }
});


// Sticky menu

(function($) {
	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 56
	});

	// Collapse Navbar
	var navbarCollapse = function() {
		if ($("#mainNav").offset().top > 0) {
		  $("#mainNav").addClass("navbar-shrink");
		} else {
		  $("#mainNav").removeClass("navbar-shrink");
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);
})(jQuery);


// Sticky menu

(function($) {
  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 50) {
      $("#mainNav").addClass("mobile-navbar-shrink");
    } else {
      $("#mainNav").removeClass("mobile-navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
})(jQuery);


// wow animation
new WOW().init();

// mobile menu

function openNav() {
  document.getElementById("myNav").classList.add('mobile-menu-show');
}

function closeNav() {
  document.getElementById("myNav").classList.remove('mobile-menu-show');
}




