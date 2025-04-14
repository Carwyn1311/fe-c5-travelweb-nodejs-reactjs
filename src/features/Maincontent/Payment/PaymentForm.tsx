// src/components/PaymentForm.tsx
import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'cash' | 'momo' | 'zalopay';

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (value: PaymentMethod) => void;
  // Mảng phương thức thanh toán từ server, chứa id và tên
  paymentMethods: Array<{ id: string; method_name: string }>;
  selectedBank: string;
  setSelectedBank: (value: string) => void;
  banks: Array<{ id: string; name: string }>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  setPaymentMethod,
  paymentMethods,
  selectedBank,
  setSelectedBank,
  banks,
}) => {
  return (
    <>
      <FormControl component="fieldset" sx={{ margin: '20px 0' }}>
        <FormLabel component="legend">Phương thức thanh toán</FormLabel>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
        >
          {paymentMethods.map((method) => (
            <FormControlLabel
              key={method.id}
              value={method.id as PaymentMethod} // Ép kiểu id thành PaymentMethod
              control={<Radio />}
              label={method.method_name}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'bank_transfer' && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="bank-select-label">Chọn Ngân hàng</InputLabel>
          <Select
            labelId="bank-select-label"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value as string)}
            label="Chọn Ngân hàng"
          >
            {banks.map((bank) => (
              <MenuItem key={bank.id} value={bank.id}>
                {bank.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default PaymentForm;
