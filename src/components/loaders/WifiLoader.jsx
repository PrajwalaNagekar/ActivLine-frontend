// import React from "react";
// import styled from "styled-components";

// const WifiLoader = ({ text = "Loading", size = 64 }) => {
//     return (
//         <StyledWrapper $size={size}>
//             <div id="wifi-loader">
//                 <svg className="circle-outer" viewBox="0 0 86 86">
//                     <circle className="back" cx="43" cy="43" r="40" />
//                     <circle className="front" cx="43" cy="43" r="40" />
//                 </svg>

//                 <svg className="circle-middle" viewBox="0 0 60 60">
//                     <circle className="back" cx="30" cy="30" r="27" />
//                     <circle className="front" cx="30" cy="30" r="27" />
//                 </svg>

//                 <svg className="circle-inner" viewBox="0 0 34 34">
//                     <circle className="back" cx="17" cy="17" r="14" />
//                     <circle className="front" cx="17" cy="17" r="14" />
//                 </svg>

//                 <div className="text" data-text={text} />
//             </div>
//         </StyledWrapper>
//     );
// };

// export default WifiLoader;

// /* ===================== STYLES ===================== */

// const StyledWrapper = styled.div`
//   #wifi-loader {
//     --front-color: #4f29f0;
//     --back-color: #c3c8de;
//     --text-color: #a1a1aa;

//     width: ${({ $size }) => $size}px;
//     height: ${({ $size }) => $size}px;

//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   #wifi-loader svg {
//     position: absolute;
//   }

//   #wifi-loader svg circle {
//     fill: none;
//     stroke-width: 6px;
//     stroke-linecap: round;
//     transform: rotate(-100deg);
//     transform-origin: center;
//   }

//   circle.back {
//     stroke: var(--back-color);
//   }

//   circle.front {
//     stroke: var(--front-color);
//   }

//   .circle-outer {
//     width: 86px;
//     height: 86px;
//   }

//   .circle-outer circle {
//     stroke-dasharray: 62.75 188.25;
//     animation: outer 1.8s ease infinite;
//   }

//   .circle-middle {
//     width: 60px;
//     height: 60px;
//   }

//   .circle-middle circle {
//     stroke-dasharray: 42.5 127.5;
//     animation: middle 1.8s ease infinite;
//   }

//   .circle-inner {
//     width: 34px;
//     height: 34px;
//   }

//   .circle-inner circle {
//     stroke-dasharray: 22 66;
//     animation: inner 1.8s ease infinite;
//   }

//   .text {
//     position: absolute;
//     bottom: -36px;
//     font-size: 14px;
//     font-weight: 500;
//   }

//   .text::before,
//   .text::after {
//     content: attr(data-text);
//   }

//   .text::before {
//     color: var(--text-color);
//   }

//   .text::after {
//     color: var(--front-color);
//     position: absolute;
//     left: 0;
//     animation: text 3.6s ease infinite;
//   }

//   @keyframes outer {
//     0% { stroke-dashoffset: 25; }
//     65% { stroke-dashoffset: 301; }
//     100% { stroke-dashoffset: 276; }
//   }

//   @keyframes middle {
//     0% { stroke-dashoffset: 17; }
//     65% { stroke-dashoffset: 204; }
//     100% { stroke-dashoffset: 187; }
//   }

//   @keyframes inner {
//     0% { stroke-dashoffset: 9; }
//     65% { stroke-dashoffset: 106; }
//     100% { stroke-dashoffset: 97; }
//   }

//   @keyframes text {
//     0% { clip-path: inset(0 100% 0 0); }
//     50% { clip-path: inset(0); }
//     100% { clip-path: inset(0 0 0 100%); }
//   }
// `;


import React from "react";
import styled from "styled-components";

const Loader = ({
  size = 64,
  text = "Loading",
  color = "#4f29f0",
}) => {
  return (
    <StyledWrapper $size={size} $color={color}>
      <div className="wifi-loader">
        <svg className="circle-outer" viewBox="0 0 86 86">
          <circle className="back" cx="43" cy="43" r="40" />
          <circle className="front" cx="43" cy="43" r="40" />
        </svg>

        <svg className="circle-middle" viewBox="0 0 60 60">
          <circle className="back" cx="30" cy="30" r="27" />
          <circle className="front" cx="30" cy="30" r="27" />
        </svg>

        <svg className="circle-inner" viewBox="0 0 34 34">
          <circle className="back" cx="17" cy="17" r="14" />
          <circle className="front" cx="17" cy="17" r="14" />
        </svg>

        <div className="text" data-text={text} />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wifi-loader {
    --front-color: ${({ $color }) => $color};
    --back-color: #c3c8de;
    --text-color: #414856;

    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    position: absolute;
  }

  circle {
    fill: none;
    stroke-width: 6px;
    stroke-linecap: round;
    transform: rotate(-100deg);
    transform-origin: center;
  }

  .back {
    stroke: var(--back-color);
  }

  .front {
    stroke: var(--front-color);
  }

  .circle-outer {
    width: 86px;
    height: 86px;
  }

  .circle-middle {
    width: 60px;
    height: 60px;
  }

  .circle-inner {
    width: 34px;
    height: 34px;
  }

  .circle-outer .back {
    animation: outer 1.8s ease infinite 0.3s;
  }

  .circle-outer .front {
    animation: outer 1.8s ease infinite 0.15s;
  }

  .circle-middle .back {
    animation: middle 1.8s ease infinite 0.25s;
  }

  .circle-middle .front {
    animation: middle 1.8s ease infinite 0.1s;
  }

  .circle-inner .back {
    animation: inner 1.8s ease infinite 0.2s;
  }

  .circle-inner .front {
    animation: inner 1.8s ease infinite 0.05s;
  }

  .text {
    position: absolute;
    bottom: -36px;
    font-size: 14px;
    font-weight: 500;
    text-transform: lowercase;
  }

  .text::before {
    content: attr(data-text);
    color: var(--text-color);
  }

  .text::after {
    content: attr(data-text);
    color: var(--front-color);
    position: absolute;
    left: 0;
    animation: text 3.6s ease infinite;
  }

  @keyframes outer {
    0% { stroke-dashoffset: 25; }
    65% { stroke-dashoffset: 301; }
    100% { stroke-dashoffset: 276; }
  }

  @keyframes middle {
    0% { stroke-dashoffset: 17; }
    65% { stroke-dashoffset: 204; }
    100% { stroke-dashoffset: 187; }
  }

  @keyframes inner {
    0% { stroke-dashoffset: 9; }
    65% { stroke-dashoffset: 106; }
    100% { stroke-dashoffset: 97; }
  }

  @keyframes text {
    0% { clip-path: inset(0 100% 0 0); }
    50% { clip-path: inset(0); }
    100% { clip-path: inset(0 0 0 100%); }
  }
`;

export default Loader;
