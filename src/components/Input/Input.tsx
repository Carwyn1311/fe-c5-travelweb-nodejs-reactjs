import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
  name: string
  label: string
  placeholder?: string
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  requiredMessage?: string
  width?: string
  height?: string
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder = '',
  register,
  errors,
  requiredMessage = `${label} is required!`,
  width = '100%',
  height = 'auto'
}) => {
  const error = errors[name];

  return (
    <div className="form-group" style={{ marginBottom: '16px' }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '8px' }}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        className="form-input"
        placeholder={placeholder}
        {...register(name, { required: requiredMessage })}
        style={{
          width,
          height,
          padding: '12px',
          borderRadius: '8px',
          border: `1px solid ${(error != null) ? 'red' : '#ccc'}`,
          outline: 'none',
          boxSizing: 'border-box'
        }}
      />
      {(error != null) && (
        <span className="error-message" style={{ color: 'red', fontSize: '14px' }}>
          {error.message as string}
        </span>
      )}
    </div>
  );
};

export default Input;
