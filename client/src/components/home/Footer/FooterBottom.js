import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    // bg-[#F5F5F3]
    <div className="w-full bg-black  group">
      <div className="max-w-container mx-auto border-t-[1px] pt-10 pb-20">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          <span>Copyright {year} . All Rights Reserved</span> Developed By{" "}
          <span className="inline-block hover:scale-105 hover:translate-x-2 duration-500">
            {" "}
            <a
              href="https://weepoka.com"
              className="gradient_text text-transparent font-medium text-lg"
            >
              Weepoka
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
