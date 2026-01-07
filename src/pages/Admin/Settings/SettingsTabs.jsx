import { useTheme } from "../../../context/ThemeContext";

const tabs = [
  { id: "general", label: "General" },
  { id: "canned", label: "Canned Responses" },
  { id: "api", label: "API Keys" },
];

const SettingsTabs = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`border-b flex gap-6 text-sm font-medium ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-2 ${
            activeTab === tab.id
              ? `border-b-2 ${isDark ? 'border-blue-500 text-blue-400' : 'border-purple-600 text-purple-600'}`
              : `${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-800'}`
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs;
