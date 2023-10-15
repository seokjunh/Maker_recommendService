'use client';
import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Import Swiper styles
import 'swiper/css';

const Overlay = ({ nearPlaces, setInfo }) => {
  SwiperCore.use([Navigation, Pagination]);

  return (
    <Swiper spaceBetween={30} slidesPerView={3} navigation loop={true}>
      {nearPlaces.map((place) => {
        return (
          <SwiperSlide key={place.content}>
            <div
              onClick={() => setInfo(place)}
              onMouseOver={() => setInfo(place)}
              onMouseOut={() => setInfo()}
              className="h-[100px] w-[240px] overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div class="bg-gradient-to-br from-mint/80 to-mint/20 shadow-lg">
                <h2 className="mx-2 ml-4">{place.content}</h2>
              </div>
              <section className="ml-4">
                <p>{place.roadAddress}</p>
                <p>
                  약{' '}
                  <span className="text-mint-em">
                    {parseInt(place.distance)}m
                  </span>{' '}
                  거리
                </p>
              </section>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Overlay;
