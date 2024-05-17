import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import DetailsCard from "../DetailsCard/DetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import { ShopPreviewPage } from "../../../routes/ShopRoutes";

const ProductCard = ({ data,isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [image,setImage] = useState(0)
  console.log(data.supplierAttribute);
  const imageUrl = {
    url: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEA0PEBAPDw8NDw0NDQ8PDw8NDQ4PFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFyAzODMtNygtLisBCgoKDg0OFQ8QFy8dFx0vLS0tKystKy0tLS0rLS03Ny0tKy0rLSstKystKysrLSstKy0tLSstKy0tLS0tLS0rN//AABEIALEBHAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAABAgADBAUGBwj/xABDEAACAQIEAgYECggGAwAAAAAAAQIDEQQFEiExUQYTQWFxkSJSgaEUFTJCU2KisdHhFiNDVHKSwfAHM2OCo7Jzk/H/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB8RAQADAAIDAQEBAAAAAAAAAAABERICEyExUUFhA//aAAwDAQACEQMRAD8A+jKIyREhlE624IkHSMojKItaIkFIdRGURaURIKRYkGwtaV6RlEewUiWUVIZINghUCQhBCECALBsQgEsEhAIQhACAhAIQhAoFciwDCEiENgMACsZisAEsRigRxFsFsUoRDIVDIgKGQqGAKGFQyYBCAgDBFuG4BCLclwGCLclyBiXFuS4DXJcqcxXUKL7k1GZ1AKqBrTCZVVL4yAdguC5AJcNxSAEgAXAIAAYEYGRisCNisjYrAjBcjAUKmG5WmRyILdQdRQ5kUyjRqCpGdSHiyC9SGuUobUBYG5WpBuA9yXEuS4FlyXEuS4D3A2LclwEmimZpYko3AyuYuoulRAqRUGmjTGRVCFiwBnMKqFbRLBV1yXK0w3Aa5Li3JcBrguK2C4DXFYLgYBYjI2K2EFsW4rYoUECQNQHIIVkiEdICJlkWKkOgBqCpAaFZBapBUii4NYVquTUZlUHUgi7UTUVkAsuHUVkAsuS4lyXKLLkuV3FlMC65LlCmN1gFtyXKlMbUA9w3K9QdQD3JcS5LgOC4twXAa4rYLgbALFZGxWwIxSAuUVAYEMQSI6FSGQFkRytMa5BLE0gbBcCNAsMBoCJIZFbIgLHIrq11CMpSdoxTlJ8kg6TxPSrM6k6zo0usdOirScNoyn23fdw9jCvVU87oSvaU3bt6qqo+bRop4+nJXUvPZnyDGV5O6UrtcbVNbXi1tc4jzytQqR0YicHqSfpaklfd2dyNZfoCNRPg0/BphufHl0ljqbhmNRbrS5N8LcrLt2Po3RHMpYrDRqSl1jjOVPrVHQqtrekl7bO3bFlSYp3NQrYdJmxeNpUvly39Vby8gy0g0nHln8fmw/ml/RHNzPplTw6vVnTp9sVZynLwju2Val6mwUz4znv+KGJqNxwz6uHruMdb/D+9zh0OnGYxlqWKqt8pS1x8nsLhrEv0ImMjwHQTp68bUjhq8LV3GUoVKaeiairvUvmu3bwPeplpiYo4LgAQNclxQANcDYAAG4GC4smAWAXUC4BSJY56zOPNDLMo80MymodBIKRiWYx5onxjHmhUmobrDWMccfHmN8NjzFGoadJLGf4ZHmT4XHmKNNIrKfhUeYrxMeYo08L00z2c6k6FGpohhpasTLhCnHePC/6yWzemzV13XPO5J0pr4ZYim56ktMoOMYxlOVrbu73slvfsOF00xU6uJrVYxVNTqNTjGo5K8ZSWp878dtlc4ym+b95mZd8vW/p7PVLXTmrt+mqjlUj4atvZsXw6T9fCrCtWpVKeiUqcpUZ0q8aml2jp3i1e13qe3Z2nhJzd+x+O5bTx1Sl6UY0432v1abfmLWOMNEcwqyg4udtcrWVopbb7LiUQwCf7S7fYotyfs4mbEYnVZpNcb73vJu7ftPQ5LjaNOlBaU5u8qs5SSlKV+C7kuARRhOjlSo0l6N+Gpbv2XPrGW55HLsHhsNKn1lWlTUbRntzu/R9Hd8Nzy2V5lSUZSai/WvJbLkttzPh8V1lR1JP6yXYney8uPsFeWfft7mPSSu4uU+rptptRhG+hd7fGX9TgVMZKTcm93vu7mStjFpsu1ryX5mZYlFSidJM4qUacY0rdbWbjFvfQlxkeMqwhdyqSnVqS3lOTvd+L4nV6U1dU6SXBx0t9122vuObTut3wvYlkzMR4JPLozi5U3uvms5TTTs+w7bq6ZRlHa+zXYYc6S6y67Yxk/bf8CzHi2eHObqXv/wDBWrSVXGJ26+VOn1TfHq03rS9ui/h3H1uMj8y5Fmc8JiKOIpv0qUlK3rR+dF9zV0fo3A46FWnTqwd4VYRqR8Grmo8wc/EuhqJcz9cuZOuXMuXPTRcGoz9euYHXXMZNNOoVyM/XrmR1lzGTS9yFbKHWXMDrLmKNLmwXKHWXMXrlzFGniViR44rvKFgYv9vT/mQyy+P09PzRezj9Ovl8W/Cu8aOLK/i5fTU/NBWXL6Wn5onZH06+Xxasa+ZYsb3+8z/F3+tT80N8W/61PzG+P06+XxrWKfMR4582U/AZcOtp+YPi1/Sw8xuFxy+NCxz5ssp4xvtZTDLtvlxftHhlkuycfMbhMcvj5Rm+H6uu8Pq19XJxcue/5GKrxcux2VvA7+d4bRj8VF2dmpXXD0rN/wDY4uIjbVF2utL24b3ONvXLDJ7hxU7xS5NCVBKj28ioRvZe0to1mrb/AHFT+SvFipgdOhjWrK+ze5tjmDjaz4/g/wAThQTb23a38i2VTYWPSLMbpbhWP7zz1Otsu4dViWOjmGJ1uO+6W1zPDFK1mr8+T7zLUTknJfMs34cypTKzLbUrJpLlcz4+V5R/8S/7SDT9JpLixMdxduSivZe5ZnwxxjyzxPrnQ/MpxwGFTb2jNLwU5WPlOBwk61SnSppynVkoQS5s+yYbIqtKlSpRjtThGC3W9lxNcJo/1i4hpjnEuZJZs+ZnllFf1feiuWVV/U96N7hxxPxolm8uYqzeXNmf4qr+p70R5VX9T3oaXDTPNpLtZPjiXMzSyyu/me9AnlNb1WTRhoWcvmF5w+ZgeU1/UfmiPK6/qPzRdwmJbfjh8xHnD5mT4qreo/NCPK6/0b9xdmJedj0IxPrQXhdh/QnE+tHyZ9UqOEFeUoxX1mor3mKWb4e9oylUkvm0aVSr9ysjz4h6dy+eLoPivXh4bjx6CYntnH2b/wBT6EsTXn8ihoXZKvJQ+zG7C8HiJ/LrqCfFUKel25apX+5ExBuXgqfQCv21YxXO35mPFdF5QemniI1qnDq6cZSd++z2PpOHyKhHdxlUlxbqydT3Pb3G+GHjHaKjFcoxS+4Yg3L5TQ6GY6VrqMP4ql35I0PoTi/pYecj6dKiu1J+2wKWGUb7JN8bX39464OyXzD9Dcb2Tj/NIH6IY/sa/wDZJH1NUkv7QsrIdfE7JfJ85yTE0kq1WmrKChOcGtN9cXvyvueZxNS+9rc/Zsj61nHSvDUZOjKEazl6LpxaqN320uNrew8Jm2W4adVyVKvQjK7cKP6xK/8AG0l5pLkPEemrmfbx9Rlc+DO3WyWLf6uVbt2q04R+6TFXR2vtsmnu1fT4CynEi+CY2let7maZ5dVTfo3te9rO1uJsoYerZfq4bWv+ri3bm9i2U5SpX4NPzR28s6LYrEQlUpxgorZa5qGrna5R8XTbclGT3bk9F7O/JcOJ6jIejdfEJdXiNCXZpkrbb9pmb/D08zPo1jYNp4artd+ilU8nFtM5lz61huhOIXHFWXHaDv8Af/dzJ006IUowVftUYqtKDtJSStrs+N+3v38LF/qah81w9fS7/mvBrlxNcMNSqbxk4N8YbO3hzR1qXQqdaOvD4rDTV7ONWUqFVPk42av4MyYjofjae1qE/wCHE4e32pI3ESXDLOlGknvpvxlJpzfdFHNqz1PkuxHUqZBWW7pOm0t0pQqwfenBuwuAyapWnogtcvVheT/IkxK+HR6H5dWqupPDSSr0rfO0yVOSaco7c9n4956VZdnHbUmvGp+R1ehPQurhakcTWlolFSUacWm2mrPW1tbuPeKmJ/zifbO69PmMMozZpP4Ra/8AqP8AAd5Hm/7x/wAj/A+mfB43vpV+dlcqlhX82bXdJRnH8feZ64OyXzdZLnH0/wDyfkR5Pm/07/n/ACPosusj+yhUt6klGb8Iy2+0JPMaUf8AMvR2/awcIL/f8n3l64Ny+czy3OV+1k/CovwMtajnEN267X1XCX3H1aFWE1eMoSXOLUvuC4R/vYnXB2T8fGauZZlD5UsTG3Om0vuMj6SYz94qX/2/gfbXSgzLicuoVFadOnP+KEJfeh1/1ez+Pjf6S4394qfZ/AZdJsb+8T8o/gfTK3RHASd+ogn9W8F5J2KH0NwP0f2pExK9kfHZhlGHTT6tSkvnVL1ZfauboxSVlsu7YRTDrOrmdLx8xkV6xlNEDBUQKSJKskBYogk7f/bHJzDP6dFNykvA8viM7xOMloopwg/ndtiLEPTZr0gpYdNOWqXZCLvJnEbx2Y7NvCYd7ycbqc1yvxNOUdGIQaqVW51OPpbno3Gy7gvj8eLllVDDO1KHpbp1JelN893/AEKKlCDi2nJN7Le9u07eZL0m9jmygu7iSYWJcuGXRTu5Te2ybTXHiaI5Re76ySe1nw079xsjaPLe5ZKs2rJpGaW3Njkbj6Ual+e278zNPAuM7ptpp9sk1f63adScW18rtuVPCN/Odk7ii3Lq4NWa3T4LtbXjxO1kOInRvGKXDtb42LqeFhbfd2H0RVreBKW4k1XM63JL2yaOdmGZVZrRNrTyabudJSTVnbZgnSpvjYtpTwuKwvUSdSEtVKTWqKb1Qff3HQo5R1tPrIunNcWpRepHpJ4Kk1JWVpHBlCeDneN3Sb3j2JAZHl+lJqnQ37dLun5lNei+2NLZ8m39561YeniYKcLJvikY6+SvssC2zoVi5ufVynK0VdKMpaV7Ge5UfrP3Hg8lwTpTvw8D2uEd1xOkOfL20Wfrv2WJo+vJ+1fgFRRLIqGBKKtayty7AEuEcrF5Bh5vWodVU+kovqp+3Tx9pSsBiqVurxTml82vBT+0rM7LYBauTLMMTD/Mw6nzlSmn7mVx6Q0fnqdN8pxkjssz18PCW0op+KQC0MXSqJOM4u/JousjkV8hoveKdN84txKfiuuto15W7L7sDq6xKkn2FjRVUrJEVnlUkimeIm+2xXjc0hFPgecxedttqCbfuJKw9BUzJU95S4c2cPMekc6noUk32X7DHRy6rXd5t25dh6DAZJGFtgvhx8uySdaSnVbl48D2GAy+NJJRSGo0dPBGqBUmTQgWVOBEwSewZeYzG+powqi2zqZrT9JnPpRlftKoPBlU8NyN7i7AhTtxAx06bWzRopwZdJInWEpbKqNwvDFsKhppNCi2FYRlcsMzrtIz1YkLZaeFHr4CM1ZobW0R1mKW3nZ054Sd436tvdcu86+GxcalmnxHxcFUizzsoToTuvk34GaV6+lT4M6+EaR57K8cppHZotmrZmHUuC5nhUH1mmV1wXEUiNkDNiuQHIW4UXIVyA2LcIjYrC5C6ijkYrNoxXE4GOzu+0d2cxQqVXvex08DlXBtEbpzo0KtZ3k3bkdnLspStsdXDYFLsNkKdiSWXD0FFcDXBiKIbCkaYtFiRmgy6LCLRZg1CyZRirwuUdUuRrqFTQFDgVTiamiucSjG4iuBpcCaCoojA1UYghTNEIEESK5ovcSucSKxtAcC6VMmkozqmZsbglJcDpqI6pmZV45aqEu49NleYa0tyrMMApJ7HCg5UZ9wV7ynuOcTLsyUktzqxrJlZWOY0ZFI8WVFjFJqA2AGxWyNiMKa4LiNkuB4/A9h3cL2EIRW6I6IQCxBYCBDIsQSAQjIQIz1CshAoCSIQorYUQgDwLohIQFlbIQCuQjCQAxHiQgVK/A81m3aQgFWWcT02FCQqS1IdEIEQjIQKVishAFYCEA//9k=",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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"
    ]
  }
  const preImage = () => {
    setImage((image + 1)%(imageUrl.url.length));
  };

  const subImage = () => {
    if(image-1 < 0) setImage(imageUrl.url.length -1);
    else 
    setImage((image - 1)%imageUrl.url.length);
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
  
      <div className="mb-3 w-full h-[340px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end">
        </div>
        <div className="h-[70px] flex justify-between">
          <div className="ml-3 flex pt-3 "> 
            <img
               src={`${backend_url}${data.avatar}`}
               alt=""
                className="w-[50px] h-[50px] "
            />
            <div className="ml-3">

              <div className="text-[20px] font-[600] underline decoration-2 hover:text-orange-600">{data.name} Co., Ltd.</div>
              <div className="flex">
                {data.supplierAttribute.verifyType === "verifiedPro" ?< img className =""src="https://s.alicdn.com/@img/imgextra/i4/O1CN017JpSfh1MBsEOBrKwl_!!6000000001397-2-tps-135-32.png?webp=close" width="70"/>
                :< img className ="mt-1 h-1/2"src="https://img.alicdn.com/imgextra/i2/O1CN01YDryn81prCbNwab4Q_!!6000000005413-2-tps-168-42.png" width="45" height="20"/>}
                <div className="ml-2 text-[12px]">
                  <span> {data.supplierAttribute.yearOfExperience} </span>
                  <span>· {data.supplierAttribute.numberOfStaff} nhân viên </span>
                  <span>· {data.supplierAttribute.area} m² </span>
                  <span>· US $ {data.supplierAttribute.netWorth} m² </span>
                </div>
              </div>
              
                
            </div>
            
            
          </div>
          <div className="flex mr-10 pt-3">
            <div className="mr-5 mt-1 ">
              {click ? (
                <AiFillHeart
                  size={22}
                  className="cursor-pointer "
                  onClick={() => removeFromWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  className="cursor-pointer"
                  onClick={() => addToWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Add to wishlist"
                />
              )}
              
              {open ? <ShopPreviewPage /> : null}
            </div>
            <button className="rounded-full bg-white border border-black px-3 h-[30px] text-black font-[600] mr-10 hover:bg-gray-400">Contact Supplier</button>
            <Link to={`/shop/preview/${data._id}`}>
              <button className="rounded-full bg-orange-600 px-3 h-[30px] text-white font-[600] hover:bg-gray-400">View Profile</button>
            </Link>
            

          </div>
          
        </div>

         <div className="w-full flex justify-between mt-3">
          <div className="text-[14px]">
            <div>
              <div className="text-slate-500">Ratings & Reviews </div>
              <div><span className="font-[700]">4.8</span>/5 (19 reviews)</div>
              
            </div>
            
            <div className="mt-5">
            <div className="text-slate-500" >Factory capability</div>
            {data.capabilities.map((i, index) => {
                    return (
                      <div className="font-[700]">{i}</div>
                    );
                  })}
            </div>
          </div>

          <div className="Ảnh">
            <div className="mr-0 relative">
              <button className = "absolute top-1/2 left-1 text-white font-[800]" onClick={subImage}> &lt;  </button>
              <img src={`${backend_url}${data.images[image]}`} alt="" className="rounded-md w-[250px] h-[220px] "/>
              <button className = "absolute top-1/2 right-1 text-white font-[800]" onClick={preImage}> &gt;  </button>
            </div>
          </div>
         </div>
        
               

        
        

        {/* side options */}
        
      </div>
    
  );
};

export default ProductCard;
