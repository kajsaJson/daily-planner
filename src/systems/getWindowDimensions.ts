export const getWindowDimensions = (): { readonly windowWidth: number; readonly windowHeight: number } => {
  const { clientWidth, clientHeight } = document.documentElement;

  return {
    windowWidth: clientWidth,
    windowHeight: clientHeight,
  };
};
