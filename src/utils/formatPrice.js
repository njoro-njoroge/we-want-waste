export function formatPrice(price) {
  if (isNaN(price)) return "£0.00";

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(price);
}
