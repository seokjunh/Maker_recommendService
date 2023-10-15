'use client';

import React from 'react';

const InfoModal = ({ data, closeModal }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray/80 bg-opacity-50" // z-index 값을 z-50으로 변경
      onClick={closeModal}
    >
      <div
        className="z-60 h-9/12 w-4/5 min-w-[300px] rounded bg-white p-6 text-center  shadow-lg md:w-3/5" // z-index 값을 z-60으로 변경
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-2 text-[24px] font-extrabold text-mint-em">
            {data.place_name}
          </h2>
          <p>
            <span className="text-mint">{data.cnt}</span> 명이 북마크했어요!
          </p>
          <section className="w-full">
            <div className="flex w-full justify-around md:justify-center">
              <div className="min-w-[150px] px-4 py-3 font-bold">
                {data.tag.map((item, idx) => (
                  <div className={`${item ? '' : 'hidden'} checkbox`} key={idx}>
                    <div className="relative mb-1 h-8">
                      <input
                        type="checkbox"
                        id={item}
                        checked
                        readOnly
                        className="peer h-full w-full cursor-pointer appearance-none rounded-lg bg-gray/10 transition-all duration-200 checked:bg-mint hover:bg-gray/20 checked:hover:bg-mint/30"
                      ></input>
                      <label
                        htmlFor={item}
                        className="absolute left-3 top-[50%] -translate-y-[50%] select-none text-gray/90 transition-all duration-200 peer-checked:text-white"
                      >
                        #{item ? item : '등록해주세요!'}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="min-w-[150px] rounded px-4 py-3 font-bold">
                <div className="radio">
                  <div className="relative mb-1 h-8">
                    <input
                      type="checkbox"
                      id="visit"
                      value={data.visits}
                      name="wish"
                      checked
                      readOnly
                      className={`peer h-full w-full cursor-pointer appearance-none rounded-lg bg-light/80 transition-all duration-200 checked:bg-pink hover:bg-pink/60 hover:text-white`}
                    ></input>
                    <label
                      htmlFor="visit"
                      className={`absolute left-3 top-[50%] -translate-y-[50%] select-none text-white transition-all duration-200`}
                    >
                      {data.visits}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-center">
              <div
                onClick={closeModal}
                className="mx-2 inline-block cursor-pointer rounded-full border-2 border-pink px-4 py-2 font-semibold text-pink hover:bg-pink hover:text-white"
              >
                닫기
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
