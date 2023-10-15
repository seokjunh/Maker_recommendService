import Link from 'next/link';
import React from 'react';
import SmallLogo from './SmallLogo';

const UserFormWrapper = ({ children, message, question, type }) => {
  return (
    <main className="mt-[40px] flex w-full flex-1 flex-col items-center text-center lg:mt-[100px] lg:px-20">
      <div className="mx-auto w-3/4 max-w-4xl rounded-2xl bg-white md:flex">
        <div className="p-5 md:w-3/5">
          <SmallLogo />
          <div className="py-5">
            <h2 className="text-[24px] font-bold text-mint-em">{message}</h2>
          </div>
          {children}
        </div>

        <div className="hidden w-2/5 rounded-br-2xl rounded-tr-2xl bg-mint/80 px-8 py-36 text-white md:block">
          <h2 className="mb-2 font-bold">{question}</h2>
          <div className="mb-2 inline-block w-9/12 border border-white"></div>
          {type === 'login' ? (
            <>
              <p className="mb-2">
                MARKER가 되어
                <br />
                후회없는 외출을 누리세요.
              </p>
              <Link
                href="/user/signup"
                className="w-2/3 rounded-full border-2 border-white px-6 py-2 text-[12px] font-semibold hover:bg-white hover:text-mint"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <p className="mb-2">
                로그인하고
                <br />
                후회없는 외출을 누리세요.
              </p>
              <Link
                href="/user/login"
                className="rounded-full border-2 border-white px-12 py-2 text-[12px] font-semibold hover:bg-white hover:text-mint"
              >
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserFormWrapper;
