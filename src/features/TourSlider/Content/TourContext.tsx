import React, { createContext, ReactNode, useMemo } from 'react';
import { tours as initialTours, Tour } from './TourSalePage';

interface TourContextProps {
  tours: Tour[];
}

export const TourContext = createContext<TourContextProps>({
  tours: [], // Cung cấp giá trị mặc định là mảng rỗng
});

export const TourContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Nếu không thay đổi tours, có thể dùng useMemo để tạo giá trị tours ổn định hơn
  const tours = useMemo(() => initialTours, []);

  return (
    <TourContext.Provider value={{ tours }}>
      {children}
    </TourContext.Provider>
  );
};
