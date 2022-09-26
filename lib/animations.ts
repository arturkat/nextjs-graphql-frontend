const slideUp = {
  name: "Slide Up",
  variants: {
    initial: {
      x: 0,
      y: -50,
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: 0,
      y: 50,
      opacity: 0,
      scale: 0.95,
    },
  },
  transition: {
    duration: 0.35,
    ease: "easeInOut",
  },
};

const fadeBack = {
  name: "Fade Back",
  variants: {
    initial: {
      opacity: 0,
      scale: 0.4,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.4,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const rotateY = {
  name: "Rotate Y",
  variants: {
    initial: {
      rotateY: 90,
    },
    animate: {
      rotateY: 0,
    },
    exit: {
      rotateY: 90,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const rotateX = {
  name: "Rotate X",
  variants: {
    initial: {
      rotateZ: 90,
      opacity: 0,
      scale: 0.6,
    },
    animate: {
      opacity: 1,
      rotateZ: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      rotateZ: 90,
      scale: 0.6,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const rotateZ = {
  name: "Rotate Z",
  variants: {
    initial: {
      opacity: 0,
      rotateZ: 360,
    },
    animate: {
      opacity: 1,
      rotateZ: 0,
    },
    exit: {
      opacity: 0,
      rotateZ: 360,
    },
  },
  transition: {
    duration: 0.7,
  },
};

export const animations = { slideUp, fadeBack, rotateX, rotateY, rotateZ };
