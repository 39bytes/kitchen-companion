const YEAR = 365 * 24 * 60 * 60 * 1000;
const MONTH = 30 * 24 * 60 * 60 * 1000;
const WEEK = 7 * 24 * 60 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

export const msToDurationString = (duration: number) => {
    const years = Math.floor(duration / YEAR);
    duration = duration % YEAR;

    const months = Math.floor(duration / MONTH);
    duration = duration % MONTH;

    const weeks = Math.floor(duration / WEEK);
    duration = duration % WEEK;

    const days = Math.floor(duration / DAY);
    // let durationStr = "";
    if (years > 0) {
        return `${years} year` + (years === 1 ? "" : "s");
    }
    if (months > 0) {
        return `${months} month` + (months === 1 ? "" : "s");
    }
    if (weeks > 0) {
        return `${weeks} week` + (weeks === 1 ? "" : "s");
    }
    return `${days} day` + (days === 1 ? "" : "s");
}