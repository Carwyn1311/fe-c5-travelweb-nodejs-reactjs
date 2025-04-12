import React, { useState } from 'react';

interface TextFieldProps {
  label?: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  className?: string;
  width?: string;
  height?: string;
  prefixIcon?: React.ReactNode;
}

const TextField: React.FC<TextFieldProps> = ({
  label = 'Label',
  name = 'text-field',
  value,
  onChange,
  placeholder = '',
  fullWidth = false,
  fullHeight = false,
  margin = 'normal',
  className = '',
  width = 'auto',
  height = 'auto',
  prefixIcon
}: TextFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isFocused ? '#000' : '#ddd', // Chỉ định borderColor khi focus
        borderRadius: '6px',
        padding: '0',
        transition: 'border-color 0.3s ease',
        width: fullWidth ? '100%' : width,
        maxWidth: '300px', 
        boxSizing: 'border-box',
        backgroundColor: '#fff', 
      }}
    >
      {prefixIcon && (
        <span
          style={{
            fontSize: '16px',
            color: '#aaa',
            marginLeft: '6px',
            marginRight: '4px',
          }}
        >
          {prefixIcon}
        </span>
      )}
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <label
          htmlFor={name}
          style={{
            position: 'absolute',
            top: isFocused || value !== '' ? '-20px' : '50%', 
            left: '10px',
            transform: isFocused || value !== '' ? 'none' : 'translateY(-50%)',
            fontSize: isFocused || value !== '' ? '12px' : '14px',
            color: isFocused ? '#000' : '#aaa',
            transition: 'top 0.3s ease, font-size 0.3s ease, color 0.3s ease',
            padding: '0 4px',
            pointerEvents: 'none',
          }}
        >
          {label}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            padding: '10px', 
            backgroundColor: '#fff', 
            boxSizing: 'border-box',
            appearance: 'textfield',
            WebkitTextFillColor: 'currentColor',
            caretColor: '#000',
            backgroundClip: 'padding-box',
          }}
        />
      </div>
    </div>
  );
};

export default TextField;
