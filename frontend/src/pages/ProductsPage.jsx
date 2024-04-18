import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const ProductsPage = () => {
  
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProducts,isLoading} = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(1);

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
                className={`font-[600] text-[20px] ${
                  active === 1 ? "text-red-500" : "text-[#333]"
                } cursor-pointer pr-[20px]`}
              >
                Products
              </h5>
            </div>
            <div className="flex items-center" onClick={() => setActive(2)}>
              <h5
                className={`font-[600] text-[20px] ${
                  active === 2 ? "text-red-500" : "text-[#333]"
                } cursor-pointer pr-[20px]`}
              >
                All suppliers
              </h5>
            </div>

            <div className="flex items-center" onClick={() => setActive(3)}>
              <h5
                className={`font-[600] text-[20px] ${
                  active === 3 ? "text-red-500" : "text-[#333]"
                } cursor-pointer pr-[20px]`}
              >
                Verified manufacturers
              </h5>
            </div>
          </div>
        </div>
        <br />
        
        {active === 1 && (
          <div className="flex justify-between">
              <div className="w-1/4 ">
                <div className="w-11/12 mx-auto bg-white rounded ">
                  <div className="ml-3 pt-5 text-[25px] text-center md:text-start font-[600] font-Roboto pb-[20px]" >Filters</div>
                  <div className="flex gap-2">
                    
                  </div>
                </div>
              </div>
              <div className="w-3/4 mr-5 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[15px] mb-12">
                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
              </div>
              {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products Found!
                </h1>) : null}
          </div>
        )}

        {active === 2 && (
          <div className="flex justify-between">
              <div className="w-1/4">
                <div className="w-11/12 mx-auto bg-white rounded ">
                  <div className="ml-3 pt-5 text-[25px] text-center md:text-start font-[600] font-Roboto pb-[20px]" >Filters</div>
                  <div className="flex gap-2">
                    
                  </div>
                </div>
              </div>
              <div className="w-3/4 mr-5 grid grid-cols-1 mb-12 ">
                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
              </div>
              {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products Found!
                </h1>) : null}
          </div>
        )}

        {active === 3 && (
          <div className="flex justify-between">
              <div className="w-1/4">
                <div className="w-11/12 mx-auto bg-white rounded ">
                  <div className="ml-3 pt-5 text-[25px] text-center md:text-start font-[600] font-Roboto pb-[20px]" >Filters</div>
                  <div className="flex gap-2">
                    
                  </div>
                </div>
              </div>
              <div className="w-3/4 mr-5 grid grid-cols-1 mb-12">
                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
              </div>
              {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products Found!
                </h1>) : null}
          </div>
        )}  
        
        <Footer />
      </div>
    )
  }
  </>
  );
};

export default ProductsPage;
