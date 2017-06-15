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

  // START OF: sliders =====
  //all the sliders are configurated via attributes in the markup
  (function() {
    var $sliders = $('.js-slider');
    $sliders.on('init', function(slick){
      $('.cover__slider__dots')
        .wrap('<div class="cover__slider__dots_container"></div>');
    });

    $sliders.slick();
    $('.slider-for').slick();
    $('.slider-nav').slick();
  })();
  // ===== END OF: sliders

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

  // START OF: Galaxy canvas animation =====
  var galaxy = (function(){
    var WIDTH, HEIGHT, canvas, con, g;
    var pxs = [];
    var rint = 50;

    var windowSize = function() {
      WIDTH = $('.galaxy-wrapper').innerWidth();
      HEIGHT = $('.galaxy-wrapper').innerHeight();
      canvas = $('#galaxy');
      canvas.attr('width', WIDTH).attr('height', HEIGHT);
    };

    windowSize();

    $(window).resize(function() {
      windowSize();
    });

    con = canvas[0].getContext('2d');
    for (var i = 0; i < 40; i++) {
      pxs[i] = new Circle();
      pxs[i].reset();
    }
    requestAnimationFrame(draw);

    function draw() {
      con.clearRect(0, 0, WIDTH, HEIGHT);
      con.globalCompositeOperation = "lighter";
      for (var i = 0; i < pxs.length; i++) {
        pxs[i].fade();
        pxs[i].move();
        pxs[i].draw();
      }
      requestAnimationFrame(draw);
    }

    function Circle() {
      this.s = {
        ttl    : 15000,
        xmax   : 3,
        ymax   : 2,
        rmax   : 16,
        rt     : 1,
        xdef   : 960,
        ydef   : 540,
        xdrift : 4,
        ydrift : 4,
        random : true,
        blink  : true
      };
      this.reset = function() {
        this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
        this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
        this.r = ((this.s.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
        this.dy = (Math.random() * this.s.ymax) * (Math.random() < 0.5 ? -1 : 1);
        this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random() + 1;
        this.stop = Math.random() * 0.2 + 0.4;
        this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
        this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
      };
      this.fade = function() {
        this.rt += this.s.rt;
      };
      this.draw = function() {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt * -1;
        else if (this.rt >= this.hl) this.reset();
        var newo = 1 - (this.rt / this.hl);
        con.beginPath();
        con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        con.closePath();
        var cr = this.r * newo;
        g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        g.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        g.addColorStop(this.stop, 'rgba(255,255,255,' + (newo * 0.2) + ')');
        g.addColorStop(1.0, 'rgba(255,255,255,0)');
        con.fillStyle = g;
        con.fill();
      };
      this.move = function() {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
      };
      this.getX = function() {
        return this.x;
      };
      this.getY = function() {
        return this.y;
      };
    };
  }());
  // END OF: Galaxy canvas animation =====

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
  galaxy;
});
// == END OF CEPAVE JS ==
