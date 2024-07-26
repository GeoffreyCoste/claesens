export const h2SectionWho = [{
    type: "heading2",
    text: "En bref."
}];

export const h2SectionProcess = [{
    type: "heading2",
    text: "De l'idée à l'oeuvre."
}];

export const h2SectionRelease = [{
    type: "heading2",
    text: "Un échantillon."
}];

export const h1SectionAbout = [{
    type: "heading1",
    text: "Découvrez-moi sous toutes mes facettes."
}];

export const h1SectionServices = [{
    type: "heading1",
    text: "Un écosystème dédié à votre image."
}];

export const h1SectionMethod = [{
    type: "heading1",
    text: "Un cercle vertueux."
}];

export const tags = {
    heading1: "h1",
    heading2: "h2",
}

export const charVariants = {
    hidden: {
        y: '200%',
        opacity: 0,
        transition: {
            ease: [0.455, 0.03, 0.515, 0.955],
            duration: 0.85
        }
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: [0.455, 0.03, 0.515, 0.955],
            duration: 0.75
        }
    }
};

export const dotVariants = {
    hidden: {
        x: '200%',
        opacity: 0,
        transition: {
            ease: [0.4, 0, 0.2, 1], // Bézier curve to simulate braking
            duration: 0.85,
            type: 'spring',
            damping: 20, // Reduce bouncing
            stiffness: 300 // Increase rigidity
        }
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            ease: [0.4, 0, 0.2, 1], // Bézier curve to simulate braking
            duration: 1.5,
            delay: 1,
            type: 'spring',
            damping: 20, // Reduce bouncing
            stiffness: 300 // Increase rigidity
        }
    }
};