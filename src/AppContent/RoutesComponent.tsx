import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from '../features/Maincontent/Content/MainContent';
import AdminRoutes from '../features/Admin/Content/AdminRoutes';
import AdminTourManagement from '../features/Admin/Content/AdminTourManagement';
import DestinationList from '../features/Admin/Destination/DestinationList';
import TourDetail from '../features/Admin/Content/TourDetail';
import CityList from '../features/Admin/City/CityList';
import TravelPageDongBac from '../features/AllTours/Tours/TravelPageDongBac';
import TravelPageHaNoi from '../features/AllTours/Tours/TravelPageHaNoi';
import TravelPageSapa from '../features/AllTours/Tours/TravelPageSapa';
import TravelPageHaLong from '../features/AllTours/Tours/TravelPageHaLong';
import DestinationDetail from '../features/Maincontent/Content/DestinationDetails';
import Login from '../features/Auth/Login';
import CreateAccounts from '../features/Auth/CreateAccount';
import ForgotPassword from '../features/Auth/ForgotPassword';
import AdminUser from '../features/Admin/User/AdminUser';
import ProvinceList from '../features/Admin/Province/ProvinceList';
import PaymentPage from '../features/Maincontent/Payment/PaymentPage';
import PaymentDetailsPage from '../features/Admin/Payment/PaymentDetailsPage';
import UserProfile from '../features/Profile/UserProfile';
import InfoDPTTravel from '../features/Profile/InfoDPTTravel';
import ContactPage from '../features/Maincontent/Content/ContactPage';

const RoutesComponent: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {

  return (
    <Routes>
          <Route path="/travel/dongbac-taybac" element={<TravelPageDongBac />} />
          <Route path="/travel/mien-bac/ha-noi" element={<TravelPageHaNoi />} />
          <Route path="/travel/mien-bac/ha-long" element={<TravelPageHaLong />} />
          <Route path="/travel/mien-bac/sapa" element={<TravelPageSapa />} />
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/create-account" element={<CreateAccounts />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/admin/manage-users" element={<AdminUser />} />
          <Route path="/admin/img-slider" element={<AdminTourManagement />} />
          <Route path="/admin/tour-list" element={<DestinationList />} />
          <Route path="/admin/tour-list/tour/:id" element={<TourDetail />} />
          <Route path="/admin/city-list" element={<CityList />} />
          <Route path="/admin/province-list" element={<ProvinceList />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin/paymentdetails" element={<PaymentDetailsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/info-dpt-travel" element={<InfoDPTTravel />} />
          <Route path="/lien-he" element={<ContactPage />} />
        </Routes>
  );
};

export default RoutesComponent;