export const emptyPattern = Array(7).fill(Array(4).fill(false));

export const digitPatterns = {
    0: [
        [false, false, false, true, false],
        [false, false, true, true, false],
        [false, true, false, true, false],
        [false, false, false, true, false],
        [false, false, false, true, false],
        [false, false, false, true, false],
        [false, false, false, true, false],
    ], // 1
    1: [
        [false, true, true, true, false],
        [true, false, false, false, true],
        [false, false, false, false, true],
        [false, false, false, true, false],
        [false, false, true, false, false],
        [false, true, false, false, false],
        [true, true, true, true, true],
    ], // 2
    2: [
        [false, true, true, true, false],
        [true, false, false, false, true],
        [false, false, false, false, true],
        [false, false, true, true, false],
        [false, false, false, false, true],
        [true, false, false, false, true],
        [false, true, true, true, false],
    ], // 3
    3: [
        [false, false, false, true, false],
        [false, false, true, true, false],
        [false, true, false, true, false],
        [true, false, false, true, false],
        [true, true, true, true, true],
        [false, false, false, true, false],
        [false, false, false, true, false],
    ] // 4
}