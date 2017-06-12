// == START OF CEPAVE JS ==
window.addEventListener('DOMContentLoaded', function (){
  'use strict';

  // Start OF: Scroll show/hide navbar  =====
  $(window).scroll(function(){
    if ($(this).scrollTop() > 70) {
      hideNav();
    } else {
      showNav();
    }
  });

  function hideNav() {
    $("[data-nav-status='toggle']").addClass('is-scroll');
  };
  function showNav() {
    $("[data-nav-status='toggle']").removeClass('is-scroll');
  };
  // END OF: Scroll show/hide navbar  =====

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

  // START OF: content changer =====
  var contentChanger = (function(){
    var $contentTrigger = $('.js-content-trigger');
    var $contentBox = $('.js-content-box');
    var slidingTime = 400;
    var bind = function () {
      $contentTrigger.on('click', function(event) {
        event.preventDefault();
        var contentAttr = $(this).attr('data-content-index');
        $contentTrigger.removeClass('state-active');
        $(this).addClass('state-active');
        $contentBox.slideUp(slidingTime);
        setTimeout(function(){
          $('.js-content-box[data-content-index="' + contentAttr +'"]').slideDown(slidingTime);
        }, slidingTime/2);
      });
    }
    return {
      bind: bind
    }
  }());
  // ===== END OF: content changer

  fonts.load();
  contentChanger.bind();
  if($('.filtr-container').length > 0){
    filterizr.init();
  }

});
// == END OF CEPAVE JS ==
