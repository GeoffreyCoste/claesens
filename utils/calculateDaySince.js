export const calculateDaysSince = (date) => {
    const currentDate = new Date();
    const startDate = new Date(date);
    const differenceInMilliseconds = currentDate - startDate;
    const millisecondsInOneDay = 1000 * 60 * 60 * 24;
    return Math.floor(differenceInMilliseconds / millisecondsInOneDay);
}