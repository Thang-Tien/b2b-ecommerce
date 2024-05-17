import Input from "../Layout/Input";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useState } from "react";

const Active1 = ({data}) => {
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  }
  const handleChangeRating = (event) => {
    setRating(event.target.value);
  }
  function filteredData(products, price, rating) {
    let filteredProducts = products;
    if(rating===null) {
      setRating(0);
    }
    // Applying selected filter
    if (price || rating) {
      filteredProducts = filteredProducts.filter(
        ({ discountPrice,ratings}) =>
        (Number(price.split("-")[0]) <= discountPrice) && (discountPrice <= Number(price.split("-")[1]))  &&
        (rating !=""?ratings >= rating:true )
      );
    }

    return filteredProducts;
  }
  
  const result = filteredData(data,price,rating)

    return (
        <div className="flex justify-between mb-20">
                <div className="w-1/4 ">
                  <div className="w-11/12 mx-auto bg-white rounded ">
                    <div className="ml-3 pt-5 text-[25px] text-center md:text-start font-[600] font-Roboto pb-[20px]" >Filters</div>

                    <div className="ml-3 ">
                      <div className="mt-5 text-[17px] font-[600] font-Roboto">Supplier features</div>
                      <div className="flex-col flex text-[15px]">

                        <label className="mt-1 flex">
                          <input onChange={{}} type="radio" value="" name="sf" />
                          <div className="checkmark ml-2 flex text-[14px]">
                            <img className="max-w-10 max-h-5" src="https://s.alicdn.com/@img/imgextra/i2/O1CN01RTQpCr1aufaXTtWv5_!!6000000003390-2-tps-83-32.png?webp=close" width="45" ></img>

                            <span className="ml-1 "></span>Supplier
                          </div>
                        </label>

                        <label className="mt-1 flex">
                          <input onChange={{}} type="radio" value="" name="sf" />
                          <div className="checkmark ml-2 flex text-[14px]">
                            <img className="" src="https://s.alicdn.com/@img/imgextra/i4/O1CN017JpSfh1MBsEOBrKwl_!!6000000001397-2-tps-135-32.png?webp=close" width="70" ></img>

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
                          <input onChange={handleChangePrice} type="radio" value="0-1000000" name="price" />
                          <span className="checkmark ml-2"></span>All
                        </label>
                        <Input
                          handleChange={handleChangePrice}
                          value={"0-100"}
                          title="$0 - 100"
                          name="price"
                        />
                        <Input
                          handleChange={handleChangePrice}
                          value={"100-500"}
                          title="$100 - 500"
                          name="price"
                        />
                        <Input
                          handleChange={handleChangePrice}
                          value={"500-1000"}
                          title="$500 - 1000"
                          name="price"
                        />
                        <Input
                          handleChange={handleChangePrice}
                          value={"1000-999999"}
                          title="Over $1000"
                          name="price"
                        />
                      </div>

                    </div>

                    <div className="ml-3 pb-10">
                      <div className="mt-5 text-[15px] font-[600] font-Roboto flex">Store reviews
                        <span>
                          <img width="25" src="https://s.alicdn.com/@img/imgextra/i4/O1CN018HNRIu1V0GjlgwCry_!!6000000002590-2-tps-72-48.png?webp=close" className="ml-1" />
                        </span>
                      </div>
                      <div className="mt-2 text-[13px] text-slate-400">Based on a 5-star rating system</div>
                      <div className="flex-col flex text-[15px]">
                      <label className="mt-1">
                          <input onChange={handleChangeRating} type="radio" value="" name="review" />
                          <span className="checkmark ml-2"></span>All
                        </label>
                        <Input
                          handleChange={handleChangeRating}
                          value={4}
                          title="4.0 & up"
                          name="review"
                        />
                        <Input
                          handleChange={handleChangeRating}
                          value={4.5}
                          title="4.5 & up"
                          name="review"
                        />
                        <Input
                          handleChange={handleChangeRating}
                          value={5}
                          title="5.0"
                          name="review"
                        />
                      </div>

                    </div>
                  </div>
                </div>
                
                {data && data.length === 0 ? (
                  <h1 className="text-center w-3/4 pb-[100px] text-[20px]">
                    No products Found!
                  </h1>) : 
                  <div className="w-3/4 mr-5 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[15px] mb-12">
                  {result && result.map((i, index) => <ProductCard data={i} key={index} />)}
                </div>}
              </div>
    );
};

export default Active1;