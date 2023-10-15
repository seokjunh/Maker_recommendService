'use client';
import React from 'react';

const Input = React.memo(
  ({ svg, name, placeholder, type, value, onChange }) => {
    return (
      <div className="my-2 flex">
        {svg}
        <input
          placeholder={placeholder}
          spellCheck={false}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="border-b-2 border-mint px-2 text-[16px] outline-none"
        />
      </div>
    );
  }
);

export default Input;
