import React from "react";
import { useTheme } from "../context/ThemeContext";

// ☀️ LIGHT MODE
import LightFullLogo from "../assets/images/Logo/activLine-final.png";
import LightIconLogo from "../assets/images/Logo/app_icon.png";

// 🌙 DARK MODE
import DarkFullLogo from "../assets/images/Logo/activLine-logo-dark.png.jpg";
import DarkIconLogo from "../assets/images/Logo/image.jpg";

const ActivlineLogo = ({ collapsed }) => {
  const { isDark } = useTheme();

  // 👉 COLLAPSED SIDEBAR (ICON)
  if (collapsed) {
    return (
      <img
        src={isDark ? DarkIconLogo : LightIconLogo}
        alt="Activline Icon"
        className="h-12 w-12 transition-all duration-300"
      />
    );
  }

  // 👉 EXPANDED SIDEBAR (FULL LOGO)
  return (
    <img
      src={isDark ? DarkFullLogo : LightFullLogo}
      alt="Activline Logo"
      className="h-14 w-auto transition-all duration-300"
    />
  );
};

export default ActivlineLogo;
