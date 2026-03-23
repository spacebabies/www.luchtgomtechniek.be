import Swiper, { Navigation } from 'swiper';

export function initSwiper(classname) {
    new Swiper(classname, {
    modules: [Navigation],
    slidesPerView: "auto",
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    rewind: true
  });

}
