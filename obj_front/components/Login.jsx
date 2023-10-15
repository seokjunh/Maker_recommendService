'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import UserFormWrapper from './UserFormWrapper';
import Input from '@/components/Input';
import IdCard from '@/components/svg/IdCard';
import Lock from '@/components/svg/Lock';
import Form from './Form';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import Cookies from 'js-cookie';

import useInput from '@/hooks/useInput';
import useCurrentUser from '@/hooks/useCurrentUser';

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState('');
  const [idInput, setIdInput] = useInput('');
  const [pwInput, setPwInput] = useInput('');

  const { userData, error, isLoading, mutate } = useCurrentUser();

  const handleLoginSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoginError('');

      if (!idInput.trim().length) {
        if (!pwInput.trim().length) {
          console.log('No id pw');
          setLoginError('ID와 비밀번호를 입력해주세요!');
          return;
        }
        console.log('noid');
        setLoginError('ID를 입력해주세요!');
        return;
      }

      if (!pwInput.trim().length) {
        setLoginError('비밀번호를 입력해주세요!');
        return;
      }

      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/user/login`, {
          userid: idInput,
          password: pwInput,
        })
        .then((response) => {
          if (response.status == 200) {
            setLoginError('');
            const token = response.data.token;
            Cookies.set('token', token, { expires: 1 });
            Cookies.set('name', response.data.name, { expires: 1 });
            Cookies.set('userid', idInput, { expires: 1 });
            axios.defaults.headers.common['token'] = response.data.token;
            axios.defaults.withCredentials = true; // credential:true 추가
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // access-control-allow-origin 추가
            axios.defaults.headers.common['SameSite'] = 'none'; // samesite=none 추가
            axios.defaults.headers.common['secure'] = true; // secure=true 추가
            mutate();
            router.push('/');
            return;
          }
          setLoginError('ID와 비밀번호를 확인해주세요.');
          return;
        })
        .catch(() => {
          setLoginError('잠시 후에 다시 시도해주세요.');
          return;
        });
    },
    [idInput, pwInput, mutate]
  );

  useEffect(() => {
    if (!error && userData) {
      return router.push('/');
    }
  }, []);

  return (
    <UserFormWrapper
      type="login"
      message="로그인이 필요해요."
      question="아직 가입하지 않으셨나요?"
    >
      <Form onSubmit={handleLoginSubmit}>
        <Input
          svg={<IdCard />}
          type="text"
          placeholder="ID를 입력해주세요."
          value={idInput}
          onChange={setIdInput}
        />
        <Input
          svg={<Lock />}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={pwInput}
          onChange={setPwInput}
        />
        <p className="my-2 font-extrabold text-warning">{loginError}</p>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-block rounded-full border-2 border-mint bg-mint px-6 py-2 font-semibold text-white hover:bg-white hover:text-mint"
          >
            로그인
          </button>
          <Link
            href="/user/signup"
            className="mx-1 inline-block rounded-full border-2 border-mint px-6 py-2 font-semibold hover:bg-white hover:text-mint md:hidden"
          >
            회원가입
          </Link>
        </div>
      </Form>
    </UserFormWrapper>
  );
};

export default Login;
