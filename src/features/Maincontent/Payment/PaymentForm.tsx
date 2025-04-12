import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel } from '@mui/material';

interface PaymentFormProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  paymentMethods: Array<{ id: string; method_name: string }>;
  selectedBank: string;
  setSelectedBank: (value: string) => void;
  banks: Array<{ id: string; name: string }>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ paymentMethod, setPaymentMethod, paymentMethods, selectedBank, setSelectedBank, banks }) => {
  return (
    <>
      <FormControl component="fieldset" sx={{ margin: '20px 0' }}>
        <FormLabel component="legend">Phương thức thanh toán</FormLabel>
        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          {paymentMethods.map((method) => (
            <FormControlLabel key={method.id} value={method.id.toString()} control={<Radio />} label={method.method_name} />
          ))}
        </RadioGroup>
      </FormControl>

      {paymentMethod === '1' && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="bank-select-label">Chọn Ngân hàng</InputLabel>
          <Select
            labelId="bank-select-label"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value as string)}
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
