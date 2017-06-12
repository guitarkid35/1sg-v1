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

  // Start OF: Scroll show/hide navbar  =====
  var navigation = (function(){
    var currentScroll = $(window).scrollTop();
    if (currentScroll > 70) {
      defaultNav();
      $(window).scroll(function(){
        if ($(this).scrollTop() > 70) {
          defaultNav();
        } else {
          hideNav();
          removedefaultNav();
        }
      });
    } else {
      removedefaultNav();
      $(window).scroll(function(){
        if ($(this).scrollTop() > 70) {
          showNav();
        } else {
          hideNav();
          removedefaultNav();
        }
      });
    }
    function showNav() {
      $("[data-nav-status='toggle']").addClass('is-show');
    };
    function hideNav() {
      $("[data-nav-status='toggle']").removeClass('is-show');
    };
    function defaultNav() {
      $("[data-nav-status='toggle']").addClass('is-default');
    };
    function removedefaultNav() {
      $("[data-nav-status='toggle']").removeClass('is-default');
    };

  }());
  // END OF: Scroll show/hide navbar  =====

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
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  };
  function realFunc(){
    navigation;
  }
  window.addEventListener('scroll',debounce(realFunc,500));
  window.addEventListener('scroll',realFunc);
  contentChanger.bind();
  if($('.filtr-container').length > 0){
    filterizr.init();
  }

});
// == END OF CEPAVE JS ==
