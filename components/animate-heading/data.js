/* Homepage */
export const h2SectionWho = [{
    type: "heading2",
    text: "En bref."
}];

export const h2SectionSkills = [{
    type: "heading2",
    text: "Un service sur-mesure."
}];

export const h2SectionProcess = [{
    type: "heading2",
    text: "De l'idée à l'oeuvre."
}];

export const h2SectionRelease = [{
    type: "heading2",
    text: "Zoom."
}];

export const h2FooterAsideHome = [{
    type: "heading2",
    text: "Redessinez vos contours."
}];

/* About page */
export const h1SectionAbout = [{
    type: "heading1",
    text: "Emilie Claesens."
}];

export const h2SectionAboutOrigin = [{
    type: "heading2",
    text: "Point de départ."
}];
export const h2SectionAboutPanorama = [{
    type: "heading2",
    text: "Mise en perspective."
}];

export const h2SectionAboutOverview = [{
            type: "heading2",
            text: "Tour d'horizon."
}];

/* Services page */
export const h1SectionServices = [{
    type: "heading1",
    text: "Un écosystème dédié à votre image."
}];

export const h2SectionServicesDetails = [{
    type: "heading2",
    text: "Stratégie, design, impact."
}];

export const h2FooterAsideServices = [{
    type: "heading2",
    text: "Déployez votre univers."
}];

/* Method page */
export const h1SectionMethod = [{
    type: "heading1",
    text: "Un cercle vertueux."
}];

export const h2SectionMethodInterlude = [{
    type: "heading2",
    text: "L'essence du design : une boucle continue."
}];

export const h2FooterAsideMethod = [{
    type: "heading2",
    text: "Tout (re)commence ici."
}];

/* Realization page */
export const h2FooterAsideRealization = [{
    type: "heading2",
    text: "Restez dans la boucle."
}];

export const h2FooterAsideRealizationMask = [{
    type: "heading2",
    text: "Ou créez votre boucle."
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