import React from 'react';

interface InputBoxProps {
  label?: string
  name?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  fullWidth?: boolean
  fullHeight?: boolean
  margin?: 'none' | 'dense' | 'normal'
  className?: string
  width?: string
  height?: string
}

const InputBox: React.FC<InputBoxProps> = ({
  label = 'Project name',
  name = 'input-box',
  value,
  onChange,
  placeholder = '',
  fullWidth = false,
  fullHeight = false,
  margin = 'normal',
  className = '',
  width = 'auto',
  height = 'auto'
}: InputBoxProps): JSX.Element => {
  return (
    <div
      className={`input-box-container ${margin}`}
      style={{ width: fullWidth ? '100%' : width, height: fullHeight ? '100%' : height }}
    >
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`input-field ${className}`}
        style={{ border: '2px solid red', padding: '10px', borderRadius: '5px' }}
      />
    </div>
  );
};

export default InputBox;
