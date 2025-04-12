import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Steps, message } from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import DestinationInfoForm from './form/DestinationInfoForm';
import ImageUploadForm from './form/ImageUploadForm';
import TicketPricesForm from './form/TicketPricesForm';
import DescriptionFileUploadForm from './form/DescriptionFileUploadForm';
import FormCreateItinerary from './form/FormCreateItinerary';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import moment from 'moment';
import axios from 'axios';


const { Step } = Steps;

interface City {
  id: number;
  name: string;
  province: number;
}

interface FormCreateDestinationProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FormCreateDestination: React.FC<FormCreateDestinationProps> = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [destinationId, setDestinationId] = useState<number | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [descriptionFile, setDescriptionFile] = useState<File | null>(null);
  const [itinerary, setItinerary] = useState<any | null>(null);
  const token = localStorage.getItem('token');
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/city/list');
        setCities(response.data);
      } catch (error) {
        message.error('Không thể tải danh sách thành phố');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleNext = async (values?: any) => {
    if (currentStep === 0) {
      try {
        const destResponse = await axiosInstanceToken.post('/api/dest/create', {
          name: values.name,
          description: values.description,
          location: values.location,
          city: { id: values.city }
        });
        setDestinationId(destResponse.data.id);
        setCurrentStep(currentStep + 1);
      } catch (error) {
        message.error('Lỗi khi tạo điểm đến');
        console.error('Error creating destination:', error);
      }
    } else if (currentStep === 1 || currentStep === 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      setItinerary(values);
      handleSubmit();  // Lưu hành trình sau khi nhập xong
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (destinationId === null) {
      message.error('Không tìm thấy ID điểm đến');
      return;
    }

    try {
      if (itinerary) {
        const formattedItinerary = {
            ...itinerary,
            start_date: moment(itinerary.start_date).isValid() ? moment(itinerary.start_date).format('YYYY-MM-DDTHH:mm:ss') : null,
            end_date: moment(itinerary.end_date).isValid() ? moment(itinerary.end_date).format('YYYY-MM-DDTHH:mm:ss') : null,
            activities: itinerary.activities.map((activity: any) => ({
                ...activity,
                start_time: moment(activity.start_time).isValid() ? moment(activity.start_time).format('YYYY-MM-DDTHH:mm:ss') : null,
                end_time: moment(activity.end_time).isValid() ? moment(activity.end_time).format('YYYY-MM-DDTHH:mm:ss') : null,
            }))
        };
    
        await axiosInstanceToken.post('/api/itineraries/create', formattedItinerary, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        message.success('Tạo điểm đến thành công');
        onSuccess();
        onClose();
      }
    
      if (descriptionFile) {
        const formData = new FormData();
        formData.append('descriptionFile', descriptionFile);

        await axiosInstanceToken.post(`/api/dest/upload-file/${destinationId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        message.success('Tạo điểm đến thành công');
      }
      if (fileList.length > 0) {
        try {
          const imagesToSave = await Promise.all(fileList.map(async (file: any) => {
            const base64 = await getBase64(file.originFileObj);
            return {
              destination: { id: destinationId },
              image_url: base64
            };
          }));
  
          await axiosInstanceToken.post(`/api/dest/img`, imagesToSave, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          message.success('Lưu ảnh thành công');
        } catch (error) {
          message.error('Lỗi khi lưu ảnh');
          console.error('Error uploading images:', error);
        }
      }
    } catch (error) {
      message.error('Lỗi khi lưu hành trình');
      console.error('Error saving itinerary:', error);
    }
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const ticketPrices = {
        destination_id: destinationId, 
        adult_price: Number(values.adult_price),
        child_price: Number(values.child_price),
      };

      await axiosInstance.post('/api/ticketprices/create', ticketPrices, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      handleSubmit();
      message.success('Lưu giá vé thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi lưu giá vé');
      console.error('Error saving ticket prices:', error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm Điểm Đến Mới"
      visible={true}
      onCancel={onClose}
      footer={null}
      centered
      className="destlist-create-modal"
    >
      <Steps current={currentStep}>
        <Step title="Thông Tin Điểm Đến" />
        <Step title="Chọn Ảnh" />
        <Step title="Chọn File mô tả" />
        <Step title="Hành Trình" />
        <Step title="Giá Vé" />
      </Steps>

      <div className="steps-content">
        {currentStep === 0 && (
          <DestinationInfoForm
            onNext={handleNext}
            cities={cities}
            loading={loading}
          />
        )}

        {currentStep === 1 && (
          <ImageUploadForm
            onNext={handleNext}
            onPrev={handlePrev}
            fileList={fileList}
            setFileList={setFileList}
          />
        )}

        {currentStep === 2 && (
          <DescriptionFileUploadForm
            onNext={handleNext}
            onPrev={handlePrev}
            descriptionFile={descriptionFile}
            setDescriptionFile={setDescriptionFile}
          />
        )}

        {currentStep === 3 && (
          destinationId !== null && (
            <FormCreateItinerary
              onNext={(values: any) => {
                setItinerary(values);
                setCurrentStep(currentStep + 1);
              }}
              onPrev={handlePrev}
              destinationId={destinationId}
            />
          )
        )}

        {currentStep === 4 && (
          <TicketPricesForm
            onFinish={handleFinish} 
            onPrev={handlePrev}
            loading={loading}
          />
        )}
      </div>
    </Modal>
  );
};

export default FormCreateDestination;
