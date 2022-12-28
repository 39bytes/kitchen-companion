import { msToDurationString } from "./msToDurationString"

export const timeBetween = (start: number, end: number) => {
    return msToDurationString(end - start);
}