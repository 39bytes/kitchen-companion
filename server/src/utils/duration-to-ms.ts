export const durationToMs = (duration: string) => {
    // y = year
    // m = month
    // w = week
    // d = day
    // h = hour

    // Input duration string must be a number followed by the unit (no spaces)
    // Ex: 24d => 24 days

    const amount = parseInt(duration.slice(0, duration.length - 1));
    const unit = duration[duration.length - 1];

    switch (unit) {
        case "y":
            return amount * 365 * 24 * 60 * 60 * 1000;
        case "m":
            return amount * 30 * 24 * 60 * 60 * 1000;
        case "w":
            return amount * 7 * 24 * 60 * 60 * 1000;
        case "d":
            return amount * 24 * 60 * 60 * 1000;
        case "h":
            return amount * 60 * 60 * 1000;
    }

}