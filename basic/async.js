//async
const delay = ms => new Promise(res => setTimeout(res, ms));
const promise1 = async () => {
    await delay(1000);
    console.log('Promise 1 executed');
}
const promise2 = async () => {
    await delay(3000);
    console.log('Promise 2 executed');
}
(async () => {
    try {
        const start = new Date();
        await Promise.all([
            promise1(),
            promise2()
        ])
        const end = new Date() - start;

        console.log('Execution time: %dms', end);
    } catch (e) {
        console.log('Error');
    }
})();