// Utility function to select randomly select a number of elements from an array

export const pickRandom = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};