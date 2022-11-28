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
    let durationStr = "";
    if (years > 0) {
        return `${years}y`;
    }
    if (months > 0) {
        return `${months}mo`;
    }
    if (weeks > 0) {
        return `${weeks}w`;
    }
    return `${days}d`;
    // What if the food is already expired?

}