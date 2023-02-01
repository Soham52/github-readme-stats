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
    src: url(data:font-woff2;charset=utf-8;base64,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) format('woff2');
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
