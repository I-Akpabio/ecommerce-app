"use client";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/footer";
import { useState, useEffect, useReducer } from "react";
import Link from "next/link";

import { toast } from "react-toastify";

import Skeleton from "react-loading-skeleton";

import { ToastContainer } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return {
        ...state,
        image: action.image,
        color: action.color,
        size: action.size,
      };

    case "set_image":
      return { ...state, image: action.image };
    case "set_size":
      return { ...state, size: action.size };
    case "set_color":
      return { ...state, color: action.color };
    case "set_added":
      return { ...state, addedToCart: action.addedToCart };
  }
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default function Product({ params }) {
  const [state, dispatch] = useReducer(reducer, {
    image: "",
    color: "",
    size: "",
    addedToCart: null,
  });

  const { image, color, size, addedToCart } = state;

  const [product, setProducts] = useState(null);
  const [cart, setCart] = useState(null);
  const [similarList, setSimilarList] = useState(null);

  const RightArrow = () => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2.8291C10.0716 2.8291 8.18657 3.40093 6.58319 4.47227C4.97982 5.54362 3.73013 7.06636 2.99218 8.84794C2.25422 10.6295 2.06114 12.5899 2.43735 14.4812C2.81355 16.3725 3.74215 18.1098 5.10571 19.4734C6.46928 20.837 8.20656 21.7656 10.0979 22.1418C11.9892 22.518 13.9496 22.3249 15.7312 21.5869C17.5127 20.849 19.0355 19.5993 20.1068 17.9959C21.1782 16.3925 21.75 14.5075 21.75 12.5791C21.7473 9.99408 20.7192 7.51571 18.8913 5.68783C17.0634 3.85994 14.585 2.83183 12 2.8291ZM16.2806 10.8597L11.0306 16.1097C10.961 16.1795 10.8783 16.2348 10.7872 16.2725C10.6962 16.3103 10.5986 16.3297 10.5 16.3297C10.4014 16.3297 10.3038 16.3103 10.2128 16.2725C10.1218 16.2348 10.039 16.1795 9.96938 16.1097L7.71938 13.8597C7.57865 13.719 7.49959 13.5281 7.49959 13.3291C7.49959 13.1301 7.57865 12.9392 7.71938 12.7985C7.86011 12.6577 8.05098 12.5787 8.25 12.5787C8.44903 12.5787 8.6399 12.6577 8.78063 12.7985L10.5 14.5188L15.2194 9.79848C15.2891 9.72879 15.3718 9.67352 15.4628 9.63581C15.5539 9.59809 15.6515 9.57868 15.75 9.57868C15.8486 9.57868 15.9461 9.59809 16.0372 9.63581C16.1282 9.67352 16.2109 9.72879 16.2806 9.79848C16.3503 9.86816 16.4056 9.95088 16.4433 10.0419C16.481 10.133 16.5004 10.2306 16.5004 10.3291C16.5004 10.4276 16.481 10.5252 16.4433 10.6163C16.4056 10.7073 16.3503 10.79 16.2806 10.8597Z"
        fill="#01AB31"
      />
    </svg>
  );

  const LeftArrow = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z"
        fill="black"
        fill-opacity="0.6"
      />
    </svg>
  );

  const CheckBox = () => (
    <svg
      style={{
        position: "absolute",
        bottom: "12px",
        left: "10px",
      }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5306 5.03063L6.5306 13.0306C6.46092 13.1005 6.37813 13.156 6.28696 13.1939C6.1958 13.2317 6.09806 13.2512 5.99935 13.2512C5.90064 13.2512 5.8029 13.2317 5.71173 13.1939C5.62057 13.156 5.53778 13.1005 5.4681 13.0306L1.9681 9.53063C1.89833 9.46087 1.84299 9.37804 1.80524 9.28689C1.76748 9.19574 1.74805 9.09804 1.74805 8.99938C1.74805 8.90072 1.76748 8.80302 1.80524 8.71187C1.84299 8.62072 1.89833 8.53789 1.9681 8.46813C2.03786 8.39837 2.12069 8.34302 2.21184 8.30527C2.30299 8.26751 2.40069 8.24808 2.49935 8.24808C2.59801 8.24808 2.69571 8.26751 2.78686 8.30527C2.87801 8.34302 2.96083 8.39837 3.0306 8.46813L5.99997 11.4375L13.4693 3.96938C13.6102 3.82848 13.8013 3.74933 14.0006 3.74933C14.1999 3.74933 14.391 3.82848 14.5318 3.96938C14.6727 4.11028 14.7519 4.30137 14.7519 4.50063C14.7519 4.69989 14.6727 4.89098 14.5318 5.03188L14.5306 5.03063Z"
        fill="white"
      />
    </svg>
  );

  const Star = () => (
    <span style={{ marginRight: "0.4rem" }}>
      {" "}
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.24494 0.255005L11.8641 5.89491L18.0374 6.6431L13.4829 10.8769L14.679 16.9793L9.24494 13.956L3.8109 16.9793L5.00697 10.8769L0.452479 6.6431L6.62573 5.89491L9.24494 0.255005Z"
          fill="#FFC633"
        />
      </svg>
    </span>
  );

  useEffect(() => {
    fetch(`http://localhost:3001/products/${params.productid}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);

        dispatch({
          type: "init",
          image: data.images[0],
          color: data.colors[0],
          size: data.size[0],
        });
      });

    fetch(`http://localhost:3001/cart`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log(data);

        const added =
          data.filter((item) => item["product"] == params.productid).length > 0;

        console.log(added);

        dispatch({ type: "set_added", addedToCart: added });
      });

    fetch(`http://localhost:3001/similar`)
      .then((res) => res.json())
      .then((data) => {
        setSimilarList(data);

        console.log(data);
      });
  }, []);

  const setImage = (img) => {
    dispatch({ type: "set_image", img });
  };

  const setSize = (size) => {
    dispatch({ type: "set_size", size });
  };

  const setColor = (color) => {
    dispatch({ type: "set_color", color });
  };

  const addToCart = () => {
    const newCartItem = { ...product, color, size };

    console.log(newCartItem);

    postData("http://localhost:3001/add-to-cart", newCartItem).then((data) => {
      toast("Added to cart");
      dispatch({ type: "set_added", addedToCart: true });
      console.log(data);
    });
  };

  const updateCart = () => {
    const cartItem = cart.filter(item => item["product"] == params.productid)[0]

    const newCartItem = {  "_id": cartItem["_id"], units: 2 };


    postData("http://localhost:3001/update-cart", newCartItem)
    .then((newCartItem) => {
      toast("Added to cart");
      
      console.log(newCartItem);
    });
  };

  const SkeletonContainer = () => (
    <>
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-6 md:col-span-4 lg:col-span-2">
          <div className="big product-img w-full"></div>
        </div>
        <div className="col-span-6 md:col-span-2 lg:col-span-1 md:order-first lg:order-first">
          <div className="flex md:flex-col lg:flex-col justify-between">
            <>
              <div className="small product-img flex justify-center">
                <Skeleton />
              </div>

              <div className="small product-img flex justify-center">
                <Skeleton />
              </div>

              <div className="small product-img flex justify-center">
                <Skeleton />
              </div>
            </>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3">
          <Skeleton />
          <div className="flex mt-2 mb-2">
            {[1, 2, 3, 4].map((e) => (
              <Skeleton className="mr-2" height={20} width={20} circle={true} />
            ))}
          </div>

          <div className="">
            <Skeleton />

            <Skeleton />
          </div>

          <div className="product-section">
            <Skeleton count={3} />
          </div>

          <div className="product-section">
            <Skeleton width={100} />

            <Skeleton width={200} />
          </div>

          <div className="product-section mb-3">
            <Skeleton width={100} />

            <div className="flex flex-wrap">
              <Skeleton width={200} />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 mr-2">
              <Skeleton height={40} />
            </div>
            <div className="w-2/3">
              <Skeleton height={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Nav />
      <hr className="mt-6" />
      <div></div>
      <div className="container mx-auto px-6 lg:px-20">
        <div
          className="flex items-center"
          style={{ marginTop: "1.69rem", marginBottom: "1.69rem" }}
        >
          <span className="filter-link">Home</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.53073 2.46937L11.5307 7.46937C11.6007 7.53905 11.6561 7.62184 11.694 7.71301C11.7318 7.80417 11.7513 7.90191 11.7513 8.00062C11.7513 8.09933 11.7318 8.19707 11.694 8.28824C11.6561 8.3794 11.6007 8.46219 11.5307 8.53187L6.53073 13.5319C6.38984 13.6728 6.19874 13.7519 5.99948 13.7519C5.80023 13.7519 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0006C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8L5.46761 3.53062C5.32671 3.38973 5.24756 3.19863 5.24756 2.99937C5.24756 2.80011 5.32671 2.60902 5.46761 2.46812C5.60851 2.32723 5.7996 2.24807 5.99886 2.24807C6.19812 2.24807 6.38921 2.32723 6.53011 2.46812L6.53073 2.46937Z"
              fill="black"
              fill-opacity="0.6"
            />
          </svg>
          Casual
        </div>

        {product ? (
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-6 md:col-span-4 lg:col-span-2">
              <div className="big product-img w-full">
                <img className="" src={image} alt="" />
              </div>
            </div>
            <div className="col-span-6 md:col-span-2 lg:col-span-1 md:order-first lg:order-first">
              <div className="flex md:flex-col lg:flex-col justify-between">
                {product && product.images ? (
                  <>
                    <div
                      className="small product-img flex justify-center"
                      onClick={() => setImage(product.images[0])}
                    >
                      <img className="h-full" src={product.images[0]} alt="" />
                    </div>

                    <div
                      className="small product-img flex justify-center"
                      onClick={() =>
                        setImage(product.images[1] || product.images[0])
                      }
                    >
                      <img
                        className="h-full"
                        src={product.images[1] || product.images[0]}
                        alt=""
                      />
                    </div>

                    <div className="small product-img flex justify-center">
                      <img
                        className="h-full"
                        src={product.images[2] || product.images[0]}
                        alt=""
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3">
              <h1 className="product-hero-text">{product?.name}</h1>
              <div className="flex mt-2 mb-2">
                {[1, 2, 3, 4].map((e) => (
                  <Star />
                ))}

                <span className="product-rate-numerator">
                  {product?.rating}/
                </span>
                <span className="product-rate-denom">5</span>
              </div>

              <div className="flex items-center">
                <p className="product-page-price mr-3">${product?.price}</p>

                {product && product.discount ? (
                  <>
                    <p className="product-strike-price mr-3">$300</p>
                    <p className="product-discount-percent">
                      -{product?.discount}%
                    </p>
                  </>
                ) : null}
              </div>

              <div className="product-section">
                <p className="filter-link">{product?.description}</p>
              </div>

              <div className="product-section">
                <p className="filter-link mb-3">Select Colors</p>

                <div className="flex">
                  {product && product.colors
                    ? product.colors.map((e) => (
                        <div style={{ position: "relative" }}>
                          {e == color ? <CheckBox /> : null}

                          <svg
                            onClick={() => setColor(e)}
                            style={{ marginRight: "1rem" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                          >
                            <circle cx="18.5" cy="18.5" r="18.5" fill={e} />
                          </svg>
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <div className="product-section">
                <p className="filter-link mb-3">Chooze Size</p>

                <div className="flex flex-wrap">
                  {product && product.size
                    ? product.size.map((e) => (
                        <button
                          onClick={() => setSize(e)}
                          className={`${
                            e == size ? "size-button-black" : "size-button"
                          } mr-2`}
                        >
                          {e}
                        </button>
                      ))
                    : null}
                </div>
              </div>

              <div className="flex items-center">
                <div className="size-button flex justify-between w-1/3 mr-2">
                  <button
                    disabled={!addedToCart === false ? false : true}
                    style={{ background: "transparent" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`${!addedToCart ? "opacity-20" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <button
                    style={{ background: "transparent", fontSize: "1rem" }}
                  >
                    1
                  </button>
                  <button
                    disabled={!addedToCart === false ? false : true}
                    onClick={() => updateCart()}
                    style={{ background: "transparent" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${!addedToCart ? "opacity-20" : ""}`}
                    >
                      <path
                        d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-2/3">
                  <button
                    disabled={addedToCart === false ? false : true}
                    onClick={addToCart}
                    style={{ width: "100%", marginTop: "43px" }}
                    className={`w-full hero-button ${
                      addedToCart ? "opacity-30" : ""
                    }`}
                  >
                    {addedToCart ? "Added" : "Add"} to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SkeletonContainer />
        )}
      </div>

      {product && (
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex mb-5 mt-14 mb-12">
            <button className="product-link w-1/3">Product Details</button>
            <button className="product-link active w-1/3">
              Rating & Reviews
            </button>
            <button className="product-link w-1/3">FAQs</button>
          </div>

          <div className="content">
            <div className="flex justify-between mb-5 items-center">
              <p className="product-label">
                All Reviews <span className="review-count">(43)</span>
              </p>

              <div>
                <button className="size-button">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.125 12.125V20.75C13.125 21.0484 13.0065 21.3345 12.7955 21.5455C12.5845 21.7565 12.2984 21.875 12 21.875C11.7016 21.875 11.4155 21.7565 11.2045 21.5455C10.9935 21.3345 10.875 21.0484 10.875 20.75V12.125C10.875 11.8266 10.9935 11.5405 11.2045 11.3295C11.4155 11.1185 11.7016 11 12 11C12.2984 11 12.5845 11.1185 12.7955 11.3295C13.0065 11.5405 13.125 11.8266 13.125 12.125ZM18.75 18.5C18.4516 18.5 18.1655 18.6185 17.9545 18.8295C17.7435 19.0405 17.625 19.3266 17.625 19.625V20.75C17.625 21.0484 17.7435 21.3345 17.9545 21.5455C18.1655 21.7565 18.4516 21.875 18.75 21.875C19.0484 21.875 19.3345 21.7565 19.5455 21.5455C19.7565 21.3345 19.875 21.0484 19.875 20.75V19.625C19.875 19.3266 19.7565 19.0405 19.5455 18.8295C19.3345 18.6185 19.0484 18.5 18.75 18.5ZM21 14.75H19.875V4.25C19.875 3.95163 19.7565 3.66548 19.5455 3.4545C19.3345 3.24353 19.0484 3.125 18.75 3.125C18.4516 3.125 18.1655 3.24353 17.9545 3.4545C17.7435 3.66548 17.625 3.95163 17.625 4.25V14.75H16.5C16.2016 14.75 15.9155 14.8685 15.7045 15.0795C15.4935 15.2905 15.375 15.5766 15.375 15.875C15.375 16.1734 15.4935 16.4595 15.7045 16.6705C15.9155 16.8815 16.2016 17 16.5 17H21C21.2984 17 21.5845 16.8815 21.7955 16.6705C22.0065 16.4595 22.125 16.1734 22.125 15.875C22.125 15.5766 22.0065 15.2905 21.7955 15.0795C21.5845 14.8685 21.2984 14.75 21 14.75ZM5.25 15.5C4.95163 15.5 4.66548 15.6185 4.4545 15.8295C4.24353 16.0405 4.125 16.3266 4.125 16.625V20.75C4.125 21.0484 4.24353 21.3345 4.4545 21.5455C4.66548 21.7565 4.95163 21.875 5.25 21.875C5.54837 21.875 5.83452 21.7565 6.0455 21.5455C6.25647 21.3345 6.375 21.0484 6.375 20.75V16.625C6.375 16.3266 6.25647 16.0405 6.0455 15.8295C5.83452 15.6185 5.54837 15.5 5.25 15.5ZM7.5 11.75H6.375V4.25C6.375 3.95163 6.25647 3.66548 6.0455 3.4545C5.83452 3.24353 5.54837 3.125 5.25 3.125C4.95163 3.125 4.66548 3.24353 4.4545 3.4545C4.24353 3.66548 4.125 3.95163 4.125 4.25V11.75H3C2.70163 11.75 2.41548 11.8685 2.2045 12.0795C1.99353 12.2905 1.875 12.5766 1.875 12.875C1.875 13.1734 1.99353 13.4595 2.2045 13.6705C2.41548 13.8815 2.70163 14 3 14H7.5C7.79837 14 8.08452 13.8815 8.2955 13.6705C8.50647 13.4595 8.625 13.1734 8.625 12.875C8.625 12.5766 8.50647 12.2905 8.2955 12.0795C8.08452 11.8685 7.79837 11.75 7.5 11.75ZM14.25 7.25H13.125V4.25C13.125 3.95163 13.0065 3.66548 12.7955 3.4545C12.5845 3.24353 12.2984 3.125 12 3.125C11.7016 3.125 11.4155 3.24353 11.2045 3.4545C10.9935 3.66548 10.875 3.95163 10.875 4.25V7.25H9.75C9.45163 7.25 9.16548 7.36853 8.9545 7.5795C8.74353 7.79048 8.625 8.07663 8.625 8.375C8.625 8.67337 8.74353 8.95952 8.9545 9.1705C9.16548 9.38147 9.45163 9.5 9.75 9.5H14.25C14.5484 9.5 14.8345 9.38147 15.0455 9.1705C15.2565 8.95952 15.375 8.67337 15.375 8.375C15.375 8.07663 15.2565 7.79048 15.0455 7.5795C14.8345 7.36853 14.5484 7.25 14.25 7.25Z"
                      fill="black"
                      fill-opacity="0.4"
                    />
                  </svg>{" "}
                </button>
                <button className="size-button hidden">Latest </button>
                <button className="md-hero-button">Write a Review</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
                <div className="card col-span-2 md:col-span-1 lg:col-span-1">
                  <div className="flex justify-between">
                    <div className="flex">
                      {[1, 2, 3, 4].map((e) => (
                        <Star />
                      ))}
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.625 12C14.625 12.5192 14.471 13.0267 14.1826 13.4584C13.8942 13.8901 13.4842 14.2265 13.0045 14.4252C12.5249 14.6239 11.9971 14.6758 11.4879 14.5746C10.9787 14.4733 10.511 14.2233 10.1438 13.8562C9.77673 13.489 9.52673 13.0213 9.42544 12.5121C9.32415 12.0029 9.37614 11.4751 9.57482 10.9955C9.7735 10.5158 10.11 10.1058 10.5416 9.81739C10.9733 9.52895 11.4808 9.375 12 9.375C12.6962 9.375 13.3639 9.65156 13.8562 10.1438C14.3484 10.6361 14.625 11.3038 14.625 12ZM4.5 9.375C3.98083 9.375 3.47331 9.52895 3.04163 9.81739C2.60995 10.1058 2.2735 10.5158 2.07482 10.9955C1.87614 11.4751 1.82415 12.0029 1.92544 12.5121C2.02673 13.0213 2.27673 13.489 2.64385 13.8562C3.01096 14.2233 3.47869 14.4733 3.98789 14.5746C4.49709 14.6758 5.02489 14.6239 5.50455 14.4252C5.9842 14.2265 6.39417 13.8901 6.68261 13.4584C6.97105 13.0267 7.125 12.5192 7.125 12C7.125 11.3038 6.84844 10.6361 6.35616 10.1438C5.86387 9.65156 5.19619 9.375 4.5 9.375ZM19.5 9.375C18.9808 9.375 18.4733 9.52895 18.0416 9.81739C17.61 10.1058 17.2735 10.5158 17.0748 10.9955C16.8761 11.4751 16.8242 12.0029 16.9254 12.5121C17.0267 13.0213 17.2767 13.489 17.6438 13.8562C18.011 14.2233 18.4787 14.4733 18.9879 14.5746C19.4971 14.6758 20.0249 14.6239 20.5045 14.4252C20.9842 14.2265 21.3942 13.8901 21.6826 13.4584C21.971 13.0267 22.125 12.5192 22.125 12C22.125 11.6553 22.0571 11.3139 21.9252 10.9955C21.7933 10.677 21.5999 10.3876 21.3562 10.1438C21.1124 9.90009 20.823 9.70673 20.5045 9.57482C20.1861 9.4429 19.8447 9.375 19.5 9.375Z"
                        fill="black"
                        fill-opacity="0.4"
                      />
                    </svg>
                  </div>

                  <div className="flex mt-4 mb-4">
                    <h3 className="product-label">Joe Addams</h3>
                    <RightArrow />
                  </div>

                  <p className="filter-link">
                    "I'm blown away by the quality and style of the clothes I
                    received from Shop.co. From casual wear to elegant dresses,
                    every piece I've bought has exceeded my expectations.”
                  </p>

                  <p className="filter-link mt-6">Posted on August 14, 2023</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button className="view-all-button">Load More Reviews</button>
            </div>

            <h1 className="header-text my-8 text-center">
              You might also like
            </h1>

            <div className="grid grid-cols-4 gap-3 mb-10">
              {similarList &&
                similarList.map((product) => (
                  <Link href={"/product/" + product["_id"]}>
                    <div className="col-span-4 md:col-span-2 lg:col-span-1">
                      <div className="product-img-cotainer">
                        <img
                          className="product-img"
                          src={product.images[0]}
                          alt=""
                        />
                      </div>

                      <p className="product-label">{product.name}</p>
                      <div className="flex mt-2 mb-2">
                        {[1, 2, 3, 4].map((e) => (
                          <Star />
                        ))}
                      </div>
                      <p className="product-price">${product.price}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      <Footer />

      <ToastContainer />
    </>
  );
}
