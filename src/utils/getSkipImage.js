export const getSkipImage = (size) => {
  return new URL(`../assets/images/skips/${size}.jpg`, import.meta.url).href;
};
