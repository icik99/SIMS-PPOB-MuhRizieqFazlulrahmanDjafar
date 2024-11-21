import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const SlideBanner = ({ dataBanner }) => {
  return (
    <section>
      <Swiper
        spaceBetween={10} 
        slidesPerView={4} 
        loop={true}
        grabCursor={true}
        breakpoints={{
          1024: {
            slidesPerView: 4, 
          },
          768: {
            slidesPerView: 3, 
          },
          414: {
            slidesPerView: 2, 
          },
        }}
      >
        {Object.values(dataBanner).map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex justify-start items-center">
              <img
                src={item?.banner_image}
                alt={item?.banner_name}
                loading="lazy"
                className="w-full h-auto max-w-[270px] mb-2 rounded-md object-cover" 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SlideBanner;
