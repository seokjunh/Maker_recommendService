'use client';
import React, { useState } from 'react';
import addBookmarkPlace from '@/utils/addBookmarkPlace';

import PlaceModal from './modal/placeModal';

const SearchedList = ({
  code,
  name,
  roadAddress,
  address,
  lat,
  lng,
  onMouseOver,
  onMouseOut,
}) => {
  const [hasPlace, setHasPlace] = useState('등록하기!');
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setHasPlace('등록하기!');

    setModalVisible(true);
  };

  const closeModal = () => {
    setHasPlace('등록하기!');
    setModalVisible(false);
  };

  const addPlace = () => {
    addBookmarkPlace(code, name, roadAddress, address, lat, lng, setHasPlace);
  };

  return (
    <div key={`${name} - ${address} - ${lat} - ${lng}`}>
      {modalVisible && (
        <PlaceModal
          hasPlace={hasPlace}
          roadAddress={roadAddress}
          closeModal={closeModal}
          name={name}
          onClick={addPlace}
        />
      )}
      <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <button onClick={showModal} className="w-full hover:underline">
          <h4 className="my-0 py-0 text-[14px]">{name}</h4>
          <p className="my-0 py-0 text-[12px]">{address}</p>
        </button>
      </div>
    </div>
  );
};

export default SearchedList;
