import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layout/MainLayout';
import SubscriberDetailPage from '../pages/Admin/CustomerDetails';
import SubscribersPage from '../pages/Admin/Customers';

// Admin
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const DashboardPage = lazy(() => import('../pages/Admin/DashboardPage'));
const Customers = lazy(() => import('../pages/Admin/Customers'));
const CustomerDetails = lazy(() => import('../pages/Admin/CustomerDetails'));
const FieldStaffPage = lazy(() => import('../pages/Admin/FieldStaffPage'));
const Staff = lazy(() => import('../pages/Admin/Staff'));
const Reports = lazy(() => import('../pages/Admin/Reports'));
const Logs = lazy(() => import('../pages/Admin/Logs'));
const Plans = lazy(() => import('../pages/Admin/Plans'));
const Payments = lazy(() => import('../pages/Admin/Payments'));
const OffersPage = lazy(() => import('../pages/Admin/OffersPage'));
const Tickets = lazy(() => import('../pages/Admin/tickets'));
const SettingsPage = lazy(() => import('../pages/Admin/SettingsPage'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const FranchisePage = lazy(() => import('../pages/Admin/Franchise'));

//franchise
const FranchiseDashboard = lazy(() => import('../pages/Franchise/Dashboard'));
// const Mysubscribers = lazy(() => import('../pages/Franchise/Customers'));
const LocalStaff = lazy(() => import('../pages/Franchise/LocalStaff'));
const Collections = lazy(() => import('../pages/Franchise/Collections'));
// const ZoneSupport = lazy(() => import('../pages/Franchise/ZoneSupport'));
const Profile = lazy(() => import('../pages/Franchise/Profile'));


//staff
const AssignedTickets=lazy(()=>import('../pages/Staff/AssignedTickets'))


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
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <Suspense fallback={<LoadingFallback />}>
                  <DashboardPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="franchise"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <FranchisePage />
                </Suspense>
              </ProtectedRoute>
            }
          /> */}
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
            path="my-customers"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Customers />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="my-customers-details/:id"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <CustomerDetails />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="customers"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Customers />
              </Suspense>
            }
          />
          <Route
            path="customer-details/:id"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <CustomerDetails />
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
            path="payments"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Payments />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="staff"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Staff />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Reports />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="logs"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Logs />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="plans"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Plans />
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
            path="tickets"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Tickets />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="Zone-tickets"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense fallback={<LoadingFallback />}>
                  <Tickets />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="assigned-tickets"
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <Suspense fallback={<LoadingFallback />}>
                  <AssignedTickets />
                </Suspense>
              </ProtectedRoute>
            }
          />
          {/* Settings - accessible to both admin and franchise */}
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
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

