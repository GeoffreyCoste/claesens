const DISTANCE = 75;

const TRANSITION_ENTER = {
    duration: 0.64,
    ease: [0.43, 0.13, 0.23, 0.96]
};

const TRANSITION_EXIT = {
    duration: 0.48,
    ease: [0.43, 0.13, 0.23, 0.96]
};

export const fadeInUpVariants = {
    hidden: {
        y: DISTANCE,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: TRANSITION_ENTER
    },
    exit: {
        y: DISTANCE,
        opacity: 0,
        transition: TRANSITION_EXIT
    }
};