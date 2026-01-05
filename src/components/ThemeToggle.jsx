import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isDark 
          ? 'bg-slate-700 focus:ring-offset-slate-950' 
          : 'bg-gray-300 focus:ring-offset-white'
      }`}
      aria-label="Toggle theme"
      type="button"
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDark ? 'translate-x-7' : 'translate-x-1'
        }`}
      >
        <span className="flex h-full w-full items-center justify-center">
          {isDark ? (
            <Moon className="h-3.5 w-3.5 text-slate-700" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-yellow-500" />
          )}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;

