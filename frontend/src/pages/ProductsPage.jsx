import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

import { getAllSellers } from "../redux/actions/sellers";

import Active1 from "../components/Search/Active1";
import Active2 from "../components/Search/Active2";
import Active3 from "../components/Search/Active3";
const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleChange = (event) => { 
    setSelectedCategory(event.target.value);
  };
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const { sellers } = useSelector((state) => state.seller);
  const [data, setData] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  function filteredData(products, selected) {
    let filteredProducts = products;

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ discountPrice,ratings}) =>
        discountPrice >= selected ||
        ratings >= selected
      );
    }

    return filteredProducts;
  }
  
  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts]);

  useEffect(() => {
    const d = sellers;
    setSupplier(d);
  }
    , [sellers]);
    let result = data;
    result = filteredData(result, selectedCategory);
    
    
  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div>
            <Header activeHeading={3} />
            <br />
            <div className="flex items-center justify-between ml-20">
              <div className="w-full flex">
                <div className="flex items-center" onClick={() => setActive(1)}>
                  <h5
                    className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"
                      } cursor-pointer pr-[20px]`}
                  >
                    Products
                  </h5>
                </div>
                <div className="flex items-center" onClick={() => setActive(2)}>
                  <h5
                    className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"
                      } cursor-pointer pr-[20px]`}
                  >
                    All suppliers
                  </h5>
                </div>

                <div className="flex items-center" onClick={() => setActive(3)}>
                  <h5
                    className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]"
                      } cursor-pointer pr-[20px]`}
                  >
                    Verified manufacturers
                  </h5>
                </div>
              </div>
            </div>
            <br />

            {active === 1 && (
              <Active1 data={result} handleChange={handleChange} ></Active1>
            )}

            {active === 2 && (
              <Active2 data={supplier} handleChange={handleChange}></Active2>
            )}

            {active === 3 && (
              <Active3 data={supplier} handleChange={handleChange}></Active3>
            )}

            <Footer />
          </div>
        )
      }
    </>
  );
};

export default ProductsPage;
