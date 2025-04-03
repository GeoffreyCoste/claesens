import { useMemo, useRef } from 'react';

/**
 * Hook qui transforme les données d'origine en un tableau de slides "tripled"
 * et les fait pivoter selon l'index courant.
 *
 * @param {Object} params
 * @param {Array} params.datas - Les données d'origine.
 * @param {number} params.minSlides - Le nombre minimum de slides requis.
 * @param {number} params.currentIndex - L'index courant qui servira pour la rotation.
 * @param {string|null} params.slug - Le slug (peut être null ou undefined).
 *
 * @returns {Object} Un objet contenant :
 *  - slidesData: Le tableau de slides transformé.
 *  - triplets: Le tableau des triplets associés aux slides.
 */
const useSliderData = ({ datas, minSlides, currentIndex, slug }) => {
  // Ces refs mémorisent le dernier slug rencontré, l'offset associé,
  // et la valeur de currentIndex au moment où le slug a été utilisé.
  const lastSlugRef = useRef(null);
  const lastOffsetRef = useRef(null);
  const baseCurrentIndexRef = useRef(currentIndex);

  return useMemo(() => {
    if (!datas || datas.length < minSlides) {
      return { slidesData: [], triplets: [] };
    }

    // Création des triplets (pour information)
    const triplets = [];
    for (let i = 0; i < datas.length; i++) {
      triplets.push([i, i + datas.length, i + 2 * datas.length]);
    }

    // Création du tableau "tripled" : trois copies de datas
    const tripled = [...datas, ...datas, ...datas].map((item, index) => {
      const originalIndex = index % datas.length;
      const dupIndex = Math.floor(index / datas.length);
      return {
        ...item,
        tripletIndex: index, // valeur initiale (sera éventuellement recalculée)
        key: `${originalIndex}-${dupIndex}`,
      };
    });

    // Calcul de l'index central dans une copie d'origine (taille d'une copie = datas.length)
    const isEven = datas.length % 2 === 0;
    const centerIndex = isEven
      ? Math.floor(datas.length / 2)
      : Math.ceil(datas.length / 2) - 1;

    // Fonction utilitaire de rotation
    const arrayRotate = (arr, n) => {
      const len = arr.length;
      const normalized = ((n % len) + len) % len;
      return [...arr.slice(normalized), ...arr.slice(0, normalized)];
    };

    let effectiveOffset;
    let slidesData;

    if (slug) {
      // Cas où un slug est fourni
      if (lastSlugRef.current !== slug) {
        // Nouveau slug rencontré : rechercher dans l'ensemble du tableau 'tripled'
        const matchingIndices = tripled
          .map((slide, index) => (slide.path === slug ? index : -1))
          .filter((index) => index !== -1);

        if (matchingIndices.length > 0) {
          // Choisir l'indice qui est le plus proche de currentIndex (l'élément actuellement centré)
          const foundIndex = matchingIndices.reduce((prev, curr) =>
            Math.abs(curr - currentIndex) < Math.abs(prev - currentIndex)
              ? curr
              : prev
          );
          // Calcul de l'offset pour que l'élément trouvé se retrouve à la position centerIndex
          const newOffset = foundIndex - centerIndex;
          // Mémorisation
          lastSlugRef.current = slug;
          lastOffsetRef.current = newOffset;
          baseCurrentIndexRef.current = currentIndex;
          effectiveOffset = newOffset;
        } else {
          // Aucun élément ne correspond : on revient à la rotation par défaut
          effectiveOffset = currentIndex - centerIndex;
        }
      } else {
        // Même slug que précédemment : ajuster l'offset en fonction du delta de scroll
        effectiveOffset =
          lastOffsetRef.current + (currentIndex - baseCurrentIndexRef.current);
      }
      slidesData = arrayRotate(tripled, effectiveOffset);
    } else {
      // Cas où aucun slug n'est fourni
      if (lastSlugRef.current !== null) {
        // Si un slug avait déjà été utilisé, on conserve son offset et on l'ajuste par le scroll
        effectiveOffset =
          lastOffsetRef.current + (currentIndex - baseCurrentIndexRef.current);
        slidesData = arrayRotate(tripled, effectiveOffset);
      } else {
        // Rotation par défaut
        slidesData = arrayRotate(tripled, currentIndex - centerIndex);
      }
    }

    return { slidesData, triplets };
  }, [datas, minSlides, currentIndex, slug]);
};

export default useSliderData;





/******* BEST BEFORE *******/

/* import {useMemo} from 'react';

/**
 * Hook qui transforme les données d'origine en un tableau de slides "tripled"
 * et les fait pivoter selon l'index courant.
 *
 * @param {Object} params
 * @param {Array} params.datas - Les données d'origine.
 * @param {number} params.minSlides - Le nombre minimum de slides requis.
 * @param {number} params.currentIndex - L'index courant qui servira pour la rotation.
 *
 * @returns {Object} Un objet contenant :
 *  - slidesData: Le tableau de slides transformé.
 *  - triplets: Le tableau des triplets associés aux slides.
 *
const useSliderData = ({datas, minSlides, currentIndex, slug}) => {
  return useMemo(() => {
    // Si les données ne sont pas suffisantes, renvoyer un tableau vide
    if (!datas || datas.length < minSlides) {
      return {slidesData: [], triplets: []};
    }

    // Création des triplets : pour chaque élément de datas, on crée un triplet
    const triplets = [];
    for (let i = 0; i < datas.length; i++) {
      triplets.push([i, i + datas.length, i + 2 * datas.length]);
    }

    // Création du tableau "tripled" : trois copies de datas
    const tripled = [...datas, ...datas, ...datas].map((item, index) => {
      const originalIndex = index % datas.length; // indice d'origine entre 0 et datas.length - 1
      const dupIndex = Math.floor(index / datas.length); // copie 0, 1 ou 2
      return {
        ...item,
        tripletIndex: index,
        key: `${originalIndex}-${dupIndex}`
      };
    });

    // Calcul de l'index central pour repositionner les slides
    const isEven = datas.length % 2 === 0;
    const centerIndex = isEven
      ? Math.floor(datas.length / 2)
      : Math.ceil(datas.length / 2) - 1;

    // Fonction utilitaire pour faire pivoter un tableau de n positions
    const arrayRotate = (arr, n) => {
      const len = arr.length;
      const normalized = ((n % len) + len) % len; // Pour gérer les rotations négatives
      return [...arr.slice(normalized), ...arr.slice(0, normalized)];
    };

    // On effectue la rotation en fonction de l'index courant et du centre
    let slidesData = arrayRotate(tripled, currentIndex - centerIndex);

    if (slug) {
      console.log('Before update: ', slidesData);
    
      // Recherche dans la copie centrale
      const middleCopy = tripled.slice(datas.length, 2 * datas.length);
      const matchingIndex = middleCopy.findIndex(slide => slide.path === slug);
      
      if (matchingIndex !== -1) {
        const indexInTripled = matchingIndex + datas.length; // Index absolu dans tripled
        console.log('Matching slide index in tripled: ', indexInTripled);
        slidesData = arrayRotate(tripled, indexInTripled - centerIndex);
      }
    }


    return {slidesData, triplets};
  }, [datas, minSlides, currentIndex, slug]);
};

export default useSliderData; */

