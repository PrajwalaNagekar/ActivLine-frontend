import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import ActivlineLogo from "../logo/Logo";
import { loginSchema } from "./auth/schema";
// import { loginApi } from "../../api/auth.api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const initialValues = {
    email: "admin@activline.in",
    password: "password",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setApiError("");

    try {
      // 🔹 FUTURE: replace mock with real API
      // const data = await loginApi(values);

      // MOCK (remove when backend is ready)
      await new Promise((res) => setTimeout(res, 1000));
      localStorage.setItem("token", "token from backend");
      localStorage.setItem("admin", "admin@activline.in");
      // Example after API:
      // localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      setApiError(error?.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Floating Glow Shapes Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orb - top left */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
        
        {/* Medium floating orb - bottom right */}
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        
        {/* Small floating orb - center right */}
        <div className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-2xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        
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

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="relative rounded-2xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:p-[1px] before:-z-10 before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:xor]">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-50"></div>
          
          <div className="relative z-10">
            {/* HEADER */}
            <div className="mb-8 flex flex-col items-center animate-in slide-in-from-top-4 duration-700">
              <div className="mb-6 transform transition-transform hover:scale-105">
                <ActivlineLogo className="h-12 w-auto text-white drop-shadow-lg" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                Activline Admin
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Sign in to manage your network
              </p>
            </div>

            {/* FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
                  {/* EMAIL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Field
                        type="email"
                        name="email"
                        placeholder="admin@company.com"
                        className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 p-3.5 text-sm text-white backdrop-blur-sm outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-slate-800/70 focus:ring-2 focus:ring-blue-500/20 group-hover:border-slate-600"
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
                  <div className="space-y-2">
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
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 p-3.5 text-sm text-white backdrop-blur-sm outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-slate-800/70 focus:ring-2 focus:ring-blue-500/20 group-hover:border-slate-600"
                      />
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
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-500 hover:to-blue-400 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
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
              )}
            </Formik>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Protected by Activline Secure Access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
