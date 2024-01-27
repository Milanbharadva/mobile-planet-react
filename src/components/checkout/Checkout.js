import { useFetch } from "../../hook/usefetch";

const Checkout = () => {
  document.title = "Mobile Planet | Checkout";
  const { loadeddata, isPending } = useFetch("cart");
  let data;
  if (loadeddata) {
    data =
      loadeddata &&
      loadeddata.filter(
        (item) => item.itemdata.userid === localStorage.getItem("userid")
      );
  }
  const productdata = useFetch("product");
  let totalprice = 0;
  return (
    <div className="md:mx-20 mx-2">
      <div className="flex">
        <div className="w-[60%]">aaaaaaaaaaaa</div>
        <div className="w-[30%]">
          <table width="100%">
            <thead className="text-center bg-[#efefef]">
              <tr>
                <td className="py-5">Your order Details</td>
                <td className="py-5">Price</td>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-5 border">Product </td>
                <td className="py-5 border">Total</td>
              </tr>
              {data.map((item) => {
                console.log(item);
                let productdatafiltered = productdata.loadeddata.filter(
                  (items) => items.id === item.itemdata.productid
                )[0];
                if (productdatafiltered) {
                  totalprice =
                    totalprice +
                    parseInt(productdatafiltered.productprice) *
                      parseInt(item.itemdata.quantity);
                }

                return (
                  <tr className="text-center">
                    <td className="py-5 border">
                      {`${productdatafiltered.productname} * (${item.itemdata.quantity})`}
                    </td>
                    <td className="py-5 border">
                      {(
                        parseInt(productdatafiltered.productprice) *
                        parseInt(item.itemdata.quantity)
                      ).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              <tr className="text-center">
                <td className="py-5 border">SubTotal</td>
                <td className="py-5 border">{totalprice.toLocaleString()}</td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Shipping</td>
                <td className="py-5 border">0</td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Discount</td>
                <td className="py-5 border">0</td>
              </tr>
              <tr className="text-center">
                <td className="py-5 border">Shipping</td>
                <td className="py-5 border">0₹</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
