// Reference:
// https://stackoverflow.com/questions/13448374/how-to-sleep-the-thread-in-node-js-without-affecting-other-threads

const snooze = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { snooze };
