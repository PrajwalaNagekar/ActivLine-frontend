import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import SubscribersPage from '../pages/SubscribersPage';
import SubscriberDetailPage from '../pages/SubscriberDetailPage';
import FieldStaffPage from '../pages/FieldStaffPage';
import BillingPage from '../pages/BillingPage';
import OffersPage from '../pages/OffersPage';
import SupportPage from '../pages/SupportPage';
import SettingsPage from '../pages/SettingsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="subscribers" element={<SubscribersPage />} />
          <Route path="subscribers/:id" element={<SubscriberDetailPage />} />
          <Route path="field-staff" element={<FieldStaffPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

