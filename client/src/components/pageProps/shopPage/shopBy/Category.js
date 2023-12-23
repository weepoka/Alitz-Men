import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { Link } from "react-router-dom";
const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [category] = useState([
    "Shirt",
    "Polo T-Shirt",
    "T-shirt ",
    "Panjabi",
    "Pant",
    "Jersey",
    "Hoodie",
    "Sweatshirt",
    "Jacket",
  ]);
  return (
    <div className="w-full">
      <NavTitle icons={false} title="Shop by Category" />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {category.map((title, i) => (
            <Link to={`/shop/${title}`}>
              <li
                key={i}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
              >
                {title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
