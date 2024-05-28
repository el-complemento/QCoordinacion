export const loadAbort = () => {
  const controller = new AbortController();
  return { controller, signal: controller.signal };
};
