const slider = () => {
  $('.slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySeed: 1000,
    speed: 500,
    adaptiveHeight: true,
  });
};

window.addEventListener('load', slider);