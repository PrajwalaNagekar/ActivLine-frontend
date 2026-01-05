import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layout/MainLayout';

// Lazy load pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const DashboardPage = lazy(() => import('../pages/Admin/DashboardPage'));
const SubscribersPage = lazy(() => import('../pages/Admin/SubscribersPage'));
const SubscriberDetailPage = lazy(() => import('../pages/Admin/SubscriberDetailPage'));
const FieldStaffPage = lazy(() => import('../pages/Admin/FieldStaffPage'));
const BillingPage = lazy(() => import('../pages/Admin/BillingPage'));
const OffersPage = lazy(() => import('../pages/Admin/OffersPage'));
const SupportPage = lazy(() => import('../pages/Admin/SupportPage'));
const SettingsPage = lazy(() => import('../pages/Admin/SettingsPage'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const FranchisePage = lazy(() => import('../pages/Admin/Franchise'));

const FranchiseDashboard = lazy(() => import('../pages/Franchise/Dashboard'));
const Mysubscribers = lazy(() => import('../pages/Franchise/MysubscribersPage'));
const LocalStaff = lazy(() => import('../pages/Franchise/LocalStaff'));
const Collections = lazy(() => import('../pages/Franchise/Collections'));
const ZoneSupport = lazy(() => import('../pages/Franchise/ZoneSupport'));
const Profile = lazy(() => import('../pages/Franchise/Profile'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="text-slate-400">Loading...</div>
  </div>
);

// Public route wrapper (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
};

const Router = () => {
  const [franchiseUser, setFranchiseUser] = useState({
    name: "Sathya Networks",
    role: "Franchise Admin",
    zone: "Indiranagar - Sector 4"
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <DashboardPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="franchise"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <FranchisePage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="franchise-dashboard"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <FranchiseDashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="my-subscribers"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Mysubscribers />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="my-subscribers/:id"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <FranchiseDashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="subscribers"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <SubscribersPage />
              </Suspense>
            }
          />
          <Route
            path="subscribers/:id"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <SubscriberDetailPage />
              </Suspense>
            }
          />



          <Route
            path="field-staff"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <FieldStaffPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="local-staff"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <LocalStaff />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="collections"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Collections cashInHand={12450} setCashInHand={() => { }} />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="local-staff"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <LocalStaff />
                </Suspense>
              </ProtectedRoute>
            }
          /> */}

          {/* Billing - accessible to both admin and franchise */}
          <Route
            path="billing"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <BillingPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* Offers - accessible to both admin and franchise */}
          <Route
            path="offers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <OffersPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* Support - accessible to both admin and franchise */}
          <Route
            path="support"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <SupportPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="zone-support"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <ZoneSupport />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* Settings - accessible to both admin and franchise */}
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <SettingsPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Profile franchiseUser={franchiseUser} onUpdate={setFranchiseUser} />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

