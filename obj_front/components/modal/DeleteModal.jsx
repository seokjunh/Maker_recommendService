'use client';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const DeleteModal = ({
  id,
  name,
  data,
  closeModal,
  userDatas,
  setUserDatas,
}) => {
  const success = () =>
    toast.success({ name } + '삭제 성공!', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const onError = (err) =>
    toast.error(err, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  console.log(data);

  const deleteMyBookmark = () =>
    axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: `${Cookies.get('token')}`,
      },
      url: `${process.env.NEXT_PUBLIC_SERVER}/place/delete`,
      data: {
        place_id: data.placeId,
      },
      withCredentials: true,
      crossDomain: true,
      cookie: {
        sameSite: 'none',
      },
    })
      .then((res) => {
        if (res.data.success) {
          const afterDeleted = userDatas.filter((data) => data.placeId !== id);
          setUserDatas(afterDeleted);
          success();
          return;
        }
      })
      .then((err) => onError(err));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray/80 bg-opacity-50" // z-index 값을 z-50으로 변경
      onClick={closeModal}
    >
      <div
        className="z-60 rounded bg-white p-6 text-center shadow-lg" // z-index 값을 z-60으로 변경
        onClick={(e) => e.stopPropagation()}
      >
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex flex-col items-center justify-center">
          <h2>{name}</h2>
          <p>북마크에서 삭제하시겠어요?</p>
          <div className="flex items-end justify-center">
            <button
              onClick={closeModal}
              className="mx-2 inline-block rounded-full border-2 border-mint px-4 py-2 font-semibold text-mint hover:bg-mint hover:text-white"
            >
              아니요!
            </button>
            <button
              onClick={deleteMyBookmark}
              className="mx-2 inline-block rounded-full border-2 border-warning px-4 py-2 font-semibold text-warning hover:bg-warning hover:text-white"
            >
              삭제!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
