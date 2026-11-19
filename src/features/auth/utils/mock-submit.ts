export function simulateMockSubmission(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 600);
  });
}
