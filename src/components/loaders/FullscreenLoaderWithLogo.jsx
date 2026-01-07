// components/FullScreenLoader.jsx
import ActivlineLogo from "../../logo/Logo";
import { useTheme } from "../../context/ThemeContext";

const FullScreenLoader = ({ show = true }) => {
  const { isDark } = useTheme();

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="flex flex-col items-center gap-6">

        {/* Logo animation */}
        <div className={`animate-pulse ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <ActivlineLogo className="h-20 w-auto" />
        </div>

        {/* Loading text */}
        <p className={`text-sm tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          LOADING
        </p>

        {/* Dots animation */}
        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-bounce" />
        </div>

      </div>
    </div>
  );
};

export default FullScreenLoader;
