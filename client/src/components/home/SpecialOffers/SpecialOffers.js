import React, { useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
} from "../../../assets/images/index";
import Api from "../../../Api";
const SpecialOffers = () => {
  const [orders, setorders] = useState([""]);
  // get product /////
  const getProduct = async () => {
    try {
      const res = await Api.get("/master/api/v1/product");
      console.log(res.data.data);
      if (res.data.data.discount !== 0) {
        setorders(res.data.data);
      }
    } catch (error) {
      console.error({ error });
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  //#### log#########
  console.log(orders);
  //#### log#########
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {orders &&
          orders?.map((info, i) => (
            <>
              <Product
                id={info?._id}
                img={info?.url && info.url.length > 0 ? info.url[0] : null}
                productName={info?.category}
                price={info?.price}
                badge={true}
                des={info?.detail}
              />
             
            </>
          ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
