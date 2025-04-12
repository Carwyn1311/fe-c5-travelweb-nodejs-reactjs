import React, { useState } from 'react';

interface PasswordFieldProps {
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
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label = 'Password',
  name = 'password-field',
  value,
  onChange,
  placeholder = '',
  fullWidth = false,
  fullHeight = false,
  margin = 'normal',
  className = '',
  width = 'auto',
  height = 'auto'
}: PasswordFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '6px',
        padding: '0',
        transition: 'border-color 0.3s ease',
        width: fullWidth ? '100%' : width,
        maxWidth: '300px', 
        boxSizing: 'border-box',
        ...(isFocused && { borderColor: '#000' }),
        backgroundColor: '#fff', 
      }}
    >
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
            backgroundColor: '#fff',
            pointerEvents: 'none',
          }}
        >
          {label}
        </label>
        <input
          type="password"
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
          required
        />
      </div>
    </div>
  );
};

export default PasswordField;
