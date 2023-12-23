import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import about from "../../assets/about/about-01.png";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    // <div className="max-w-container mx-auto px-4">
    //   <Breadcrumbs title="About" prevLocation={prevLocation} />
    //   <div className="pb-10">
    //     <h1 className="max-w-[600px] text-base text-lightText mb-2">
    //       <span className="text-primeColor font-semibold text-lg">KinBay</span>{" "}
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
    //       reiciendis delectus vitae, aliquid sit iure dolorum commodi eum
    //       numquam voluptate!
    //     </h1>
    //     <Link to="/shop">
    //       <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
    //         Continue Shopping
    //       </button>
    //     </Link>
    //   </div>
    // </div>
    //new code
    <div className="relative  ">
      <section className="flex items-center bg-stone-100 lg:pt-40 lg:pb-20 font-poppins">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div className="lg:max-w-md">
                <img src={about} alt="aboutimage" className="rounded" />
              </div>
            </div>
            <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="pl-4 mb-6 border-l-4 border-[#DA8702]">
                <span className="text-sm text-gray-600 uppercase dark:text-gray-400">
                  Who we are?
                </span>
                <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                  About Us
                </h1>
              </div>
              <p className="text-sm lg:text-base leading-7 text-gray-500 dark:text-gray-400 text-justify">
                Welcome to MUSLIN, the pinnacle of lifestyle elegance, proudly
                rooted in Bangladesh and illuminating the fashion scene since
                2021. Our essence lies in delivering unparalleled style and
                quality with an unwavering commitment to providing the finest
                products at the most accessible prices.
                <br /> <br />
                Specializing in a diverse array of designs, ranging from
                comfortable classics to contemporary styles, MUSLIN stands out
                through unique embroidered materials and exquisite
                craftsmanship. As your ultimate one-stop destination, we've
                swiftly become a household name, especially cherished by the
                discerning younger generation, all thanks to our innovative
                methods and comprehensive services.
                <br />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 md:text-center  bg-stone-100 ">
        <p className="text-center text-sm lg:text-base leading-7 text-gray-500 dark:text-gray-400 max-w-screen-md mx-auto">
          Our journey in the realm of fashion e-commerce has been nothing short
          of extraordinary, marked by daily expansion and propelled by millions
          of customer interactions. Since our inception in 2021, we've not only
          made a significant impact but have also solidified our position as a
          trusted leader in Bangladesh's garment and apparel industry.
          <br /> <br />
          Behind MUSLIN's success is a dedicated team that has contributed
          tirelessly to our reputation and growth. More than just a brand,
          MUSLIN is a lifestyle choice that embodies the values of quality,
          affordability, and an unwavering commitment to excellence.
          <br /> <br />
          Explore the world of MUSLIN, where each piece tells a story of style,
          comfort, and sophistication. Join us in setting new standards as we
          continue to redefine the art of premium fashion.
        </p>
      </section>

      <div className="px-6 pb-28 md:text-center  bg-stone-100">
        <h2 className="pb-2 text-2xl font-bold text-gray-800 md:text-4xl dark:text-gray-300">
          Our Vision
        </h2>
        <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded md:mx-auto md:mb-14">
          <div className="flex-1 h-2 bg-[#1B3A71]"></div>
          <div className="flex-1 h-2 bg-[#DA8702]"></div>
          <div className="flex-1 h-2 bg-[#1B3A71]"></div>
        </div>

        <div className="text-center text-sm lg:text-base leading-7 text-gray-500 dark:text-gray-400 max-w-screen-md mx-auto">
          <p>
            A vision statement outlines the company's long-term goals and
            aspirations for the future in terms of its long-term growth and
            impact on the world. Your mission defines what your organization
            does and what you stand for, while your vision statement speaks to
            your goals and ideals for the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
