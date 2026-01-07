import React from 'react';
import transparentLogo from '../assets/images/Logo/TransparentLogo.png';

const ActivlineLogo = ({ className = "h-10" }) => (
  <img
    src={transparentLogo}
    alt="ActivLine"
    className={`${className} object-contain`}
  />
);

export default ActivlineLogo;