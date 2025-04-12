import React from 'react';
import './Dropdown.css';

interface DropdownProps {
  label: string
  options: string[]
  defaultValue?: string
  onChange?: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, defaultValue, onChange }) => {
  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown" className="dropdown-label">{label}</label>
      <select
        id="dropdown"
        className="dropdown-select"
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
