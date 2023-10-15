import React from 'react';

const MobileTagButton = ({ tag, checkedTag, setCheckedTag }) => {
  return (
    <>
      {tag === 'All' ? (
        <button
          onClick={() => setCheckedTag(tag)}
          className={`order-last mx-0.5 block rounded-xl border border-gray/60 bg-light px-1.5 py-0.5 text-[14px] text-white`}
        >
          {tag}
        </button>
      ) : (
        <button
          onClick={() => setCheckedTag(tag)}
          className={`${
            checkedTag === tag
              ? 'order-first animate-pulse bg-pink/70 text-gray'
              : 'bg-mint/40'
          } mx-0.5 block rounded-3xl border border-gray/60 px-1.5 py-0.5 text-[14px] text-gray/70`}
        >
          {tag}
        </button>
      )}
    </>
  );
};

export default MobileTagButton;
