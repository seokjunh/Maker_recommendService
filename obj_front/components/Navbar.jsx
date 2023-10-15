'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hamburger from './svg/Hamburger';
import XButton from './svg/XButton';
import Script from 'next/script';
import Cookies from 'js-cookie';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

import axios from 'axios';

const Navbar = () => {
  const { userData, mutate } = useCurrentUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const logout = () => {
    Cookies.remove('name');
    Cookies.remove('token');
    Cookies.remove('userid');

    mutate();
    router.push('/login');
  };

  useEffect(() => {
    if (userData) {
      axios.defaults.withCredentials = true; // credential:true 추가
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // access-control-allow-origin 추가
      axios.defaults.headers.common['SameSite'] = 'none'; // samesite=none 추가
      axios.defaults.headers.common['secure'] = true; // secure=true 추가
      return;
    }
  }, [userData]);

  return (
    <>
      <Script
        strategy="beforeInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`}
      ></Script>
      <header className="relative h-[10vh] w-screen">
        <div className="sticky left-0 right-0 top-0 z-40 h-full border-b border-mint-em/[0.2] bg-white">
          <nav className="py-auto relative mx-auto my-auto flex h-full flex-wrap items-center justify-between px-[20px]">
            <div>
              <Link
                href="/"
                onClick={() => setIsMenuOpened(false)}
                className="flex items-center justify-start"
              >
                <Image
                  width={50}
                  height={50}
                  src="/img/marker.png"
                  priority
                  alt="logo"
                />
                <p className="font-extrabold">MARKER</p>
              </Link>
            </div>
            {/* 모바일 */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpened(!isMenuOpened)}>
                {isMenuOpened ? <XButton /> : <Hamburger />}
              </button>
            </div>
            {/* 태블릿++ */}
            <div className="w-100 hidden md:block">
              <ul className="flex items-center justify-end">
                {!!userData && (
                  <button className="mx-2 px-2">
                    <Link className="inline-block px-2" href="/place">
                      <p className="hover:scale-110">북마크</p>
                    </Link>
                  </button>
                )}
                <button className="mx-2 px-2">
                  <Link className="inline-block px-2" href="/place/rank">
                    <p className="hover:scale-110">핫 플레이스</p>
                  </Link>
                </button>
                {!!userData ? (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="mx-2 px-2"
                  >
                    <button href="/user">
                      <p className="hover:scale-110 hover:text-mint-em">
                        {userData}
                      </p>
                    </button>
                    {isDropdownOpen && (
                      <div className="top-50 divide absolute right-[15px] z-40 flex w-32 flex-col divide-y divide-mint rounded border border-mint bg-white text-gray shadow-lg">
                        <Link
                          onClick={() => setIsMenuOpened(false)}
                          href={`/user/${userData}`}
                          className={`${userData ? '' : 'hidden'}`}
                        >
                          <button className="mx-auto w-full px-6">
                            마이페이지
                          </button>
                        </Link>
                        <Link onClick={logout} href="/user/login">
                          <button className="mx-auto w-full px-6">
                            로그아웃
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <li>
                    <Link href="/user/login">
                      <p className="hover:scale-110 hover:text-mint-em">
                        로그인
                      </p>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
        {/* 모바일 드롭박스 */}
        {isMenuOpened ? (
          <div className="absolute left-0 right-0 top-full z-30 bg-white shadow-lg md:hidden">
            <ul className="divide-y divide-back">
              <li className="px-6 py-3">
                <Link onClick={() => setIsMenuOpened(false)} href="/place">
                  <p className="block text-center">북마크</p>
                </Link>
              </li>
              <li className="px-6 py-3">
                <Link onClick={() => setIsMenuOpened(false)} href="/place/rank">
                  <p className="block text-center">핫 플레이스</p>
                </Link>
              </li>
              {!!userData ? (
                <>
                  <li className="px-6 py-3">
                    <Link
                      onClick={() => setIsMenuOpened(false)}
                      href={`/user/${userData}`}
                      className={`${userData ? '' : 'hidden'}`}
                    >
                      <p className="block text-center">마이페이지</p>
                    </Link>
                  </li>
                  <li className="px-6 py-3">
                    <Link
                      onClick={() => {
                        setIsMenuOpened(false);
                        logout();
                      }}
                      href="/user/login"
                    >
                      <p className="block text-center">로그아웃</p>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="px-6 py-3">
                  <Link
                    onClick={() => setIsMenuOpened(false)}
                    href="/user/login"
                  >
                    <p className="block text-center">로그인</p>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Navbar;
