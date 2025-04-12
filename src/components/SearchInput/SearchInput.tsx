import React, { useState } from 'react';

interface SearchInputProps {
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

const SearchInput: React.FC<SearchInputProps> = ({
  label = 'Search by client or project name',
  name = 'search-input',
  value,
  onChange,
  placeholder = 'Search by client or project name',
  fullWidth = false,
  fullHeight = false,
  margin = 'normal',
  className = '',
  width = 'auto',
  height = 'auto',
  prefixIcon
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);

  // Generate a unique ID if 'name' is not provided to avoid duplication issues
  const uniqueId = name || `search-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className={`floating-label-container ${margin}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '2px solid #ccc',
        borderRadius: '15px',
        padding: '8px',
        width: fullWidth ? '100%' : width,
        height: fullHeight ? '100%' : height
      }}
    >
      {prefixIcon && (
        <span style={{ marginRight: '8px', fontSize: '18px' }}>
          {prefixIcon}
        </span>
      )}
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <label
          htmlFor={uniqueId}
          className={`floating-label ${isFocused || value !== '' ? 'focused' : ''}`}
          style={{
            position: 'absolute',
            top: isFocused || value !== '' ? '-18px' : '50%', 
            left: '8px',
            transform: 'translateY(-50%)',
            fontSize: isFocused || value !== '' ? '12px' : '16px',
            transition: 'all 0.2s ease',
            color: isFocused ? '#000' : '#aaa'
          }}
        >
          {label}
        </label>
        <input
          type="text"
          id={uniqueId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={label} // Adding aria-label for accessibility
          className={`input-field ${className}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: fullWidth ? '100%' : width, // Set width from props
            height: fullHeight ? '100%' : height || '35px', // Set height from props (default 35px)
            border: 'none',
            outline: 'none',
            padding: '5px',
            fontSize: '14px',
            backgroundColor: 'transparent'
          }}
        />
      </div>
    </div>
  );
};

export default SearchInput;
