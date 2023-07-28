export const keyframes = {
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
}
