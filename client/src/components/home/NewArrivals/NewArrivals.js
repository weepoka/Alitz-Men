import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import Api from "../../../Api";

const NewArrivals = () => {
  const [newIs, setNew] = useState([]);

  const isBanner = async () => {
    try {
      const res = await Api.get("/master/api/v1/product");
      const toDay = Date.now();
      const dateNow = new Date(toDay);

      const compairTo = dateNow.toISOString().split("T")[0];

      if (res.data && res.data.data.length > 0) {
        const newItems = res.data.data.filter((item) => {
          if (item?.createdAt) {
            const compairWith = new Date(item.createdAt);
            compairWith.setDate(compairWith.getDate() + 7);
            const compairWitha = compairWith.toISOString().split("T")[0];
            console.log(compairWitha);

            return compairTo < compairWitha;
          }
          return false;
        });

        if (newItems.length > 0) {
          setNew(newItems);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isBanner();
  }, []);


  //################
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {newIs &&
          newIs?.map((info, i) => (
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
      </Slider>
    </div>
  );
};

export default NewArrivals;
