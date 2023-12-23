import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems } from "../../../constants";
import { useSelector } from "react-redux";
import Api from "../../../Api";
const items = paginationItems;
function Items({ currentItems, pid }) {
  const product = useSelector((state) => state.orebiReducer.sortBy);
  const price = useSelector((state) => state.orebiReducer.price);
  const [pro, setPro] = useState([""]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  //############## product by category ######

  const getKurs = async () => {
    try {
      const res = await Api.get(`/master/api/v1/product-cat/${pid}`);

      if (res.data) {
        setFilteredProducts(res.data.data);
      }
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
  useEffect(() => {
    getKurs();
  }, [pid]);

  //############## product search ######
  const getProduct = async () => {
    try {
      const res = await Api.get("/master/api/v1/product");
      if (res.data.data.length > 0) {
        setPro(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, [product, price]);

  useEffect(() => {
    const filtered = pro?.filter((item) => {
      const priceMatch = (() => {
        if (price <= item?.price) {
          return item;
        }
        return false;
      })();
      console.log(priceMatch);
      //%%%%%%%%%%%%///
      const newItems = (() => {
        if (product === "New Arrival") {
          const compairWith = item?.createdAt ? new Date(item.createdAt) : null;

          if (compairWith && !isNaN(compairWith)) {
            compairWith?.setDate(compairWith?.getDate() + 7);
            const compairWitha = compairWith?.toISOString()?.split("T")[0];
            console.log(compairWitha < new Date().toISOString().split("T")[0]);

            return compairWitha > new Date().toISOString().split("T")[0];
          } else {
            console.error(`Invalid date value: ${item?.createdAt}`);
            return false;
          }
        }
        if (product === "Best Sellers") {
          return item?.saleCount >= 10;
        }
        if (product === "Final Offer") {
          return item?.discount >= 100;
        }

        return false;
      })();
      //%%%%%%%%%%%%///

      return priceMatch && newItems;
    });

    setFilteredProducts(filtered);
  }, [pro, price, product]);

  //############## product ######
  console.log(filteredProducts);
  return (
    <>
      {filteredProducts &&
        filteredProducts?.map((item) => (
          <div key={item?._id} className="w-full">
            <Product
              id={item._id}
              img={item?.url[0]}
              productName={item?.category}
              price={item?.price}
              badge={item?.badge}
              des={item?.detail}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, cat }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset},`
    // );
    setItemStart(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items pid={cat} currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
