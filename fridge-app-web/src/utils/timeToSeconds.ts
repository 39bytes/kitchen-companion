export const timeToSeconds = (time: number, unit: "d" | "w" | "m" | "y") => {
    if (unit == "d") {
        return time * 60 * 60 * 24;
    }
    if (unit == "w") {
        return time * 60 * 60 * 24 * 7;
    }
    if (unit == "m") {
        return time * 60 * 60 * 24 * 7 * 30;
    }
    if (unit == "y") {
        return time * 60 * 60 * 24 * 7 * 30 * 365;
    }
};
