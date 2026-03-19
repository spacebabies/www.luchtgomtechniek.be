import Swiper, { Navigation } from 'swiper';

export function initSwiper() {
    new Swiper('.swiper', {
    modules: [Navigation],
    slidesPerView: "auto",
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    rewind: true
  });

}
