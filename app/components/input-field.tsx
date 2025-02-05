import React from 'react'
import { InputFieldProps } from '../constants/input-field';

export const InputField = ({
  name,
  label,
  type,
  maxLength,
  minLength,
  value,
  placeholder,
  required,
  onChange
}: InputFieldProps) => {
  return (
    <div>
      <label htmlFor={name}>{label} {required && '*'}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 mb-4 bg-slate-100 rounded outline-none text-slate-950 placeholder-gray-500"
      />
    </div>
  );
};
