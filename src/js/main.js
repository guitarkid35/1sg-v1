// == START OF 1SG JS ==
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
  fonts.load();
});

// ===== START OF WOW =====
new WOW().init();
// ===== END OF WOW =====

// == END OF 1SG JS ==

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

// == START OF MENU slider ==
$(window).on("scroll",function(){
  var scrollDis = $(window).scrollTop();
  var $header = $(".js-header");
  if(scrollDis > 80){
    $header.addClass("is-show");
  }
  else{
    $header.removeClass("is-show");
  }
})
// == END OF MENU slider ==

// == START OF MENU mobile ==
function openNav() {
  document.getElementById("mobile-close").style.width = "150px";
  document.getElementById("mobile-nav").style.opacity = "0.7";
  // var element = document.getElementById("mobile-nav");
  // element.classList.remove("is-show");
}

function closeNav() {
  document.getElementById("mobile-close").style.width = "0";
  document.getElementById("mobile-nav").style.opacity = "1";
}

// == END OF MENU mobile ==

