import React from 'react';

const placeModal = ({
  hasPlace,
  roadAddress,
  address,
  name,
  closeModal,
  onClick,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray/80 bg-opacity-50" // z-index 값을 z-50으로 변경
      onClick={closeModal}
    >
      <div
        className="z-60 h-2/5 w-3/4  rounded bg-white p-6 text-center shadow-lg" // z-index 값을 z-60으로 변경
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1/3">
          <h2 className="text-xl mb-3 font-bold">{name}</h2>
        </div>
        <div className="flex h-2/3 flex-col items-center justify-between">
          <section>
            <p>{roadAddress}</p>
            <p>{address}</p>
          </section>
          <p className="mt-6">
            <span className="font-extrabold text-mint-em">{name}</span>{' '}
            {hasPlace}
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={closeModal}
              className="mx-2 inline-block rounded-full border-2 border-mint px-4 py-2 font-semibold text-mint hover:bg-mint hover:text-white"
            >
              닫기
            </button>
            <button
              onClick={onClick}
              className="mx-2 rounded-full border-2 border-mint bg-mint px-4 py-2 font-semibold text-white hover:bg-white hover:text-mint"
            >
              추가하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default placeModal;
