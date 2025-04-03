import Lenis from '@studio-freight/lenis';

let lenis;

export const getLenisInstance = () => {
    if (!lenis) {
        lenis = new Lenis({
            smooth: true,
            // smoothWheel: true, // Active le lissage du défilement
            // wheelFactor: 15, // Facteur de lissage plus lent pour un effet plus doux
            // lerp: 0.5, // Définit la durée du lissage (ajustez selon votre besoin)

            // smoothTouch: false, // 🔹 Désactive le lissage sur mobile
            // syncTouch: true, // 🔹 Essaye d'aligner le scroll avec les interactions tactiles
            // wheelMultiplier: 1, // 🔹 Réduit l'effet d'accélération sur le scroll
            // lerp: 0.05, // 🔹 Rend le scroll plus réactif

            //smoothWheel: true,
            //wheelFactor: 10, // Réduire de 15 à 10 pour un mouvement plus doux
            //lerp: 0.05, // Réduire de 0.5 à 0.05 pour une interpolation plus progressive
            //touchMultiplier: 1.5, // Ajouter cette option pour améliorer l'expérience tactile
            //touchInertiaMultiplier: 2, // Aider à créer un effet d'inertie naturel
        });
    }
    return lenis;
};