'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useCurrentUser from '@/hooks/useCurrentUser';

const Banner = React.memo(() => {
  const { userData } = useCurrentUser();

  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [displayedText3, setDisplayedText3] = useState('');
  const [displayedText4, setDisplayedText4] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const phrases = [['후회없는', '귀가를 위해', 'MARKER', '']];

  const typePhrase = useCallback(async () => {
    for (const [phrase1, phrase2, phrase3, phrase4] of phrases) {
      for (const char1 of phrase1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setDisplayedText1((prevText) => prevText + char1);
      }
      setDisplayedText1((prevText) => prevText + '');

      for (const char2 of phrase2) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setDisplayedText2((prevText) => prevText + char2);
      }
      setDisplayedText2((prevText) => prevText + '');

      for (const char3 of phrase3) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setDisplayedText3((prevText) => prevText + char3);
      }
      setDisplayedText3((prevText) => prevText + '');

      await new Promise((resolve) => setTimeout(resolve, 100));

      setDisplayedText4((prevText) => prevText + phrase4);

      setIsButtonVisible(true);
    }
  }, []);

  useEffect(() => {
    typePhrase();
  }, [typePhrase]);

  return (
    <div className="relative">
      <div>
        <img
          src="/img/hero.jpg"
          alt="banner"
          className="block w-screen object-cover md:h-[90vh]"
        />
      </div>
      <div className="absolute left-[30px] top-5 hidden mob:block md:top-[40px] lg:left-[80px]">
        <h1 className="font-gothic text-[32px] text-[#57534e]/[0.9] sm:text-[56px] md:text-[80px]">
          {displayedText1}
          <br />
          {displayedText2}
          <br />
          <span className="text-mint-em">{displayedText3}</span>
          {displayedText4}
        </h1>
        {isButtonVisible && !userData && (
          <div className="flex justify-start">
            <Link
              href="/user/login"
              className="min-w-6 mr-4 rounded-md border bg-white px-6 py-1 font-extrabold opacity-60 hover:text-mint-em"
            >
              로그인
            </Link>
            <Link
              href="/user/signup"
              className="min-w-6 ml-1 rounded-md border bg-white px-6 py-1 font-extrabold opacity-60 hover:text-mint-em"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

export default Banner;
