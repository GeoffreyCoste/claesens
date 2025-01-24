import Lenis from '@studio-freight/lenis';

let lenis;

export const getLenisInstance = () => {
    if (!lenis) {
        lenis = new Lenis({
            smooth: true
        });
    }
    return lenis;
};