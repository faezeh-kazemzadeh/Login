import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./hero.css";
import { hero } from "../../data/data";
// Install Swiper modules
// SwiperCore.use([Autoplay, Navigation]);
export default function Hero() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {hero.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="swiper-slide-content min-h-96 max-h-96 w-full grid grid-cols-2"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="col-span-2 xl:col-span-1 "></div>
              <div className="col-span-2 xl:col-span-1 flex flex-col justify-center gap-4 items-center">
                <h2 className="font-bold text-3xl">{item.title}</h2>
                <p>{item.description}</p>
                <Link
                  to={item.button.url}
                  className="w-40 bg-slate-700 text-slate-200 hover:bg-slate-600 p-3 rounded-lg uppercase font-semibold"
                >
                  {item.button.text}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
