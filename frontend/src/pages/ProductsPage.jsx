import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Card from "../components/Card/Card/Card"
import { getAllSellers } from "../redux/actions/sellers";
import  Input from "../components/Layout/Input"
const ProductsPage = () => {
  
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProducts,isLoading} = useSelector((state) => state.products);
  const { sellers } = useSelector((state) => state.seller);
  const [data, setData] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

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
                  
                  <div className="ml-3 ">
                    <div className="mt-5 text-[17px] font-[600] font-Roboto">Supplier features</div>
                    <div className="flex-col flex text-[15px]">

                      <label className="mt-1 flex">
                        <input onChange={{}} type="radio" value="" name="sf" />
                        <div className="checkmark ml-2 flex text-[14px]">
                          <img className = "max-w-10 max-h-5"src="https://s.alicdn.com/@img/imgextra/i2/O1CN01RTQpCr1aufaXTtWv5_!!6000000003390-2-tps-83-32.png?webp=close" width="45" ></img>
 
                          <span className="ml-1 "></span>Supplier
                        </div>
                      </label>

                      <label className="mt-1 flex">
                        <input onChange={{}} type="radio" value="" name="sf" />
                        <div className="checkmark ml-2 flex text-[14px]">
                          <img className = ""src="https://s.alicdn.com/@img/imgextra/i4/O1CN017JpSfh1MBsEOBrKwl_!!6000000001397-2-tps-135-32.png?webp=close" width="70" ></img>
 
                          <span className="ml-1"></span>Supplier
                        </div>
                      </label>

                      <label className="mt-1 flex">
                        <input onChange={{}} type="radio" value="" name="sf" />
                        <div className="checkmark ml-2 text-[14px]">
                          <span></span>≤1h response time
                        </div>
                      </label>
                    </div>
                    
                  </div>

                  <div className="ml-3 ">
                    <div className="mt-5 text-[15px] font-[600] font-Roboto">Price</div>
                    <div className="flex-col flex text-[15px]">
                      <label className="mt-1">
                        <input onChange={{}} type="radio" value="" name="price" />
                        <span className="checkmark ml-2"></span>All
                      </label>
                      <Input
                        handleChange={{}}
                        value={100}
                        title="$0 - 100"
                        name="price"
                      />
                      <Input
                        handleChange={{}}
                        value={500}
                        title="$100 - 500"
                        name="price"
                      />
                      <Input
                        handleChange={{}}
                        value={1000}
                        title="$500 - 1000"
                        name="price"
                      />
                      <Input
                        handleChange={{}}
                        value={1100}
                        title="Over $1000"
                        name="price"
                      />
                    </div>
                    
                  </div>
                  
                  <div className="ml-3 ">
                    <div className="mt-5 text-[15px] font-[600] font-Roboto flex">Store reviews 
                    <span>
                      <img width = "25" src="https://s.alicdn.com/@img/imgextra/i4/O1CN018HNRIu1V0GjlgwCry_!!6000000002590-2-tps-72-48.png?webp=close" className="ml-1" />
                    </span>
                    </div>
                    <div className="mt-2 text-[13px] text-slate-400">Based on a 5-star rating system</div>
                    <div className="flex-col flex text-[15px]">
                      <Input
                        handleChange={{}}
                        value={4}
                        title="4.0 & up"
                        name="review"
                      />
                      <Input
                        handleChange={{}}
                        value={4.5}
                        title="4.5 & up"
                        name="review"
                      />
                      <Input
                        handleChange={{}}
                        value={5}
                        title="5.0"
                        name="review"
                      />
                    </div>
                    
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
                {supplier && supplier.map((i, index) => <Card data={i} key={index} />)}
              </div>
              {supplier && supplier.length === 0 ? (
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
                {supplier && supplier.map((i, index) => <Card data={i} key={index} />)}
              </div>
              {supplier && supplier.length === 0 ? (
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
