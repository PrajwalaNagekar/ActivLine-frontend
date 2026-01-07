import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Shield, Building2 } from "lucide-react";

import ActivlineLogo from "../../logo/Logo";
import { loginSchema } from "./schema.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import ThemeToggle from "../../components/ThemeToggle";
// import { loginApi } from "../../api/auth.api";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();
  const [apiError, setApiError] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin"); // 'admin' or 'franchise'
  const [showPassword, setShowPassword] = useState(false);

  // Role-based credentials
  const roleCredentials = {
    admin: {
      email: "admin@activline.in",
      password: "admin123",
    },
    franchise: {
      email: "sathya@activline-franchise.in",
      password: "franchise123",
    },
    staff: {
      email: "staff@activline.in",
      password: "staff123",
    },
  };



  const getInitialValues = () => ({
    email: roleCredentials[selectedRole].email,
    password: roleCredentials[selectedRole].password,
  });


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await new Promise((res) => setTimeout(res, 800)); // mock delay

      let loggedInRole = null;

      Object.keys(roleCredentials).forEach((role) => {
        if (
          values.email === roleCredentials[role].email &&
          values.password === roleCredentials[role].password
        ) {
          loggedInRole = role;
        }
      });

      if (!loggedInRole) {
        throw new Error("Invalid email or password");
      }

      const userData = {
        id:
          loggedInRole === "admin"
            ? "1"
            : loggedInRole === "franchise"
              ? "2"
              : "3",
        email: values.email,
        name:
          loggedInRole === "admin"
            ? "Super Admin"
            : loggedInRole === "franchise"
              ? "Franchise Admin"
              : "Staff User",
        role: loggedInRole,
        ...(loggedInRole === "franchise" && { franchiseId: "FR-101" }),
        ...(loggedInRole === "staff" && { staffId: "ST-201" }),
      };

      const token = "dummy-jwt-token";

      // ✅ STORE IN LOCAL STORAGE
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(userData));

      // optional if your context already does this
      login(userData, token);

      toast.success("Login successful 🚀");

      // ✅ ROLE BASED ROUTING
      if (loggedInRole === "admin") {
        navigate("/admin/dashboard");
      } else if (loggedInRole === "franchise") {
        navigate("/franchise-dashboard");
      } else {
        console.log("inside else");

        navigate("/staff/dashboard");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };




  return (
    <div className={`relative flex min-h-screen items-center justify-center overflow-hidden p-4 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      {/* Floating Glow Shapes Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orb - top left */}
        <div className={`absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-blue-500/20' : 'bg-purple-500/30'}`}></div>

        {/* Medium floating orb - bottom right */}
        <div className={`absolute -bottom-32 -right-32 h-80 w-80 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-purple-500/15' : 'bg-fuchsia-500/20'}`} style={{ animationDelay: '1s', animationDuration: '4s' }}></div>

        {/* Small floating orb - center right */}
        <div className={`absolute top-1/2 right-1/4 h-64 w-64 rounded-full blur-2xl animate-pulse ${isDark ? 'bg-cyan-500/10' : 'bg-violet-500/20'}`} style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

        {/* Glowing Grid pattern overlay */}
        <div className="absolute inset-0">
          {/* Base grid with glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              filter: 'blur(0.5px)',
            }}
          ></div>
          {/* Secondary grid layer for enhanced glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              filter: 'blur(1px)',
            }}
          ></div>
          {/* Subtle animated glow overlay */}
          <div
            className="absolute inset-0 opacity-10 animate-pulse"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              filter: 'blur(1.5px)',
              animationDuration: '4s',
            }}
          ></div>
        </div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500 ">
        <div className={`relative rounded-3xl border-2 p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-900/40' : 'border-purple-300/80 bg-white/90 ring-4 ring-purple-100/50'}`}>
          {/* Inner glow effect */}
          <div className={`absolute inset-0 rounded-2xl opacity-50 ${isDark ? 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' : 'bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50'}`}></div>

          <div className="relative z-10">
            {/* HEADER */}
            <div className="mb-8 flex flex-col items-center animate-in slide-in-from-top-4 duration-700">
              <div className="mb-6 transform transition-transform hover:scale-105">
                <ActivlineLogo className={`h-25 w-auto drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`} />
              </div>
              <h1 className={`text-3xl font-bold tracking-tight drop-shadow-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Sign In to Activline
              </h1>
              <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Sign in to manage your network
              </p>
            </div>

            {/* ROLE SELECTOR */}
            <Formik
              initialValues={getInitialValues()}
              enableReinitialize={true}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setValues }) => (
                <>
                  {/* <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Select Role
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRole("admin");
                          setValues({
                            email: roleCredentials.admin.email,
                            password: roleCredentials.admin.password,
                          });
                        }}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${selectedRole === "admin"
                          ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                          : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                          }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={`p-2 rounded-lg ${selectedRole === "admin"
                              ? "bg-blue-500/20"
                              : "bg-slate-700/50"
                              }`}
                          >
                            <Shield
                              className={`w-6 h-6 ${selectedRole === "admin"
                                ? "text-blue-400"
                                : "text-slate-400"
                                }`}
                            />
                          </div>
                          <div className="text-center">
                            <p
                              className={`text-sm font-semibold ${selectedRole === "admin"
                                ? "text-white"
                                : "text-slate-300"
                                }`}
                            >
                              Super Admin
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Full Access
                            </p>
                          </div>
                        </div>
                        {selectedRole === "admin" && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRole("franchise");
                          setValues({
                            email: roleCredentials.franchise.email,
                            password: roleCredentials.franchise.password,
                          });
                        }}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${selectedRole === "franchise"
                          ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                          : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                          }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={`p-2 rounded-lg ${selectedRole === "franchise"
                              ? "bg-purple-500/20"
                              : "bg-slate-700/50"
                              }`}
                          >
                            <Building2
                              className={`w-6 h-6 ${selectedRole === "franchise"
                                ? "text-purple-400"
                                : "text-slate-400"
                                }`}
                            />
                          </div>
                          <div className="text-center">
                            <p
                              className={`text-sm font-semibold ${selectedRole === "franchise"
                                ? "text-white"
                                : "text-slate-300"
                                }`}
                            >
                              Franchise Admin
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Limited Access
                            </p>
                          </div>
                        </div>
                        {selectedRole === "franchise" && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </button>
                    </div>
                  </div> */}

                  {/* FORM */}
                  <Form className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
                    {/* EMAIL */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        Email Address
                      </label>
                      <div className="relative group">
                        <Field
                          type="email"
                          name="email"
                          placeholder={roleCredentials[selectedRole].email}
                          className={`w-full rounded-xl border p-3.5 text-sm backdrop-blur-sm outline-none transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 ${isDark ? 'border-slate-700/50 bg-slate-800/50 text-white placeholder:text-slate-500 focus:bg-slate-800/70 group-hover:border-slate-600' : 'border-gray-300 bg-white/50 text-gray-900 placeholder:text-gray-400 focus:bg-white group-hover:border-gray-400'}`}
                        />
                        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                      </div>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-xs text-red-400 animate-in fade-in slide-in-from-top-1"
                      />
                    </div>

                    {/* PASSWORD */}
                    {/* <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-300">
                          Password
                        </label>
                        <span className="text-xs text-blue-400 transition-colors cursor-pointer hover:text-blue-300">
                          Forgot password?
                        </span>
                      </div>
                      <div className="relative group">
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 p-3.5 text-sm text-white backdrop-blur-sm outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-slate-800/70 focus:ring-2 focus:ring-blue-500/20 group-hover:border-slate-600"
                        />
                        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-xs text-red-400 animate-in fade-in slide-in-from-top-1"
                      />
                    </div> */}

                    {/* PASSWORD */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          Password
                        </label>
                        <span className={`text-xs cursor-pointer transition-colors ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>

                          <Link to="/forgot-password">Forgot password?</Link>
                        </span>
                      </div>

                      <div className="relative group">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter password"
                          className={`w-full rounded-xl border p-3.5 pr-12 text-sm backdrop-blur-sm outline-none transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 ${isDark ? 'border-slate-700/50 bg-slate-800/50 text-white placeholder:text-slate-500 focus:bg-slate-800/70 group-hover:border-slate-600' : 'border-gray-300 bg-white/50 text-gray-900 placeholder:text-gray-400 focus:bg-white group-hover:border-gray-400'}`}
                        />

                        {/* 👁 Eye Icon */}
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                      </div>

                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-xs text-red-400 animate-in fade-in slide-in-from-top-1"
                      />
                    </div>


                    {/* API ERROR */}
                    {apiError && (
                      <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 animate-in fade-in slide-in-from-top-2">
                        <p className="text-sm text-red-400 text-center">{apiError}</p>
                      </div>
                    )}

                    {/* SUBMIT */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group relative w-full overflow-hidden rounded-xl py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${isDark
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/25 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/30'
                        : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-purple-500/25 hover:from-purple-500 hover:to-fuchsia-500 hover:shadow-purple-500/30'
                        }`}
                    >
                      {/* Button glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        ) : (
                          "Sign In"
                        )}
                      </span>
                    </button>
                  </Form>
                </>
              )}
            </Formik>


          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
