export const keyframes = {
  rotateDashedBorder: {
    from: {
      backgroundPosition: '0 0, -34px 0, 100% -34px, 0 100%',
    },
    to: {
      backgroundPosition: '0 -34px, 0 0, 100% 0, -34px 100%',
    },
  },
  slideUpAndFade: {
    from: {
      opacity: 0,
      transform: 'translateY(2px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  slideRightAndFade: {
    from: {
      opacity: 0,
      transform: 'translateY(-2px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  slideDownAndFade: {
    from: {
      opacity: 0,
      transform: 'translateY(-2px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  slideLeftAndFade: {
    from: {
      opacity: 0,
      transform: 'translateY(2px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  overlayShow: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  contentShow: {
    from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
    to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  },
  enterFromRight: {
    from: { opacity: 0, transform: 'translateX(200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  enterFromLeft: {
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  exitToRight: {
    from: { opacity: 1, transform: 'translateX(0)' },
    to: { opacity: 0, transform: 'translateX(200px)' },
  },
  exitToLeft: {
    from: { opacity: 1, transform: 'translateX(0)' },
    to: { opacity: 0, transform: 'translateX(-200px)' },
  },
  scaleIn: {
    from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
    to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
  },
  scaleOut: {
    from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
    to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  'bounce-in-top': {
    '0%': {
      transform: 'translateY(-500px)',
      'animation-timing-function': 'ease-in',
      opacity: 0,
    },
    '38%': {
      transform: 'translateY(0)',
      'animation-timing-function': 'ease-out',
      opacity: 1,
    },
    '55%': {
      transform: 'translateY(-65px)',
      'animation-timing-function': 'ease-in',
    },
    '72%': {
      transform: 'translateY(0)',
      'animation-timing-function': 'ease-out',
    },
    ' 81%': {
      transform: 'translateY(-28px)',
      'animation-timing-function': 'ease-in',
    },
    '90%': {
      transform: 'translateY(0)',
      'animation-timing-function': 'ease-out',
    },
    '95%': {
      transform: 'translateY(-8px)',
      'animation-timing-function': 'ease-in',
    },
    '100%': {
      transform: 'translateY(0)',
      'animation-timing-function': 'ease-out',
    },
  },
}
