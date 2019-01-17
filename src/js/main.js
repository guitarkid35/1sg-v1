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

  // ===== START OF WOW =====
  new WOW().init();
  // ===== END OF WOW =====

  // START OF: sliders =====
  //all the sliders are configurated via attributes in the markup
  (function() {
    var $sliders = $('.js-slider');
    $sliders.slick();
    $('.slider-for').slick();
    $('.slider-nav').slick();
  })();
  // ===== END OF: sliders

  // Start OF: Scroll show/hide navbar  =====
  var navigation = (function(){
    var bind = function () {
      var currentTop = $(window).scrollTop();
      $(window).scroll(function () {
        var currentTop = $(this).scrollTop();
        var timer = window.setTimeout(function() {
          if (currentTop > 70 || $('body').hasClass('contact')) {
            $("[data-nav-status='toggle']").addClass('is-show');
          } else {
            $("[data-nav-status='toggle']").removeClass('is-show');
            $("[data-nav-status='toggle']").removeClass('is-default');
          };
        }, 200);
      });
      if (currentTop > 70 || $('body').hasClass('contact')) {
        $("[data-nav-status='toggle']").addClass('is-default');
        console.log('has contact');
      };
    };
    return {
      bind: bind
    }
  }());
  // END OF: Scroll show/hide navbar  =====

  // START OF: filterizr =====
  var filterizr = (function(){
    var bind = function () {
      var $filters = $('.js-filtering-button');
      $filters.on('click', function(event) {
        event.preventDefault();

        $filters.removeClass('state-active').addClass('button--gray');
        $(this).addClass('state-active');
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
  // ===== END OF: filterizr =====

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
  };
  navigation.bind();
});
// == END OF CEPAVE JS ==

// == START OF BACK TO TOP ==
$(function(){
  $('#BackTop').click(function(){ 
    $('html,body').animate({scrollTop:0}, 333);
  });
  $(window).scroll(function() {
    if ( $(this).scrollTop() > 300 ){
      $('#BackTop').fadeIn(222);
    } else {
      $('#BackTop').stop().fadeOut(222);
    }
  }).scroll();
});
// == END OF BACK TO TOP ==

// == START OF parallax ==
$(".parallax, [data-paroller-factor]").paroller({
  factor: -0.25,            // multiplier for scrolling speed and offset
  factorXs: 0.1,           // multiplier for scrolling speed and offset
  type: 'foreground',     // background, foreground
  direction: 'vertical' // vertical, horizontal
});
$(".parallax-h, [data-paroller-factor]").paroller({
  factor: -0.1,            // multiplier for scrolling speed and offset
  factorXs: -0.1,           // multiplier for scrolling speed and offset
  type: 'foreground',     // background, foreground
  direction: 'horizontal' // vertical, horizontal
});
// == END OF parallax ==

