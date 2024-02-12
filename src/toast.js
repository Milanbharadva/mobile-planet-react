import { toast } from "react-toastify";
import { localStringConverter } from "./global";
export const notifyproductaddded = () => toast.success("Product added to cart");
export const notifyquantityupdated = () =>
  toast.success("Item Quantity Updated Sucessfully");
export const notifylogintoaccess = () =>
  toast.warning("Please Log In To Add To Cart");
export const notifyerroraddingcart = () =>
  toast.error("error in add to cart please try again later");
export const notifyproductaddedsuccess = () => toast.success("Product added");
export const notifyaddressupdated = () =>
  toast.success("Address Updated Sucessfully");
export const notifylogout = () => toast.warning("Logout successfully");
export const notifyproductupdated = (item) =>
  toast.success(`${item} updated sucessfully`);
export const notifycontactsubmit = () =>
  toast.success("Your contact request is submitted successfully");
export const orderSucessfull = () => toast.success("Order Placed Sucessfully");
export const orderplaceerror = () =>
  toast.error(" Error In Order Placed ! Please try agian later");
export const notifywrongcoupon = () => toast.error("Wrong Counpon Code");
export const notifycouponexpired = () =>
  toast.error("Sorry Counpon Is Expired");
export const notifycouponapplied = (money) =>
  toast.success(
    " Coupon Applied Sucessfully You Saved " + localStringConverter(money) + "₹"
  );
export const notifyOrderRemoved = () =>
  toast.warning("Your Order Is Cancelled");
export const notifyOrderRemovedError = () =>
  toast.error("Error In Order cancelation Please Try Again Later");

export const notifymincartvalue = (price) =>
  toast.error(`Minimum Cart Value Should be ${localStringConverter(price)}`);
export const notifywrongemail = () => toast.error("Wrong Email or Password");
export const notifyloginsucess = () => toast.success("Login sucessful");
export const notifytoSignin = () =>
  toast.success("Sign Up Sucessful please Sign In To Continue");
export const notifyloginbeforecart = () =>
  toast.error("Please Log In To Access Cart");
export const notifydiscountadded = () =>
  toast.success("Discount Code Added Sucessfully");
export const discountalreadyexist = () =>
  toast.error("Discount code already exists. Please choose a different code.");
