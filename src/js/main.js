// == START OF CEPAVE JS ==
window.addEventListener('DOMContentLoaded', function (){
	'use strict';



	// START OF: webfont loader  =====
	var fonts = (function(){
		var families = ['Playfair+Display:400,400italic,700,700italic:latin', 'Montserrat:700,400:latin'];

		function load() {
			WebFont.load({
				google: {
					families: families
				}
			});
		}
		return {
			load: load
		}
	}());
	// ===== END OF: webfont loader

	// START OF: filterizr =====
	var filterizr = (function(){
		var bind = function () {
			var $filters = $('.js-filtering-button');
			$filters.on('click', function(event) {
				event.preventDefault();

				$filters.removeClass('button--black').addClass('button--gray');
				$(this).addClass('button--black');
			});
		};

		var init = function () {
			//bind filtering buttons color change:
			bind();

			//init plugin:
			//Default options
			var options = {
				animationDuration: 0.5, //in seconds
				filter: 'all', //Initial filter
				callbacks: {
					onFilteringStart: function() { },
					onFilteringEnd: function() { },
					onShufflingStart: function() { },
					onShufflingEnd: function() { },
					onSortingStart: function() { },
					onSortingEnd: function() { }
				},
				delay: 0, //Transition delay in ms
				delayMode: 'progressive', //'progressive' or 'alternate'
				easing: 'ease-out',
				filterOutCss: { //Filtering out animation
					opacity: 0,
					transform: 'scale(0.75)'
				},
				filterInCss: { //Filtering in animation
					opacity: 1,
					transform: 'scale(1)'
				},
				layout: 'sameSize', //See layouts
				selector: '.filtr-container',
				setupControls: true
			};
			var filterizd = $('.filtr-container').filterizr(options);
			filterizd.filterizr('setOptions', options);
		};
		return {
			init: init
		}
	}());
	// ===== END OF: filterizr


	fonts.load();

	if($('.filtr-container').length > 0){
		filterizr.init();
	}

});
// == END OF CEPAVE JS ==