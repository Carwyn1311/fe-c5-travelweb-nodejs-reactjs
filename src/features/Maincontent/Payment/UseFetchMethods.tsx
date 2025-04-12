import React, { useEffect } from 'react';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';

interface Method {
  id: string;
  method_name: string;
}

interface Bank {
  id: string;
  name: string;
}

const useFetchMethods = (
  setPaymentMethods: React.Dispatch<React.SetStateAction<Method[]>>,
  setBanks: React.Dispatch<React.SetStateAction<Bank[]>>,
  paymentMethod: string
) => {
  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    if (paymentMethod === '1') {
      fetchBanks();
    }
  }, [paymentMethod]);

  const fetchPaymentMethods = async () => {
    try {
      const response = await axiosInstance.get('/api/payment-methods');
      setPaymentMethods(response.data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    }
  };

  const fetchBanks = async () => {
    try {
      const response = await axiosInstance.get('/api/banks/list');
      setBanks(response.data);
      console.log('Banks list:', response.data);  // Print the banks list
    } catch (error) {
      console.error('Failed to fetch banks', error);
    }
  };
};

export default useFetchMethods;
