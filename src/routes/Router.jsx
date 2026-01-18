import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layout/MainLayout";
// import SubscriberDetailPage from "../pages/Admin/CustomerDetails";
// import SubscribersPage from "../pages/Admin/Customers";
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage.jsx"));

// Admin
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DashboardPage = lazy(() =>
  import("../pages/Admin/DashboardPage/DashboardPage")
);
const Customers = lazy(() => import("../pages/Admin/Customers"));
const CustomerDetails = lazy(() => import("../pages/Admin/CustomerDetails"));
const FieldStaffPage = lazy(() => import("../pages/Admin/FieldStaffPage"));
const Staff = lazy(() => import("../pages/Admin/Staff"));
const Reports = lazy(() => import("../pages/Admin/Reports"));
const Logs = lazy(() => import("../pages/Admin/Logs"));
const Plans = lazy(() => import("../pages/Admin/Plans"));
const Payments = lazy(() => import("../pages/Admin/Payments"));
const OffersPage = lazy(() => import("../pages/Admin/OffersPage"));
const Tickets = lazy(() => import("../pages/Admin/Tickets"));
const SettingsPage = lazy(() => import("../pages/Admin/Settings/SettingsPage"));
const AdminNotifications = lazy(() =>
  import("../pages/Admin/Notification/AdminNotification")
);
const FranchiseNotifications = lazy(() =>
  import("../pages/Franchise/Notification/FranchiseNotification")
);
const StaffNotifications = lazy(() =>
  import("../pages/Staff/Notification/StaffNotification")
);

const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const FranchisePage = lazy(() => import("../pages/Admin/Franchise"));

//franchise
const FranchiseDashboard = lazy(() =>
  import("../pages/Franchise/Dashboard/Dashboard")
);
// const Mysubscribers = lazy(() => import('../pages/Franchise/Customers'));
const LocalStaff = lazy(() => import("../pages/Franchise/LocalStaff"));
const Collections = lazy(() => import("../pages/Franchise/Collections"));
// const ZoneSupport = lazy(() => import('../pages/Franchise/ZoneSupport'));
const Profile = lazy(() => import("../pages/Franchise/Profile"));

//staff
const AssignedTickets = lazy(() => import("../pages/Staff/AssignedTickets"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="text-slate-400">Loading...</div>
  </div>
);

// Public route wrapper (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const ProfileSwitcher = ({ franchiseUser, onUpdate }) => {
  const { user } = useAuth();
  if (user?.role === 'franchise') {
    return <Profile franchiseUser={franchiseUser} onUpdate={onUpdate} />;
  }
  return <ProfilePage />;
};

const Router = () => {
  const [franchiseUser, setFranchiseUser] = useState({
    name: "Sathya Networks",
    role: "Franchise Admin",
    zone: "Indiranagar - Sector 4",
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

          {/* 🔔 NOTIFICATIONS */}
          <Route
            path="admin-notifications"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                
                  <AdminNotifications />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="franchise-notifications"
            element={
              <ProtectedRoute allowedRoles={["franchise"]}>
                
                  <FranchiseNotifications />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="staff-notifications"
            element={
              <ProtectedRoute allowedRoles={["staff", "admin_staff"]}>
                
                  <StaffNotifications />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "admin_staff"]}>
                
                  <DashboardPage />
                
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="franchise"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Suspense >
                  <FranchisePage />
                
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="franchise-dashboard"
            element={
              <ProtectedRoute allowedRoles={["franchise"]}>
                
                  <FranchiseDashboard />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="my-customers"
            element={
              <ProtectedRoute allowedRoles={["franchise"]}>
                
                  <Customers />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="my-customers-details/:id"
            element={
              <ProtectedRoute allowedRoles={["franchise"]}>
                
                  <CustomerDetails />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="customers"
            element={
              
                <Customers />
              
            }
          />
          <Route
            path="customer-details/:id"
            element={
              
                <CustomerDetails />
              
            }
          />

          <Route
            path="field-staff"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                
                  <FieldStaffPage />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="local-staff"
            element={
              <ProtectedRoute allowedRoles={["franchise"]}>
                
                  <LocalStaff />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="collections"
            element={
              <ProtectedRoute allowedRoles={["franchise"]}>
                
                  <Collections cashInHand={12450} setCashInHand={() => {}} />
                
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="local-staff"
            element={
              <ProtectedRoute allowedRoles={['franchise']}>
                <Suspense >
                  <LocalStaff />
                
              </ProtectedRoute>
            }
          /> */}

          {/* Billing - accessible to both admin and franchise */}
          <Route
            path="payments"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                
                  <Payments />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="staff"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                
                  <Staff />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "admin_staff"]}>
                
                  <Reports />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="logs"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "admin_staff"]}>
                
                  <Logs />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="plans"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "admin_staff"]}>
                
                  <Plans />
                
              </ProtectedRoute>
            }
          />

          {/* Offers - accessible to both admin and franchise */}
          <Route
            path="offers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                
                  <OffersPage />
                
              </ProtectedRoute>
            }
          />

          {/* Support - accessible to both admin and franchise */}
          <Route
            path="tickets"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                
                  <Tickets />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="Zone-tickets"
            element={
              <ProtectedRoute allowedRoles={["franchise"]}>
                
                  <Tickets />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="assigned-tickets"
            element={
              <ProtectedRoute allowedRoles={["staff", "admin_staff"]}>
                
                  <AssignedTickets />
                
              </ProtectedRoute>
            }
          />
          {/* Settings - accessible to both admin and franchise */}
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "admin_staff"]}>
                
                  <SettingsPage />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={["admin", "franchise", "staff", "admin_staff"]}>
                <ProfileSwitcher
                  franchiseUser={franchiseUser}
                  onUpdate={setFranchiseUser}
                />
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
