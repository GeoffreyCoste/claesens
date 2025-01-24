import {
    ScrollTrigger
} from 'gsap/ScrollTrigger';

export const syncLenisWithScrollTrigger = (lenis) => {
    const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);

        // Synchronize with GSAP
        ScrollTrigger.update();
    };

    requestAnimationFrame(raf);
};
