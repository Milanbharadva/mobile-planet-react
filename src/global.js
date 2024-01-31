export function removeCouponFromLocalStorage() {
  Object.keys(localStorage)
    .filter((item) => item.includes("discount"))
    .map((item) => localStorage.removeItem(item));
}
