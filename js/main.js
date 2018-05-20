$.fn.isOnScreen = function(shift) {
  if (!shift) {
    shift = 0;
  }
  var viewport = {};
  viewport.top = $(window).scrollTop();
  viewport.bottom = viewport.top + $(window).height();
  var bounds = {};
  bounds.top = this.offset().top + shift;
  bounds.bottom = bounds.top + this.outerHeight() - shift;
  return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

var _bxInnit = function(sliderName, options, flag) {

  sliderName = sliderName || ".bxSlider";
  options = options || {};

  var breakPoint = 991;
  var init = {
    sliderActive: false,
  }

  var slider;


  var sliderClone = $(sliderName).clone();

  function createSlider() {
    slider = $(sliderName).bxSlider(options);
    return true;
  }
  if (flag) {

    if (window.innerWidth <= breakPoint) {
      createSlider();
      init.sliderActive = true;
    }
    $(window).resize(function() {
      if (window.innerWidth > breakPoint) {
        if (init.sliderActive) {
          slider.destroySlider();
          init.sliderActive = false;
          slider.replaceWith(sliderClone.clone());
        }
      }
      if (window.innerWidth <= breakPoint) {
        if (!init.sliderActive) {
          createSlider();
          init.sliderActive = true;
        }
      }
    });
  } else {
    createSlider();
    init.sliderActive = false;

  }
  var a, b;
  a = 1;
  b = 0;
  $(window).on('scroll', function() {
    if (init.sliderActive == true) {
      if (slider.isOnScreen()) {
        b = 1;
      } else {
        b = 0;
      }
      if (a == b) {
        slider.startAuto();
      } else {
        slider.stopAuto();
      }
    }
  });
}
$(document).ready(function () {
	_bxInnit('.bxslider', {
      adaptiveHeight: false,
      swipeThreshold: 40,
      controls: false,
      auto: true,
      pause: 7000,
      autoHover: true,
    },
    true
  );

	var $scrollTrig = $('.to_form');
	var $form = $('form');
	$scrollTrig.on('click', function () {
		$('html,body').animate({scrollTop: $form.offset().top}, 1000);
	});


	var video = $('video')[0];
	var cover = $('.video__cover');
	var play = $('.play');
	play.on('click', function(){
		video.play();
		play.addClass('hide');
		cover.addClass('hide');
	});

	video.addEventListener('ended',function(){
		play.removeClass('hide');
		cover.removeClass('hide');
	})


});