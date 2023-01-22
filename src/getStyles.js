// @ts-check
/**
 * @param {number} value
 */
const calculateCircleProgress = (value) => {
  const radius = 180;
  const c = Math.PI * (radius * 2);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  return ((100 - value) / 100) * c;
};

/**
 *
 * @param {{progress: number}} param0
 * @returns
 */
const getProgressAnimation = ({ progress }) => {
  return `
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: ${calculateCircleProgress(0)};
      }
      to {
        stroke-dashoffset: ${calculateCircleProgress(progress)};
      }
    }
  `;
};

const getAnimations = () => {
  return `
    /* Animations */
    @keyframes scaleInAnimation {
      from {
        transform: translate(-5px, 5px) scale(0);
      }
      to {
        transform: translate(-5px, 5px) scale(1);
      }
    }
    @keyframes fadeInAnimation {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
};

/**
 * @param {{
 *  titleColor?: string | string[]
 *  textColor?: string | string[]
 *  iconColor?: string | string[]
 *  show_icons?: boolean;
 *  progress?: number;
 * }} args
 */
const getStyles = ({
  titleColor,
  textColor,
  iconColor,
  show_icons,
  progress,
}) => {
  return `
    @font-face {
    font-family: 'VT323';
    src: url('src/common/VT323-Regular.ttf') format('truetype');
    }
    .stat {
      font: 600 18px 'VT323', monospace; fill: ${textColor};
      letter-spacing: 0.01rem;
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 50px 'VT323', monospace; fill: ${textColor};
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    
    .not_bold { font-weight: 400 }
    .bold { font-weight: 700 }
    .icon {
      fill: ${iconColor};
      display: ${!!show_icons ? "block" : "none"};
    }

    .rank-circle-rim {
      stroke: ${titleColor};
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: ${titleColor};
      stroke-dasharray: 280;
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }
    ${process.env.NODE_ENV === "test" ? "" : getProgressAnimation({ progress })}
  `;
};

export { getStyles, getAnimations };
