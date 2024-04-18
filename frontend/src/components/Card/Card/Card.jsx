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
    <>
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
            
              <div className="text-[20px] font-[600] underline decoration-2">{data.name}</div>
              <div className="text-[12px]">8 yrs ·20+ nhân viên ·380+ m² · US $160,000+</div>
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
            <button className="rounded-full bg-white border border-black px-3 h-[30px] text-black font-[600] mr-10">Contact Supplier</button>
            <button className="rounded-full bg-orange-600 px-3 h-[30px] text-white font-[600]">View Profile</button>

          </div>
          
        </div>

        <div>
          <div>Ratings & Reviews 4.8/5 (19 reviews)</div>
          <div>Factory capability</div>
          <div>· Supplier assessment procedures</div>
            <div>· ODM service available</div>


        </div>

               

        
        

        {/* side options */}
        
      </div>
    </>
  );
};

export default ProductCard;
