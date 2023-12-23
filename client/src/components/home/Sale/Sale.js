import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  saleImgOne,
  saleImgTwo,
  saleImgThree,
} from "../../../assets/images/index";
import Image from "../../designLayouts/Image";
import Api from "../../../Api";

const Sale = () => {
  const [banDataa, setBana] = useState([""]);
  const isBanner = async () => {
    try {
      const res = await Api.get("/master/api/v1/banner");

      if (res.data.length > 0) {
        setBana(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    isBanner();
  }, []);
  //*************** */
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
      <div className="w-full md:w-2/3 lg:w-1/2 h-full">
        <Link to="/shop">
          {banDataa?.map(
            (url) =>
              url?.position === "Jersey" && (
                <div className="relative">
                  <Image
                    className="h-full w-full object-cover"
                    imgSrc={url?.url}
                  />
                  <div className=" absolute top-[40%]  left-[12%]">
                    <h3 className=" text-white text-xl font-semibold">
                      All Time Mega Offer
                    </h3>
                    <h1 className="text-white text-[46px] font-bold ">
                      {url?.position}
                    </h1>

                    <button className="py-3 px-6 border bg-gray-600 text-white rounded-md">
                      Shop Now
                    </button>
                  </div>
                </div>
              )
          )}
        </Link>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        <div className="h-1/2 w-full">
          <Link to="/shop">
            {banDataa?.map(
              (url) =>
                url?.position === "Panjabi" && (
                  <div className="relative">
                    <Image
                      className="h-full w-full object-cover"
                      imgSrc={url?.url}
                    />
                    <div className=" absolute top-[40%]  left-[12%]">
                      <h3 className=" text-white text-xl font-semibold">
                        All Time Mega Offer
                      </h3>
                      <h1 className="text-white text-[46px] font-bold ">
                        {url?.position}
                      </h1>

                      <button className="py-3 px-6 border bg-gray-600 text-white rounded-md">
                        Shop Now
                      </button>
                    </div>
                  </div>
                )
            )}
          </Link>
        </div>
        <div className="h-1/2 w-full">
          <Link to="/shop">
            {banDataa?.map(
              (url) =>
                url?.position === "T-shirt " && (
                  <div className="relative">
                    <Image
                      className="h-full w-full object-cover"
                      imgSrc={url?.url}
                    />
                    <div className=" absolute top-[40%]  left-[12%]">
                      <h3 className=" text-white text-xl font-semibold">
                        All Time Mega Offer
                      </h3>
                      <h1 className="text-white text-[46px] font-bold ">
                        {url?.position}
                      </h1>

                      <button className="py-3 px-6 border bg-gray-600 text-white rounded-md">
                        Shop Now
                      </button>
                    </div>
                  </div>
                )
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sale;
