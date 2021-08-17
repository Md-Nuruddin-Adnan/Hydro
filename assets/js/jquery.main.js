/*
	// Updated April 18, 2020

	1.1 Hero Height
	1.2 Header Navigation Animation
	1.3 Text Rotation
	1.4 Hero Slogan
	1.5 YouTube Video Background
	1.6 Parallax
	1.7 Scrolling
	1.8 Magnific Popup
	1.9 Flexslider
	1.0 Quote Slider
	1.11 Contact Form
	1.12 Counter
*/

(function($){

	"use strict";

	$(document).ready(function(){

/* 	1.1 Hero Height
	Controls the window height of the hero class */
		var windowHeight = $(window).height();

		$('.hero').height( windowHeight );

		$(window).resize(function() {

			var windowHeight = $(window).height();
			$('.hero').height( windowHeight );

		});

/* 	1.2 Header Navigation Animation
	Controls the animation of the header nav */
		var $header = $( '#section-header' );

		$( '.waypoint-hero' ).each( function(i) {

			/* needed vars */
			var $this = $( this ),
				animClassDown = $this.data( 'animateDown' ),
				animClassUp = $this.data( 'animateUp' );

			$this.waypoint(function(direction) {

				if( direction === 'down' && animClassDown ) {
					$header.attr('class', 'section-header-menu ' + animClassDown );
				}
				else if( direction === 'up' && animClassUp ){
					$header.attr('class', 'section-header-menu ' + animClassUp );
				}

			}, { offset: '-1px' } );

		});

/* 	1.3 Text Rotation
	Controls the scrolling/word rotation in the "title-hero" class */
		var word_rotator = function() {

			// Modify, add, or remove the sentences you want to display in the hero section.
			var rotator_words = [
				'Make the Jump to Hydro-drive', // First sentence in .title-hero
				'Super-size Your Company\'s Presence', // Second sentence in .title-hero
				'Take Your Vision to New Heights', // Third sentence in .title-hero
				'Energize Your Company with Hydro' // Fourth sentence in .title-hero
			] ,
			counter = 0;

			setInterval(function() {
			$(".title-hero").fadeOut(function(){
					$(this).html(rotator_words[counter=(counter+1)%rotator_words.length]).fadeIn();
				});
			}, 3000 ); // Change this value to a lower or higher number to decrease/increase text rotator speed.
		}

		word_rotator();

/* 	1.4 Hero Slogan
	Shows the slogan in the "container-hero" class */
		$(window).load(function() {

			function show_slogan() {
				$('.container-hero').animate({ opacity : 1 });
			}

			var execute_slogan = setTimeout ( show_slogan , 800 );

		});

/* 	1.5 YouTube Video Background
	Controls the YouTube video player as a background */
		if( !device.tablet() && !device.mobile() ) {

			$(".player").mb_YTPlayer();

		} else {

			$('.hero').addClass('hero-poster-image');
			$('#section-parallax-2').addClass('parallax-banner-2');
			$('#section-parallax-3').addClass('parallax-banner-3');
			$('#section-counter').addClass('parallax-banner-6');
			$('#section-contact').addClass('parallax-banner-5');

			$(".player").hide();

		}

/* 	1.6 Parallax
	Adds a parallax effect for PCs */
		if( !device.tablet() && !device.mobile() ) {

			$('.parallax-banner-1').parallax("50%", 0.4);
			$('.parallax-banner-2').parallax("50%", 0.4);
			$('.parallax-banner-3').parallax("50%", 0.4);
			$('.parallax-banner-4').parallax("50%", 0.4);
			$('.parallax-banner-5').parallax("50%", 0.4);
			$('.parallax-banner-6').parallax("50%", 0.4);

			/* Fix for issues with fixed backgrounds on mobile */
			$('.section-parallax').each(function(index, element) {
				$(this).addClass('fixed');
			});

		}

/* 	1.7 Scrolling
	Scrolls to the main, sections, and top */
		$(function () {
			$('.smooth-scroll').bind('click.smooth-scroll', function (e) {
				e.preventDefault();

				var target = this.hash,
					$target = $(target);

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top - 0
				}, 900, 'swing', function () {
					window.location.hash = target;
				});
			});
		});

		$('.logo a[href*=#]').click( function(event) {

			event.preventDefault();

			$('#header-menu-navigation a').removeClass('selected');
			$('#header-menu-navigation a:first-child').addClass('selected');

		});

		$('.waypoint-nav').each(function() {

			$(this).waypoint( function( direction ) {

				if( direction === 'down' ) {

					var containerID = $(this).find('section:first').attr('id');

					$('#header-menu-navigation a').removeClass('selected');
					$('#header-menu-navigation a[href*=#'+containerID+']').addClass('selected');

				}

			} , { offset: '150px' } );

			$(this).waypoint( function( direction ) {

				if( direction === 'up' ) {

					var containerID = $(this).find('section:first').attr('id');

					$('#header-menu-navigation a').removeClass('selected');
					$('#header-menu-navigation a[href*=#'+containerID+']').addClass('selected');

				}

			} , { offset: function() { return -$(this).height() + 155; } });

		});

/* 	1.8 Magnific Popup
	Popup for images, etc */
		$('.portfolio-popup').magnificPopup({
			type: 'image',
			removalDelay: 500,
			callbacks: {
			beforeOpen: function() {
				   this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				   this.st.mainClass = 'mfp-zoom-in';
				}
			},
			closeOnContentClick: true,
			fixedContentPos: false
		});

		$('.portfolio-popup-video').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-zoom-in',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

/* 	1.9 Flexslider
	With video */

		/*$(window).load(function(){

			// Vimeo API nonsense
			var player = document.getElementById('player_1');
			$f(player).addEvent('ready', ready);

			function addEvent(element, eventName, callback) {
				(element.addEventListener) ? element.addEventListener(eventName, callback, false) : element.attachEvent(eventName, callback, false);
			}

			function ready(player_id) {
				var froogaloop = $f(player_id);

				froogaloop.addEvent('play', function(data) {
				  $('.flexslider').flexslider("pause");
				});

				froogaloop.addEvent('pause', function(data) {
				  $('.flexslider').flexslider("play");
				});
			}

			$('.flexslider').fitVids().flexslider({
				animation: "slide",
				controlNav: "thumbnails",
				smoothHeight: true,
				start: function(slider){
					$('body').removeClass('loading');
				},
				before: function(slider){
					$f(player).api('pause');
				}
			});

		}); */

		// Without video
		$(window).load(function(){

			$('.flexslider').flexslider({

				animation: "slide",
				controlNav: "thumbnails",
				smoothHeight: true,
				start: function(slider){
					$('body').removeClass('loading');
				}

			});

		});

/* 	1.10 Quote Slider
	Slides quotes in flexslider */
		$("#avatarSlider").flexslider({
			animation: "fade",
			directionNav:false,
			controlNav:false,
			smoothHeight: true,
			animationLoop:true,
			slideshowSpeed: 3000,
			slideToStart: 0,
		});

		$("#quoteSlider").flexslider({
			animation: "fade",
			directionNav:true,
			controlNav:false,
			smoothHeight: true,
			animationLoop:true,
			sync: "#avatarSlider",
			slideshowSpeed: 3000,
			slideToStart: 0,
		});

/* 	1.11 Contact Form
	Contact form */

//$(function(){

	// Contact form validation
	$('#contact-form').submit(function(e) {
		e.preventDefault();

		$.ajax({
			url: 'assets/form/contact.php',
			data: 'name='+ escape($('#contactName').val()) +'&email=' + escape($('#contactEmail').val()) + '&phone=' + escape($('#contactPhone').val()) + '&message='+escape($('#contactMessage').val()),
			dataType: 'json',
			success: function(resp) {
				$('#contactName, #contactEmail, #contactMessage').removeClass('error');

				if(resp.success == 1){
					$('#modalContent').text(resp.message);
					$('#modal, #modalOverlay').fadeIn(500);

					$('#contactName, #contactEmail, #contactMessage, #contactPhone').val('');
				}
				else {
					if(resp.errorCode == 1){
						$('#contactName').addClass('error').focus();
					}
					else if(resp.errorCode == 2){
						$('#contactEmail').addClass('error').focus();
					}
					else if(resp.errorCode == 3){
						$('#contactMessage').addClass('error').focus();
					}
				}
			}
		});

		return false;
	});

	// Modal popup for contact form
	$('#modal').on('click touchstart', function(e){
		e.stopPropagation();
	});

	$('#modalClose, #modalOverlay').on('click touchstart', function(){
		$('#modal, #modalOverlay').fadeOut(500);
	});

//});

/* 	1.12 Counter
	Counter for milestones */
		$('#section-counter').waypoint(function(direction) {

			if( direction === 'down' ) {

				$('.counter').each(function(){

					var counter = $(this).data('counter');

					if( !$(this).find('.count').hasClass('animated') ) {

						$(this).find('.count').countTo({
							from: 0,
							to: counter,
							speed: 3000,
							refreshInterval: 100,
							onComplete: function() {
								$(this).addClass('animated');
							}
						});

					}

				});

			}

		} , { offset: '50%' } );

/* 	1.12 Scrolling Animation
	Scrolling animation for various page sections */

		// About section
		function animate_about() {

			$('.box-about').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					el.animate({opacity: 1} , 600 );
				},  k * 50 );

			});

		}

		// Team members section
		function animate_member() {

			$('.member-box').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					el.animate({opacity: 1} , 600 );
				},  k * 50 );

			});

		}

		// Services section
		function animate_service() {

			$('.box-fade').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					el.animate({opacity: 1} , 600 );
				},  k * 50 );

			});

		}

		// Portfolio section
		function animate_portfolio() {

			$('.section-portfolio .portfolio-box').css('opacity' , 0).each(function( k ) {

				var el = $(this);

				$(this).waypoint(function(direction) {

					if( direction === 'down' && !$(this).hasClass('animated') ) {

						setTimeout ( function () {
							el.animate({opacity: 1} , 600 );
						}, k * 50 );

					}

				}, { offset: '80%' } );

			});

		}

		// Call to action section
		function animate_cta() {

			$('.section-call-to-action').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					el.animate({opacity: 1} , 600 );
				},  k * 50 );

			});

		}

		// Counter section
		function animate_counter() {

			$('.counter-box').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					el.animate({opacity: 1} , 600 );
				},  k * 50 );

			});

		}

		// Client section
		function animate_clients() {

			$('.client-logo').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					el.animate({opacity: 1} , 600 );
				},  k * 50 );

			});

		}

		function animate_sections() {

			$('.wrap').waypoint(function(direction) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-about header').find('.section-title').animate({ opacity: 1 });
					}, 200 );

					setTimeout ( function () {
							$('#section-about header').find('.section-text').animate({ opacity: 1 });
					}, 600 );

					setTimeout( animate_about , 1000 );

					$(this).addClass('animated');

				}

			} , { offset: '95%' } );

			// First parallax section
			$('#section-parallax-2').waypoint(function(direction) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-parallax-2 header').find('.parallax-title').animate({ opacity: 1 });
					}, 200 );

					setTimeout ( function () {
							$('#section-parallax-2 header').find('.parallax-text').animate({ opacity: 1 });
					}, 600 );

					$(this).addClass('animated');

				}

			} , { offset: '95%' } );

			$('#section-services').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-services header').find('.section-title').animate({ opacity: 1 });
					}, 200 );

					setTimeout ( function () {
							$('#section-services header').find('.section-text').animate({ opacity: 1 });
					}, 600 );

					setTimeout( animate_service , 1000);

					$(this).addClass('animated');

				}

			} , { offset: '70%' } );

			$('#section-team').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-team header').find('.section-title').animate({ opacity: 1 });
					}, 200 );

					setTimeout ( function () {
							$('#section-team header').find('.section-text').animate({ opacity: 1 });
					}, 600 );

					setTimeout( animate_member , 1000);

					$(this).addClass('animated');

				}

			} , { offset: '95%' } );

			$('#section-portfolio').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-portfolio header').find('.section-title').animate({ opacity: 1 }).addClass('animated');
					}, 200 );

					setTimeout ( function () {
							$('#section-portfolio header').find('.section-text').animate({ opacity: 1 }).addClass('animated');
					}, 600 );

					setTimeout( animate_portfolio , 1000);

					$(this).addClass('animated');

				}

			} , { offset: '80%' } );


			$('#section-call-to-action').waypoint(function(direction) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-call-to-action header').find('.parallax-cta-title').animate({ opacity: 1 }).addClass('animated');
					}, 200 );

					setTimeout ( function () {
							$('#section-call-to-action header').find('.parallax-cta-text').animate({ opacity: 1 }).addClass('animated');
					}, 600 );

					setTimeout( animate_portfolio , 1000);

					$(this).addClass('animated');

				}

			} , { offset: '95%' } );

			$('#section-counter').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-counter header').find('.parallax-title').animate({ opacity: 1 });
					}, 200 );

					setTimeout ( function () {
							$('#section-counter header').find('.parallax-text').animate({ opacity: 1 });
					}, 600 );

					setTimeout( animate_counter , 1000);

					$(this).addClass('animated');

				}

			} , { offset: '70%' } );

			$('#client-section').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animate_clients , 300 );
					
					$(this).addClass('animated');

				}

			} , { offset: '90%' } );

			$('#section-clients').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-clients header').find('.section-title').animate({ opacity: 1 });
					}, 200 );

					setTimeout ( function () {
							$('#section-clients header').find('.section-text').animate({ opacity: 1 });
					}, 600 );

					setTimeout ( function () {
							$('.client-testimonials').animate({ opacity: 1 });
					}, 600 );

					$(this).addClass('animated');

				}

			} , { offset: '80%' } );

			$('#section-contact').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout ( function () {
							$('#section-contact header').find('.parallax-title').animate({ opacity: 1 });
					}, 200 );

					setTimeout ( function () {
							$('#section-contact header').find('.parallax-text').animate({ opacity: 1 });
					}, 600 );

					setTimeout ( function () {
							$('.contact-wrap').animate({ opacity: 1 });
					}, 600 );

					$(this).addClass('animated');

				}

			} , { offset: '80%' } );

		}

		// No animation for IE8 and mobile devices
		if( !device.tablet() && !device.mobile() && Modernizr.csstransitions ) {
			animate_sections();
		}

	});
	
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// Set the options for the current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);

			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,				// Number the element should start at
		to: 0,					// Number the element should end at
		speed: 1000,			// Time to count between the target numbers
		refreshInterval: 100,	// Time intervals of element updates
		decimals: 0,			// Number of decimal places
		formatter: formatter,	// Format the value prior to rendering
		onUpdate: null,
		onComplete: null
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}

})(jQuery);