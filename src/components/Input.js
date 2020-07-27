import React from "react";

const Input = ({ type = "text", title, value, onChange, ...props }) => {
  return (
    <div className="form-input">
      <label htmlFor={title}>{title}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(title.toLowerCase(), e.target.value)}
        {...props}
      />
    </div>
  );
};

export default Input;
