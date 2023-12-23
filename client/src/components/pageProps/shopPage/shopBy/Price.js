// import React from "react";
// import NavTitle from "./NavTitle";

// const Price = () => {
//   const priceList = [
//     {
//       _id: 950,
//       priceOne: 0.0,
//       priceTwo: 49.99,
//     },
//     {
//       _id: 951,
//       priceOne: 50.0,
//       priceTwo: 99.99,
//     },
//     {
//       _id: 952,
//       priceOne: 100.0,
//       priceTwo: 199.99,
//     },
//     {
//       _id: 953,
//       priceOne: 200.0,
//       priceTwo: 399.99,
//     },
//     {
//       _id: 954,
//       priceOne: 400.0,
//       priceTwo: 599.99,
//     },
//     {
//       _id: 955,
//       priceOne: 600.0,
//       priceTwo: 1000.0,
//     },
//   ];
//   return (
//     <div className="cursor-pointer">
//       <NavTitle title="Shop by Price" icons={false} />
//       <div className="font-titleFont">
//         <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
//           {priceList.map((item) => (
//             <li
//               key={item._id}
//               className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
//             >
//               ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Price;

// import React, { useState } from "react";
// import NavTitle from "./NavTitle";

// const Price = () => {
//   const [priceRange, setPriceRange] = useState([0, 1000]);

//   const handlePriceChange = (event) => {

//     setPriceRange([parseInt(event.target.value), priceRange[1]]);
//   };

//   const handleMaxPriceChange = (event) => {

//     setPriceRange([priceRange[0], parseInt(event.target.value)]);
//   };

//   return (
//     <div className="cursor-pointer">
//       <NavTitle title="Shop by Price" icons={false} />
//       <div className="font-titleFont">
//         <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
//           <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 duration-300">
//             <label className="mr-2">Min:</label>
//             <input
//               type="number"
//               value={priceRange[0]}
//               onChange={handlePriceChange}
//               min={0}
//               max={priceRange[1] - 1}
//             />
//           </li>
//           <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 duration-300">
//             <label className="mr-2">Max:</label>
//             <input
//               type="number"
//               value={priceRange[1]}
//               onChange={handleMaxPriceChange}
//               min={priceRange[0] + 1}
//               max={1000}
//             />
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Price;

import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the styles
import NavTitle from "./NavTitle";
import { useDispatch } from "react-redux";
import { price } from "../../../../redux/orebiSlice";

const Price = () => {
  const dispatch = useDispatch();

  const [priceRange, setPriceRange] = useState([100, 10000]);

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    if (priceRange[0] !== 0) {
      dispatch(price(priceRange[0] ? priceRange[0] : 100));
    }
  }, [priceRange, dispatch]);

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 duration-300">
            <label className="mr-2">Price Range:</label>
            <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
          </li>
          <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 duration-300">
            <Slider
              min={100}
              max={10000}
              step={1}
              value={priceRange}
              onChange={handlePriceChange}
              range
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Price;
