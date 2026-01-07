import React, { useState } from "react";
import SettingsTabs from "./SettingsTabs";
import GeneralSettings from "./GeneralSettings";
import CannedResponses from "../Settings/CannedResponses/CannedResponses";
import ApiKeys from "./ApiKeys";
import { useTheme } from "../../../context/ThemeContext";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { isDark } = useTheme();

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</h1>

      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={`mt-6 rounded-lg shadow p-6 max-w-5xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}>
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "canned" && <CannedResponses />}
        {activeTab === "api" && <ApiKeys />}
      </div>
    </div>
  );
};

export default SettingsPage;
