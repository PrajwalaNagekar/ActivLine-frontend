// components/FullScreenLoader.jsx
import ActivlineLogo from "../../logo/Logo";

const FullScreenLoader = ({ show = true }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-6">
        
        {/* Logo animation */}
        <div className="animate-pulse text-gray-900 dark:text-white">
          <ActivlineLogo className="h-14 w-auto" />
        </div>

        {/* Loading text */}
        <p className="text-sm tracking-widest text-gray-500">
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
