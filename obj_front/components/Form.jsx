import React from 'react';

const Form = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col items-center">{children}</div>
    </form>
  );
};

export default Form;
