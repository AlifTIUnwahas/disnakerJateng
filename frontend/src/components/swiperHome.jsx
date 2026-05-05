import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import './swiperHome.css';

export const SwiperHome = () => {
  const dataSlider = [
    { id: 1, src: "/img/carousel 3.jpeg"},
    { id: 2, src: "/img/carousel 1.png"},
    { id: 3, src: "/img/carousel 2.png"},
    { id: 4, src: "/img/carousel 4.png"},
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={'auto'}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000 }}
        className="mySwiper"
      >
        {dataSlider.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="card-slider">
              <img src={item.src} alt={item.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <span></span>
    </div>
  );
};
export default SwiperHome;