import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import Api from "../../Api";
const ProductDetails = () => {
  const location = useLocation();
  const { pid } = useParams();
  const [prevLocation, setPrevLocation] = useState("");
  const [num, setNum] = useState(0);
  const [productInfo, setProductInfo] = useState([]);

  const [kurs, setKurs] = useState([]);
  const getKurs = async () => {
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
  useEffect(() => {
    setProductInfo(location?.state?.item);
    setPrevLocation(location?.pathname);
  }, [location, productInfo]);
  console.log(pid);
  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2">
                <img
                  src={
                    kurs?.url?.length > 0
                      ? `${Api.defaults.baseURL}/uploads/${kurs.url[1]}`
                      : null
                  }
                  alt="kk"
                  onClick={() => setNum(1)}
                />
              </div>
              <div className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2">
                <img
                  src={
                    kurs?.url?.length > 0
                      ? `${Api.defaults.baseURL}/uploads/${kurs.url[2]}`
                      : null
                  }
                  alt="kk"
                  onClick={() => setNum(2)}
                />
              </div>
              <div className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2">
                <img
                  src={
                    kurs?.url?.length > 0
                      ? `${Api.defaults.baseURL}/uploads/${kurs.url[3]}`
                      : null
                  }
                  alt="kk"
                  onClick={() => setNum(3)}
                />
              </div>
            </div>
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={
                kurs?.url?.length > 0
                  ? `${Api.defaults.baseURL}/uploads/${kurs.url[num]}`
                  : null
              }
              alt="img"
              onClick={() => setNum(0)}
            />
            {/* {`${Api.defaults.baseURL}/uploads/ ${kurs?.url[0]}`} */}
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={kurs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
