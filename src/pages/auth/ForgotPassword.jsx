import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import ActivlineLogo from "../../logo/Logo";
import { useTheme } from "../../context/ThemeContext";

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const { isDark } = useTheme();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await new Promise((res) => setTimeout(res, 1000)); // mock API
      setSent(true);
      toast.success("Reset link sent to your email 📩");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden p-4 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div
          className={`relative rounded-2xl border p-8 shadow-2xl backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-slate-900/80"
              : "border-gray-200/50 bg-white/95"
          }`}
        >
          <div
            className={`absolute inset-0 rounded-2xl opacity-50 ${
              isDark
                ? "bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"
                : "bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50"
            }`}
          ></div>
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-6 flex justify-center">
                <ActivlineLogo
                  className={`h-12 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                />
              </div>
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Forgot Password
              </h1>
              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-slate-400" : "text-gray-600"
                }`}
              >
                We’ll send a reset link to your email
              </p>
            </div>

            {!sent ? (
              <Formik
                initialValues={{ email: "" }}
                validationSchema={forgotPasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-5">
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          isDark ? "text-slate-300" : "text-gray-700"
                        }`}
                      >
                        Email Address
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`mt-1 w-full rounded-xl border p-3.5 text-sm outline-none transition-all ${
                          isDark
                            ? "border-slate-700/50 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                            : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-xs text-red-400 mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 font-bold text-white shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all"
                    >
                      {isSubmitting ? "Sending..." : "Send Reset Link"}
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-green-400 text-sm">
                  Password reset link has been sent successfully.
                </p>
                <Link
                  to="/login"
                  className="inline-block text-blue-400 hover:underline text-sm"
                >
                  ← Back to Login
                </Link>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-xs text-slate-400 hover:underline"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
