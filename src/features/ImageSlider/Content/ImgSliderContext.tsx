import React, { createContext, ReactNode, useState, useMemo } from 'react';
import { slidesData } from './Img';  // Import dữ liệu từ Img.ts

// Định nghĩa kiểu dữ liệu của một slide
interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

// Định nghĩa kiểu dữ liệu của context
interface ImgSliderContextProps {
  slides: Slide[];
  setSlides: React.Dispatch<React.SetStateAction<Slide[]>>;  // Hàm cập nhật slide
}

// Tạo context với giá trị mặc định
export const ImgSliderContext = createContext<ImgSliderContextProps>({
  slides: slidesData,  // Khởi tạo với dữ liệu mặc định từ Img.ts
  setSlides: () => {},  // Mặc định là hàm rỗng
});

// Tạo provider để cung cấp dữ liệu cho các component con
export const ImgSliderContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [slides, setSlides] = useState<Slide[]>(slidesData);  // Khởi tạo slides với dữ liệu từ Img.ts

  const contextValue = useMemo(() => ({ slides, setSlides }), [slides]);  // Tạo contextValue để tối ưu hiệu năng

  return (
    <ImgSliderContext.Provider value={contextValue}>
      {children}  {/* Cung cấp context cho các component con */}
    </ImgSliderContext.Provider>
  );
};
