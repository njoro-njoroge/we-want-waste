export const BASE_URL = "https://app.wewantwaste.co.uk/api";

export const endpoints = {
  slips: {
    byLocation: (postcode, area) =>
      `/skips/by-location?postcode=${encodeURIComponent(
        postcode
      )}&area=${encodeURIComponent(area)}`,
  },
  bySlug: (slug) => `/skip/by-slug?slug=${encodeURIComponent(slug)}`,
};
