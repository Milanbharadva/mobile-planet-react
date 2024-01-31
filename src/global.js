export function removeCouponFromLocalStorage() {
  Object.keys(localStorage)
    .filter((item) => item.includes("discount"))
    .map((item) => localStorage.removeItem(item));
}
export function getUserID() {
  return localStorage.getItem("userid");
}
export function filterDataWithUserId(loadeddata) {
  return loadeddata.filter((item) => item.userid === getUserID());
}
