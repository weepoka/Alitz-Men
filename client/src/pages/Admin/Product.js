import React, { useEffect, useState } from "react";
import Api from "../../Api";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import { Controller, useForm } from "react-hook-form";
const Product = () => {
  const [kurs, setKurs] = useState([]);
  const [show, setShow] = useState(false);

  const [mess, setMess] = useState("");
  const [cat, setCat] = useState("");
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm();

  //####category ###
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
  //####### size ###
  const [size] = useState(["M", "L", "XL", "XXL", "3XXL"]);
  //##### submit ###
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("url", data.url);
    console.log(typeof data.url);
    // if (Array.isArray(data.url)) {
    //   data.url.forEach((image) => {
    //     formData.append("url", image);
    //   });
    // } else {
    //   formData.append("url", data.url);
    // }
    let image = {};
    for (image of data.url) {
      console.log(image);
      formData.append("url", image);
    }
    // Append other form fields
    formData.append("category", data.category);
    formData.append("detail", data.detail);

    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("size", data.size);
    formData.append("chest", data.chest);
    formData.append("height", data.height);
    formData.append("shipping", data.shipping);
    formData.append("shippingg", data.shippingg);

    //onlineFee.bookFee sub input field

    console.log(formData);

    try {
      const res = await Api.post("/master/api/v1/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getKurs();
      console.log("Kurs:", res.data.data);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };
  //######### get product ########
 
  const getKurs = async () => {
    try {
      const res = await Api.get("/master/api/v1/product");

      if (res.data.data.length > 0) {
        setKurs(res.data.data.reverse());
      }
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
 
  const handelDel = async (id) => {
    try {
      const res = await Api.delete(`/master/api/v1/product/${id}`);
      setMess(res.data.message);
      setTimeout(() => {
        setMess("");
      }, 2000);
      getKurs();
    } catch (err) {
      console.error("Error reason:", err);
      setMess(err.stack);
      setTimeout(() => {
        setMess("");
      }, 2000);
    }
  };
  //######### get product end ########

  const filter = kurs?.filter((match) => match?.category === cat);

  //######Effect########
  useEffect(() => {
    getKurs();
  }, []);
  //######Effect#######
  //######Log #####
  console.log(filter);
  console.log(kurs);
  console.log(cat);

  //######Log #####
  return (
    <>
      <div className="m-7 lg:w-full w-full text-black">
        <div className="py-5">
          <Typography
            variant="h3"
            className="text-center underline text-cyan-400"
          >
            Product
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
          <div className="border rounded-md pb-5">
            <div className="bg-[#607d8b] text-white py-2 mb-10">
              <h3 className="font-bold text-xl tracking-wide pl-5">
                Add Product
              </h3>
            </div>

            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-1 lg:gap-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                  <div>
                    <label className="mb-2 md:text-lg text-gray-400">
                      Category
                    </label>
                  </div>
                  <div>
                    {/* Dropdown for Course Title */}
                    <Controller
                      name="category"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select {...field} color="blue" label="">
                          {category.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.category && <p>Categorye is required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                  <div>
                    <label className=" md:text-md  text-gray-200">Size</label>
                  </div>
                  <div>
                    {/* Dropdown for Course Title */}
                    <Controller
                      name="size"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select {...field} color="blue" label="">
                          {size.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.category && <p>Categorye is required</p>}
                  </div>
                </div>

                <div className="flex justify-between ">
                  <label className=" md:text-md  text-gray-200">Price</label>
                  <div className="w-[46%]">
                    <input
                      type="number"
                      {...register("price", {
                        required: true,
                      })}
                      color="blue"
                      className="border  w-[46%] text-gray-800
                 rounded w-"
                      label=" Price"
                    />

                    {errors.price && <p>Price is required and must be valid</p>}
                  </div>
                </div>

                <div className="flex justify-between ">
                  <label className=" md:text-md  text-gray-100">Discount</label>
                  <div className="w-[46%]">
                    <input
                      type="number"
                      {...register("discount")}
                      color="blue"
                      className="border  w-[46%] text-gray-800
                 rounded w-"
                      label=" discount"
                    />
                  </div>
                </div>

                <div className="flex justify-between ">
                  <label className=" md:text-md  text-gray-100">Detail</label>
                  <div className="w-[46%]">
                    <input
                      type="text"
                      {...register("detail", {})}
                      color="blue"
                      className="border w-[46%]  text-gray-800
                 rounded w-"
                      label=""
                    />
                  </div>
                </div>
                <div className="flex justify-between ">
                  <label className=" md:text-md  text-gray-100">Chest</label>
                  <div className="w-[46%]">
                    <input
                      type="text"
                      {...register("chest", {})}
                      color="blue"
                      className="border w-[46%]  text-gray-800
                 rounded w-"
                      label=""
                    />
                  </div>
                </div>

                <div className="flex justify-between ">
                  <label className=" md:text-md  text-gray-100">Height</label>
                  <div className="w-[46%]">
                    <input
                      type="text"
                      {...register("height", {})}
                      color="blue"
                      className="border w-[46%]  text-gray-800
                 rounded w-"
                      label=""
                    />
                  </div>
                </div>

                <div className="flex justify-between ">
                  <label className=" md:text-md  text-gray-100">
                    Shipping Charge In Dhaka
                  </label>
                  <div className="w-[46%]">
                    <input
                      type="number"
                      {...register("shipping", {})}
                      color="blue"
                      className="border w-[46%]  text-gray-800
                 rounded w-"
                      label=""
                    />
                  </div>
                </div>

                <div className="flex justify-between ">
                  <label className=" md:text-md  text-gray-100">
                    Shipping Charge Out Dhaka
                  </label>
                  <div className="w-[46%]">
                    <input
                      type="number"
                      {...register("shippingg", {})}
                      color="blue"
                      className="border w-[46%]  text-gray-800
                 rounded w-"
                      label=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-20 px-4 ">
              <label className=" md:text-lg  text-gray-400">
                Image (size 2000px * 700px)
              </label>

              <div className="w-[46%]">
                <input
                  type="file"
                  {...register("url", {
                    required: "Image is required",
                  })}
                  color="blue"
                  name="url"
                  accept="image/*"
                  className="border py-1  w-full rounded "
                  label="Image"
                  multiple
                />
                {errors.url && <p>{errors.url.message}</p>}
              </div>
            </div>
          </div>

          <div className="text-center pt-10">
            <Button type="submit" className="bg-blue-600 px-10">
              Create
            </Button>
          </div>
        </form>

        <div className="flex justify-between p-4 text-white ">
          {category.map((catt, i) => (
            <button
              key={i}
              onClick={() => {
                setCat(catt);
                setShow(!show);
              }}
              className="py-4 px-2 rounded-md border border-white"
            >
              {catt}
            </button>
          ))}
        </div>
        {show && (
          <div className="m-7 lg:w-full w-full text-black">
            <div className=" flex flex-wrap gap-4 ">
              {filter &&
                filter?.map((kur, i) => (
                  <div
                    key={i}
                    className="max-w-sm relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <img
                      loading="lazy"
                      className="rounded-t-lg object-fill w-[400px] h-[200px]"
                      src={`${Api.defaults.baseURL}/uploads/${kur?.url[0]}`}
                      alt="kurs"
                    />
                    <div className="flex justify-between h-[80px] p-2">
                      {parseInt(kur?.url[1]?.split("-")[0]) ? (
                        <img
                          loading="lazy"
                          className=" w-[110px] h-[60px] rounded-md"
                          src={`${Api.defaults.baseURL}/uploads/${kur?.url[1]}`}
                          alt="pro"
                        />
                      ) : (
                        false
                      )}
                      {parseInt(kur?.url[2]?.split("-")[0]) ? (
                        <img
                          loading="lazy"
                          className=" w-[110px] h-[60px] rounded-md"
                          src={`${Api.defaults.baseURL}/uploads/${kur?.url[2]}`}
                          alt="pro"
                        />
                      ) : (
                        false
                      )}
                      {parseInt(kur?.url[3]?.split("-")[0]) ? (
                        <img
                          loading="lazy"
                          className=" w-[110px] h-[60px] rounded-md"
                          src={`${Api.defaults.baseURL}/uploads/${kur?.url[3]}`}
                          alt="pro"
                        />
                      ) : (
                        false
                      )}
                    </div>
                    <div className="p-5 flex justify-between">
                      <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {kur?.category}
                        </h5>
                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                          {kur?.detail}
                        </h5>
                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                          price: {kur?.price}
                        </h5>
                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                          disc: {kur?.discount}
                        </h5>
                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                          Shipping In: {kur?.shipping}
                        </h5>
                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                          Shipping Out: {kur?.shippingg}
                        </h5>
                      </div>
                      <div>
                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                          size: {kur?.size}
                        </h5>
                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                          chest: {kur?.chest}
                        </h5>
                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                          height: {kur?.height}
                        </h5>
                        <p
                          onClick={() => handelDel(kur._id)}
                          className="inline-flex cursor-pointer text-end px-3 py-2 text-sm font-medium  text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              {mess && (
                <div className="max-w-sm relative w-[400px] h-[200px] bg-[#2B3252] border flex justify-center items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <p className="text-center text-orange-600 text-lg font-bold ">
                    {mess}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
