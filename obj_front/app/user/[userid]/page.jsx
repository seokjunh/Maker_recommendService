'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Pagination from 'react-js-pagination';
import Link from 'next/link';

import UserInfo from '@/components/userinfo';
import MobileTagButton from '@/components/MobileTagButton';

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

const page = ({ params }) => {
  const items = 10;
  const [userDatas, setUserDatas] = useState([]);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [checkedTag, setCheckedTag] = useState('');

  const checkedItemHandler = (value) => {
    setCheckedTag(value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}/user/${params.userid}`, {
        headers: {
          'Content-Type': 'application/json',
          token: `${Cookies.get('token')}`,
        },
        withCredentials: true,
      })
      .then((res) => res?.data || [])
      .then((data) => {
        return data.map((place) => ({
          ...place,
          tag: !!place.tags ? JSON.parse(place.tags) : [],
        }));
      })
      .then((data) => {
        setUserDatas(data);
        setIsLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="flex w-screen flex-col items-center justify-start">
      <div className="h-[15vh] w-screen">
        <div className="hidden h-full w-full items-center justify-center md:flex">
          <Link href={'/place'}>
            <button className="mx-4 my-auto box-border block rounded-md border-none bg-mint px-6 py-2 font-bold text-white hover:bg-mint/80">
              등록하러 가기!
            </button>
          </Link>
          <Link href={'/place/rank'}>
            <button className="mx-4 my-auto box-border block rounded-md border-none bg-pink/40 px-6 py-2 font-bold text-white hover:bg-pink/60">
              핫플레이스는?
            </button>
          </Link>
        </div>
        <div className="my-4 flex h-3/5 w-full flex-wrap items-center justify-center md:hidden">
          {checkBoxList.map((item, idx) => (
            <MobileTagButton
              key={idx}
              tag={item}
              checkedTag={checkedTag}
              setCheckedTag={setCheckedTag}
            />
          ))}
          <MobileTagButton
            tag={'All'}
            checkedTag={checkedTag}
            setCheckedTag={() => setCheckedTag('')}
          />
        </div>
      </div>

      <div className="h-[75vh] w-screen">
        <div className="flex justify-around">
          <div className="w-4/5 flex-col items-center justify-start rounded md:w-[65vw]">
            <h3 className="text-center font-bold">⭐️마이 북마크⭐️</h3>
            {isLoading || !!userDatas.length ? (
              userDatas
                .filter((place) => {
                  if (checkedTag === '') return true;
                  return place.tag.includes(checkedTag);
                })
                .slice(items * (page - 1), items * (page - 1) + items)
                .map((place) => (
                  <UserInfo
                    key={`${place.palceId}: ${place.place_name}`}
                    data={place}
                    id={place.placeId}
                    cnt={place.cnt}
                    name={place.place_name}
                    roadAddress={place.roadAddress}
                    setUserDatas={setUserDatas}
                    userDatas={userDatas}
                  />
                ))
            ) : (
              <UserInfo name="북마크를 등록해주세요!" />
            )}
            {isLoading &&
              new Array(10).fill(<UserInfo isLoading={isLoading} />)}

            {userDatas.length > 10 && (
              <Pagination
                activePage={page}
                itemsCountPerPage={items}
                totalItemsCount={userDatas.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                innerClass="flex w-full justify-around"
                activeClass="bg-mint/60 px-2 text-white"
                itemClass="px-2 rounded-md border border-gray/60"
              ></Pagination>
            )}
          </div>

          <div className="hidden w-[30vw] items-center justify-start md:block">
            <h3 className="mb-2 rounded bg-mint/70 text-center font-semibold text-white shadow-lg">
              📌태그
            </h3>
            <div className="min-w-[150px] rounded px-4 py-3 font-bold">
              <div className="checkbox">
                <div className="relative mb-1 h-8">
                  <input
                    type="radio"
                    name="tag"
                    id="show-all"
                    defaultChecked
                    className="peer h-full w-full cursor-pointer appearance-none rounded-lg bg-pink/60 shadow-lg transition-all duration-200 hover:bg-pink/70"
                    onChange={(e) => {
                      setCheckedTag('');
                    }}
                  ></input>
                  <label
                    htmlFor="show-all"
                    className="absolute left-3 top-[50%] -translate-y-[50%] select-none text-gray/90 transition-all duration-200 hover:text-white"
                  >
                    전체보기
                  </label>
                </div>
              </div>
              {checkBoxList.map((item, idx) => (
                <div className="checkbox" key={idx}>
                  <div className="relative mb-1 h-8">
                    <input
                      type="radio"
                      name="tag"
                      id={item}
                      className="peer h-full w-full cursor-pointer appearance-none rounded-lg bg-gray/10 shadow-lg transition-all duration-200 checked:bg-mint hover:bg-gray/20 checked:hover:bg-mint/50"
                      onChange={() => checkedItemHandler(item)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
