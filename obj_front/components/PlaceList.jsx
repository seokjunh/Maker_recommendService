import React from 'react';
import Image from 'next/image';

const PlaceList = ({ name, address, roadAddress, lat, lng, cnt, onClick }) => {
  return (
    <div key={name + address + lat + lng} className="mb-2 w-full">
      <button
        onClick={onClick}
        className="mx-3 w-11/12 rounded-xl border border-mint/60 bg-white from-white to-mint/30 shadow-lg hover:bg-gradient-to-br"
      >
        <div className="mx-auto my-2 flex w-11/12 flex-col items-start justify-between">
          <h2 className="text-[20px] text-mint-em">{name}</h2>
          <section className="flex w-full items-center justify-between">
            <div className="flex flex-col">
              <p>{roadAddress}</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/img/marker.png"
                alt="marker"
                width={15}
                height={15}
                className="inline-block"
              />
              <p>{cnt}</p>
            </div>
          </section>
        </div>
      </button>
    </div>
  );
};

export default PlaceList;
