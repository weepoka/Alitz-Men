import React, { useState, useEffect } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import Api from "../../../Api";

const Product = (props) => {
  const dispatch = useDispatch();

  const name = props?.productName;
  const idString = (name) => {
    return String(name);
  };
  const rootId = idString(props?.id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  //##############
  const [kurs, setKurs] = useState([]);
  const getKurs = async () => {
    const pid = props?.id;
    try {
      const res = await Api.get(`/master/api/v1/product-id/${pid}`);

      if (res.data) {
        setKurs(res.data.data);
      }
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
  useEffect(() => {
    getKurs();
  }, []);
  //#############
  // const url =
  //   kurs && kurs.url ? Object.values(kurs.url)?.map((url) => url?.url) : [];

  // const imageUrl = url && url.length > 0 ? url[0] : null;
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={props?.img} />
        </div>
        <div className="absolute top-6 left-8">
          {props?.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            {/* <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li> */}
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: kurs?._id,
                    name: kurs?.category,
                    quantity: 1,
                    url: kurs?.url,
                    badge: kurs?.badge,
                    price: ` ${
                      kurs?.discount
                        ? kurs?.price - kurs?.discount
                        : kurs?.price
                    }`,

                    detail: kurs?.detail,
                    height: kurs?.height,
                    chest: kurs?.chest,
                    discount: kurs?.discount,
                    shipping: kurs?.shipping,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            {/* <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {kurs?.category}
          </h2>
          <p className="text-[#767676] text-[14px]">${kurs?.price}</p>
        </div>
        {/* <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div> */}
      </div>
    </div>
  );
};

export default Product;
