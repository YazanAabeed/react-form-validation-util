import React from "react";

export default ({ children, onSubmit = () => {} }) => {
  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={event => {
        onSubmit();
        event.preventDefault();
      }}
    >
      {children}
    </form>
  );
};
