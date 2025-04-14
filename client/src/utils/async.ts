export function delayedPromise(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
