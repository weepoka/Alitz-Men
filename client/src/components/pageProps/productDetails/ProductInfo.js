import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  //#### total
  const calculateTotalPrice = () => {
    if (productInfo?.discount) {
      return productInfo.price - productInfo.discount;
    }
    return productInfo?.price;
  };
  //#### total
  return (
    <div className="flex flex-col gap-5">
      <div className="border rounded p-6 shadow-lg bg-white">
        <h2 className="text-4xl font-semibold mb-4">{productInfo?.category}</h2>
        <p className="text-xl font-semibold text-gray-700">
          ${productInfo?.price}
        </p>
        {productInfo?.discount && (
          <p className="text-lg text-red-500">
            - ${productInfo?.discount} discount
          </p>
        )}
        <hr className="my-4 border-t border-gray-300" />
        <p className="text-xl font-semibold">Total: ${calculateTotalPrice()}</p>
        <p className="text-base text-gray-600 mt-4">{productInfo?.detail}</p>
      </div>

      <p className="font-medium text-lg"></p>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo?._id,
              name: productInfo?.category,
              quantity: 1,
              url: productInfo?.url,
              badge: productInfo?.badge,
              price: ` ${
                productInfo?.discount
                  ? productInfo?.price - productInfo?.discount
                  : productInfo?.price
              }`,
              size: { selectedSize },
              detail: productInfo?.detail,
              height: productInfo?.height,
              chest: productInfo?.chest,
              discount: productInfo?.discount,
              shipping: productInfo?.shipping,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <div>
        <h3>Select Size:</h3>
        <div>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeClick(size)}
              style={{
                padding: "8px 12px",
                margin: "4px",
                backgroundColor: selectedSize === size ? "blue" : "white",
                color: selectedSize === size ? "white" : "black",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {size}
            </button>
          ))}
        </div>
        <p>Selected Size: {selectedSize}</p>
      </div>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
