import React, { useRef, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

interface CodeInputProps {
  activationCode: string[];
  handleCodeChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, event: React.KeyboardEvent) => void;
  setActivationCode: React.Dispatch<React.SetStateAction<string[]>>; // Thêm hàm setActivationCode
}

const CodeInput: React.FC<CodeInputProps> = ({ activationCode, handleCodeChange, handleKeyDown, setActivationCode }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Đặt con trỏ vào ô đầu tiên khi component được render
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
      {activationCode.map((digit, index) => (
        <TextField
          key={index}
          id={`code-input-${index}`}
          inputRef={el => inputRefs.current[index] = el}
          value={digit}
          onChange={(e) => {
            handleCodeChange(index, e.target.value);
            if (e.target.value && index < 5) {
              inputRefs.current[index + 1]?.focus();
            }
          }}
          onKeyDown={(e) => {
            handleKeyDown(index, e);
            if (e.key === 'Backspace' && !activationCode[index] && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center' },
            onPaste: (e) => {
              e.preventDefault();
              const paste = e.clipboardData.getData('text');
              const newCode = [...activationCode];
              for (let i = 0; i < Math.min(6, paste.length); i++) {
                newCode[i] = paste.charAt(i);
              }
              setActivationCode(newCode); 
              if (paste.length >= 6) {
                inputRefs.current[5]?.focus();
              }
            },
          }}
          variant="outlined"
          margin="normal"
          sx={{ width: '3rem' }}
        />
      ))}
    </Box>
  );
};

export default CodeInput;
