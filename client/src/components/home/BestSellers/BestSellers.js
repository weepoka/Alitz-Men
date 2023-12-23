import React, { useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import Api from "../../../Api";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = () => {
  const [orders, setorders] = useState([""]);
  // get product /////
  const getProduct = async () => {
    try {
      const res = await Api.get("/master/api/v1/product");

      if (res.data.data.length > 0) {
        const filter = res.data.data.filter((item) => item.saleCount >= 15);
        setorders(filter);
      }
    } catch (error) {
      console.error({ error });
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
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

export default BestSellers;
