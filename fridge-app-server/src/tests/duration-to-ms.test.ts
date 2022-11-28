import { durationToMs } from "../utils/duration-to-ms";

test('Converts 10 days to milliseconds', () => {
    expect(durationToMs("10d")).toBe(864000000);
});

test('Converts 3 months to milliseconds', () => {
    expect(durationToMs("3m")).toBe(7776000000);
});

test('Converts 1 year to milliseconds', () => {
    expect(durationToMs("1y")).toBe(31536000000);
});