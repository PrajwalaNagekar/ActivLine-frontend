import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
const GeneralSettings = () => {
  const [form, setForm] = useState({
    companyName: "ActivLine",
    supportEmail: "support@activline.in",
    address: "123 Internet Way, Tech City",
  });

  const { isDark } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSaving(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          General Settings
        </h2>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your company information and contact details
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className={`mb-6 p-4 rounded-lg flex items-center border ${isDark ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'}`}>
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className={`font-medium ${isDark ? 'text-green-200' : 'text-green-800'}`}>
            Settings saved successfully!
          </span>
        </div>
      )}

      {/* Settings Form */}
      <div className={`rounded-xl p-6 border ${isDark ? 'bg-gray-800 border-gray-700 shadow-xl shadow-black/20' : 'bg-white border-gray-200 shadow-sm'}`}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Company Name
              </label>
              <div className="relative">
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 outline-none focus:ring-2 ${isDark ? 'bg-gray-900 border-gray-700 text-white focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500/20 focus:border-purple-500'}`}
                  placeholder="Enter company name"
                />
                <div className="absolute right-3 top-3">
                  <svg className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                This name will appear on invoices and customer communications
              </p>
            </div>

            {/* Support Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Support Email
              </label>
              <div className="relative">
                <input
                  name="supportEmail"
                  type="email"
                  value={form.supportEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 outline-none focus:ring-2 ${isDark ? 'bg-gray-900 border-gray-700 text-white focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500/20 focus:border-purple-500'}`}
                  placeholder="support@company.com"
                />
                <div className="absolute right-3 top-3">
                  <svg className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Customers will contact this email for support inquiries
              </p>
            </div>

            {/* Company Address */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Company Address
              </label>
              <div className="relative">
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 outline-none resize-none focus:ring-2 ${isDark ? 'bg-gray-900 border-gray-700 text-white focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500/20 focus:border-purple-500'}`}
                  placeholder="Enter full company address"
                />
                <div className="absolute right-3 top-3">
                  <svg className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Official business address for legal and correspondence purposes
              </p>
            </div>

            {/* Form Actions */}
            <div className={`pt-6 border-t flex justify-end ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => setForm({
                  companyName: "ActivLine",
                  supportEmail: "support@activline.in",
                  address: "123 Internet Way, Tech City",
                })}
                className={`px-6 py-3 mr-3 font-medium rounded-lg transition-colors duration-200 ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`px-8 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 ${isDark ? 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900' : 'bg-gradient-to-r from-purple-600 to-indigo-600 focus:ring-purple-500'} ${
                  isSaving ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save General Settings'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-lg p-5 border ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-100'}`}>
          <div className="flex items-center mb-3">
            <div className={`p-2 rounded-lg mr-3 ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}>
              <svg className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Information Usage</h3>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            These details will be used across your platform, including invoices, customer communications, and legal documents.
          </p>
        </div>

        <div className={`rounded-lg p-5 border ${isDark ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-100'}`}>
          <div className="flex items-center mb-3">
            <div className={`p-2 rounded-lg mr-3 ${isDark ? 'bg-purple-800' : 'bg-purple-100'}`}>
              <svg className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Security</h3>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your company information is encrypted and stored securely. Only authorized personnel can modify these settings.
          </p>
        </div>

        <div className={`rounded-lg p-5 border ${isDark ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-100'}`}>
          <div className="flex items-center mb-3">
            <div className={`p-2 rounded-lg mr-3 ${isDark ? 'bg-green-800' : 'bg-green-100'}`}>
              <svg className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Real-time Updates</h3>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Changes take effect immediately across all systems. Customers will see updated information in their next interaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;