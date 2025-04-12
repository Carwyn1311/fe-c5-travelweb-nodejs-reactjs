import React, { useState, useCallback, useMemo } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

interface AutoSearchProps {
  items: { name: string; url: string; description?: string }[]; 
  onSelectItem: (item: string, url: string) => void;
  label?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const AutoSearch: React.FC<AutoSearchProps> = ({
  items,
  onSelectItem,
  label = 'Search ... ',
  placeholder = '',
  prefix,
  className = '',
  value = '',
  onChange,
  width = '100%',
  height = 'auto',
  buttonText, 
  buttonUrl,  
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      onChange?.(e);
      setVisible(true);
    },
    [onChange]
  );

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  const handleItemSelect = useCallback(
    (item: { name: string; url: string }) => {
      setSearchTerm(item.name);
      onSelectItem(item.name, item.url);
      setVisible(false);
    },
    [onSelectItem]
  );

  const menuItems: MenuProps['items'] = useMemo(
    () =>
      filteredItems.map((item, index) => ({
        key: index.toString(),
        label: (
          <div>
            <span>{item.name}</span>
            {item.description && <small style={{ display: 'block', color: '#aaa' }}>{item.description}</small>}
          </div>
        ),
        onClick: () => handleItemSelect(item),
      })),
    [filteredItems, handleItemSelect]
  );

  return (
    <div
      className={`floating-label-container ${className}`}
      style={{
        width,
        height: height !== '' ? height : 'auto',
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        color: '#333',
        zIndex: 1000, 
      }}
    >
      {prefix != null && (
        <span style={{ marginRight: '8px', fontSize: '18px', zIndex: 1000 }}>{prefix}</span>
      )}
      <div style={{ flexGrow: 1, position: 'relative', zIndex: 1000 }}>
        <label
          className={`floating-label ${isFocused || searchTerm !== '' ? 'focused' : ''}`}
          style={{
            position: 'absolute',
            top: isFocused || searchTerm !== '' ? '-3px' : '50%',
            left: '8px',
            transform: 'translateY(-50%)',
            fontSize: isFocused || searchTerm !== '' ? '12px' : '16px',
            transition: 'all 0.2s ease',
            color: isFocused ? '#000' : '#aaa',
            zIndex: 1000,
          }}
        >
          {label}
        </label>
        <input
          className="auto-search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          onClick={() => setVisible(true)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            padding: '12px 12px',
            fontSize: '14px',
            backgroundColor: 'transparent',
            zIndex: 1,
          }}
        />
      </div>
      {visible && filteredItems.length > 0 && (
        <Dropdown
          menu={{ items: menuItems }}
          overlayStyle={{ width: '100%', top: '55px' }}
          open={visible}
          onOpenChange={setVisible}
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        >
          <div
            className="auto-search-trigger"
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              marginTop: '10px', 
              position: 'absolute',
              width: '100%',
              zIndex: 9999, 
            }}
          />
        </Dropdown>
      )}
      {buttonText && buttonUrl && (
        <button
          onClick={() => window.location.href = buttonUrl}
          style={{
            marginTop: '10px',
            padding: '8px 12px',
            backgroundColor: '#ff6700',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

AutoSearch.displayName = 'AutoSearch';

export default AutoSearch;
