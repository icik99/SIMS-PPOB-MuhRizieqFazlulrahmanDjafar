import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const SlideBanner = ({ dataBanner }) => {
  return (
    <section>
      <Swiper
        spaceBetween={10} // Menambah jarak antar slide
        slidesPerView={4} // Default 4 slide per view
        loop={true}
        grabCursor={true}
        breakpoints={{
          1024: {
            slidesPerView: 4, // 4 slides pada layar besar
          },
          768: {
            slidesPerView: 3, // 3 slides pada tablet
          },
          414: {
            slidesPerView: 2, // 1 slide pada layar kecil
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
                className="w-full h-auto max-w-[270px] mb-2 rounded-md object-cover" // Mengatur gambar agar responsif
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SlideBanner;
