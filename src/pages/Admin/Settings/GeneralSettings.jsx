


import { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import {
  getGeneralSettings,
  updateGeneralSettings,
} from "../../../api/generalSettings.api";

const GeneralSettings = () => {
  const { isDark } = useTheme();

  const [form, setForm] = useState({
    companyName: "",
    supportEmail: "",
    supportPhone: "",
    address: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* =========================
     LOAD SETTINGS (GET)
     ========================= */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getGeneralSettings();

        if (res.success && res.data) {
          setForm({
            companyName: res.data.companyName || "",
            supportEmail: res.data.supportEmail || "",
            supportPhone: res.data.supportPhone || "",
            address: res.data.address || "",
          });
        }
      } catch (error) {
        console.error("Failed to load general settings", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  /* =========================
     HANDLE CHANGE
     ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     SAVE SETTINGS (PUT)
     ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await updateGeneralSettings(form);
      if (res.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to update general settings", error);
    } finally {
      setIsSaving(false);
    }
  };

  /* =========================
     LOADING STATE
     ========================= */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className={isDark ? "text-gray-300" : "text-gray-600"}>
          Loading General Settings...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full p-0">

      {/* Header */}
      <div className="mb-4">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
          General Settings
        </h2>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Manage your company information and contact details
        </p>
      </div>

      {/* Success */}
      {showSuccess && (
        <div className={`mb-6 p-4 rounded-lg border ${
          isDark
            ? "bg-green-900/30 border-green-800 text-green-200"
            : "bg-green-50 border-green-200 text-green-800"
        }`}>
          ✅ Settings saved successfully!
        </div>
      )}

      {/* Form */}
      <div className={`rounded-xl p-3 border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Company Name
            </label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Support Email */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Support Email
            </label>
            <input
              type="email"
              name="supportEmail"
              value={form.supportEmail}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Support Phone (NEW) */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Support Mobile Number
            </label>
            <input
              type="tel"
              name="supportPhone"
              value={form.supportPhone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Address */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Company Address
            </label>
            <textarea
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg border resize-none ${
                isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Save */}
          <div className="pt-6 border-t flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-8 py-3 rounded-lg text-white ${
                isDark ? "bg-blue-600 hover:bg-blue-500" : "bg-gradient-to-r from-purple-600 to-indigo-600"
              } ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSaving ? "Saving..." : "Save General Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralSettings;
