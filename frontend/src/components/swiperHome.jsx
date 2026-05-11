import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiperHome.css';

export const SwiperHome = () => {
  const dataSlider = [
    { id: 1, src: "/img/carousel 3.jpeg", title: "Waspada Penipuan" },
    { id: 2, src: "/img/carousel 1.png", title: "Seleksi Magang Jepang" },
    { id: 3, src: "/img/carousel 2.png", title: "Media Informasi" },
    { id: 4, src: "/img/carousel 4.png", title: "Pelayanan Disnakertrans" },
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        slidesPerView={1} // Default 1 slide untuk mobile
        centeredSlides={true}
        loop={true}
        autoplay={{ 
          delay: 4000, // 4 detik agar user sempat membaca teks banner
          disableOnInteraction: false 
        }}
      >
        {dataSlider.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="card-slider">
              <img src={item.src} alt={item.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};