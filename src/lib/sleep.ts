export const sleep = (ms: number = 1000) => {
    return new Promise((resuelve) => setTimeout(resuelve, ms));
}