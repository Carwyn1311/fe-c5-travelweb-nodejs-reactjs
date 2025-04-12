import React, { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface InputDayProps {
  label: string
  name: string
  value: Date | null
  onChange: (date: Date | null) => void
  width?: string
  height?: string
}

const InputDay: React.FC<InputDayProps> = ({
  label,
  name,
  value,
  onChange,
  width = '100%',
  height = '40px'
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const handleIconClick = (): void => {
    setShowCalendar((prev) => !prev);
  };

  return (
    <div
      className="input-day-container"
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: isFocused ? '#e0f7fa' : '#f9f9f9',
        border: isFocused ? '1px solid #4CAF50' : '1px solid #ccc',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: isFocused ? '0 0 10px rgba(0, 128, 0, 0.3)' : 'none',
        transition: 'border 0.3s, background-color 0.3s, box-shadow 0.3s'
      }}
    >
      <label
        htmlFor={name}
        style={{
          position: 'absolute',
          top: isFocused || (value != null) ? '-12px' : '50%',
          left: '10px',
          fontSize: isFocused || (value != null) ? '12px' : '16px',
          color: isFocused ? '#4CAF50' : '#aaa',
          transform: 'translateY(-50%)',
          transition: 'all 0.3s ease',
          background: 'white',
          padding: '0 4px'
        }}
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={(value != null) ? value.toLocaleDateString() : ''}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={() => {}}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none',
          paddingLeft: '10px',
          fontSize: '16px',
          backgroundColor: '#ffffff'
        }}
      />
      <div
        onClick={handleIconClick}
        style={{
          position: 'absolute',
          right: '10px',
          fontSize: '18px',
          color: '#ff0000',
          cursor: 'pointer',
          padding: '5px',
          backgroundColor: isFocused ? '#1677ff' : 'transparent',
          borderRadius: '50%',
          transition: 'background-color 0.3s'
        }}
      >
        <FaRegCalendarAlt />
      </div>
      {showCalendar && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            zIndex: 1000,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px'
          }}
        >
          <DatePicker
            selected={value}
            onChange={(date) => {
              onChange(date);
              setShowCalendar(false);
            }}
            inline
            calendarClassName="custom-datepicker"
            dayClassName={() => 'custom-day'}
          />
        </div>
      )}
      <style>{`
        .custom-datepicker {
          border-radius: 12px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          border: none;
        }

        .react-datepicker__current-month {
          font-size: 1.2rem;
          font-weight: bold;
          color: #4CAF50;
        }

        .react-datepicker__navigation--previous,
        .react-datepicker__navigation--next {
          top: 15px;
        }

        .react-datepicker__navigation-icon::before {
          border-color: #4CAF50;
        }

        .react-datepicker__day {
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        .react-datepicker__day:hover {
          background-color: #ffffff;
        }

        .react-datepicker__day--selected {
          background-color: #4CAF50;
          color: white;
        }

        .react-datepicker__day--today {
          font-weight: bold;
          border: 1px solid #4CAF50;
          color: #4CAF50;
        }

        .react-datepicker__header {
          background-color: #fff;
          border-bottom: none;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        .react-datepicker__navigation--previous,
        .react-datepicker__navigation--next {
          outline: none;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default InputDay;
