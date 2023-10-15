'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const checkBoxList = [
  '데이트',
  '분위기맛집',
  '인생사진',
  '뷰맛집',
  '쇼핑',
  '맛집',
  '소주한잔',
  '여행',
  '건강',
  '레저',
  '힐링',
  '카페',
];

const wishCheckList = ['또 가고 싶어요!', '가고 싶어요!', '좋았어요!'];

const EditModal = ({
  id,
  name,
  closeModal,
  data,
  cnt,
  userDatas,
  setUserDatas,
}) => {
  const [checkedList, setCheckedList] = useState(data.tag);

  const [wish, setWish] = useState(data.visits);
  const [message, setMessage] = useState('');

  const validateCheckedTags = (item) => {
    if (checkedList.includes(item)) {
      return true;
    }
    return false;
  };

  const checkedItemHandler = (value) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));

      return;
    }
    setCheckedList((prev) => [...prev, value]);
    return;
  };

  const checkHandler = (value) => {
    checkedItemHandler(value);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      editMyBookmark();
    },
    [checkedList, wish]
  );

  const editMyBookmark = async () => {
    return await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: `${Cookies.get('token')}`,
      },
      url: `${process.env.NEXT_PUBLIC_SERVER}/user/${Cookies.get('userid')}`,
      data: {
        placeName: name,
        tag: JSON.stringify(checkedList),
        visit: wish,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success) {
          const newData = userDatas.filter((data) => id === data.placeId);
          const newArray = userDatas.filter((data) => id !== data.placeId);

          newData[0].tags = checkedList;
          newData[0].visit = wish;

          setUserDatas([...newData, ...newArray]);
          closeModal();
          return;
        }
        return;
      })
      .catch(() => {
        setMessage('오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
      });
  };

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
            {name}
          </h2>
          <p>
            <span className="text-mint">{cnt}</span> 명이 북마크했어요!
          </p>
          <section className="w-full">
            <h3 className="mx-auto mb-2 w-1/2 rounded bg-mint/70 text-center font-semibold text-white">
              📌태그를 선택해주세요!
            </h3>
            <form className="mx-auto w-full" onSubmit={onSubmit}>
              <div className="flex w-full justify-center">
                <div className="min-w-[150px] px-4 py-3 font-bold">
                  {checkBoxList.map((item, idx) => (
                    <div className="checkbox" key={idx}>
                      <div className="relative mb-1 h-8">
                        <input
                          type="checkbox"
                          id={item}
                          checked={validateCheckedTags(item)}
                          className="peer h-full w-full cursor-pointer appearance-none rounded-lg bg-gray/10 transition-all duration-200 checked:bg-mint hover:bg-gray/20 checked:hover:bg-mint/30"
                          onChange={() => checkHandler(item)}
                        ></input>
                        <label
                          htmlFor={item}
                          className="absolute left-3 top-[50%] -translate-y-[50%] select-none text-gray/90 transition-all duration-200 peer-checked:text-white"
                        >
                          #{item}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="min-w-[150px] rounded px-4 py-3 font-bold">
                  {wishCheckList.map((item, idx) => (
                    <div className="radio" key={idx + item}>
                      <div className="relative mb-1 h-8">
                        <input
                          type="radio"
                          id={item}
                          value={item}
                          name="wish"
                          checked={item === wish ? true : false}
                          className={`peer h-full w-full cursor-pointer appearance-none rounded-lg bg-light/80 transition-all duration-200 checked:bg-pink hover:bg-pink hover:text-white`}
                          onChange={() => {
                            setWish(item);
                          }}
                        ></input>
                        <label
                          htmlFor={item}
                          className={`absolute left-3 top-[50%] -translate-y-[50%] select-none text-white transition-all duration-200`}
                        >
                          {item}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-warning">{message}</h3>
              <div className="flex items-end justify-center">
                <div
                  onClick={closeModal}
                  className="mx-2 inline-block cursor-pointer rounded-full border-2 border-pink px-4 py-2 font-semibold text-pink hover:bg-pink hover:text-white"
                >
                  닫기
                </div>
                <button
                  type="submit"
                  className="mx-2 inline-block rounded-full border-2 border-mint px-4 py-2 font-semibold text-mint hover:bg-mint hover:text-white"
                >
                  수정
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
