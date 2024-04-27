import Input from "../Layout/Input";
import Card from "../Card/Card/Card"
const Active2 = ({data,handleChange}) => {
    return (
        <div className="flex justify-between mb-20">
                <div className="w-1/4">
                  <div className="w-11/12 mx-auto bg-white rounded ">
                    <div className="ml-3 pt-5 text-[25px] text-center md:text-start font-[600] font-Roboto pb-[20px]" >Filters</div>

                    <div className="ml-3 ">
                      <div className="mt-5 text-[17px] font-[600] font-Roboto">Supplier attributes</div>
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
                      <div className="mt-5 text-[15px] font-[600] font-Roboto flex">Store reviews
                        <span>
                          <img width="25" src="https://s.alicdn.com/@img/imgextra/i4/O1CN018HNRIu1V0GjlgwCry_!!6000000002590-2-tps-72-48.png?webp=close" className="ml-1" />
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

                    <div className="ml-3 pb-10">
                      <div className="mt-5 text-[15px] font-[600] font-Roboto mb-1">Capabilities</div>
                      <div className="flex-col flex text-[15px]">

                        <Input
                          handleChange={{}}
                          value={"Supplies Fortune 500 companies"}
                          title="Supplies Fortune 500 companies"
                          name="capabilities"
                        />
                        <Input
                          handleChange={{}}
                          value={"Design-based customization"}
                          title="Design-based customization"
                          name="capabilities"
                        />
                        <Input
                          handleChange={{}}
                          value={"R&D capabilities"}
                          title="R&D capabilities"
                          name="capabilities"
                        />
                        <Input
                          handleChange={{}}
                          value={"Design services"}
                          title="Design services"
                          name="capabilities"
                        />
                        <Input
                          handleChange={{}}
                          value={"Project solutions"}
                          title="Project solutions"
                          name="capabilities"
                        />
                        <Input
                          handleChange={{}}
                          value={"OEM for well-known brands"}
                          title="OEM for well-known brands"
                          name="capabilities"
                        />
                        <Input
                          handleChange={{}}
                          value={"Socially responsible"}
                          title="Socially responsible"
                          name="capabilities"
                        />
                        <Input
                          handleChange={{}}
                          value={"ODM service available"}
                          title="ODM service available"
                          name="capabilities"
                        />
                      </div>

                    </div>

                  </div>
                </div>
                
                {data && data.length === 0 ? (
                  <h1 className="text-center w-3/4 pb-[100px] text-[20px]">
                    No supplier Found!
                  </h1>) : 
                  <div className="w-3/4 mr-5 grid grid-cols-1 mb-12 ">
                  {data && data.filter(data => data.type === "Supplier").map((i, index) => <Card data={i} key={index} />)}

                </div>
                  }
              </div>
    );
};

export default Active2;