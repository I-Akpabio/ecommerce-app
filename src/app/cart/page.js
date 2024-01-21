"use client";
import { Nav } from "../components/Nav";
import { Footer } from "../components/footer";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";

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

export default function Cart() {
  const [cart, setCart] = useState(null);

  const subtotal =
    cart != null
      ? cart.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      : 0;

  const refresh = () => {
    fetch(`http://localhost:3001/cart`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log(data);
      });
  };

  const updateCart = (units, id) => {
    const newCartItem = { _id: id, units };

    postData("http://localhost:3001/update-cart", newCartItem).then(
      (newCartItem) => {
        toast("Updated cart");

        refresh()

        console.log(newCartItem);
      }
    );
  };

  const deleteCart = (item) => {
    fetch("http://localhost:3001/remove-from-cart", {
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
      body: JSON.stringify(item), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((res) => {
        refresh();
        toast("Removed from cart");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3001/cart`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <Nav />
      <hr className="mt-6" />

      <div className="container mx-auto px-6 lg:px-20">
        <div
          className="flex items-center"
          style={{ marginTop: "1.69rem", marginBottom: "1.69rem" }}
        >
          <span className="filter-link mr-2">Home</span>
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
          <span className="text-dark-1 mr-1">Cart</span>
        </div>

        <div>
          <h1 className="product-hero-text mb-6">YOUR CART</h1>

          <div className="lg:flex">
            <div className="w-full lg:w-3/5 lg:mr-5">
              {cart != null ? (
                <div className="card">
                  {cart &&
                    cart.map((item) => (
                      <div className="product-section mb-4">
                        <div className="flex">
                          <div className="cart-img-container mr-5">
                            <img src={item.image} alt="" />
                          </div>

                          <div style={{ flexGrow: "1" }}>
                            <div className="flex justify-between">
                              <div>
                                <h1 className="product-label">{item.name}</h1>
                                <p>
                                  {" "}
                                  <span className="text-dark-3">
                                    Size:{" "}
                                  </span>{" "}
                                  <span className="text-light-3">
                                    {" "}
                                    {item.size}
                                  </span>
                                </p>
                                <p>
                                  {" "}
                                  <span className="text-dark-3">
                                    Color:{" "}
                                  </span>{" "}
                                  <span className="text-light-3"> White</span>
                                </p>
                              </div>

                              <svg
                                onClick={() => deleteCart(item)}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z"
                                  fill="#FF3333"
                                />
                              </svg>
                            </div>

                            <div className="flex justify-between mt-4 mb-1">
                              <h1 className="product-price">${item.price}</h1>
                              <div className="size-button flex justify-between cart-controls">
                                <button style={{ background: "transparent" }}>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
                                      fill="black"
                                    />
                                  </svg>
                                </button>
                                <button
                                  style={{
                                    background: "transparent",
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  {item.units}
                                </button>
                                <button
                                  onClick={() =>
                                    updateCart(Number(item.units) + 1, item["_id"])
                                  }
                                  style={{ background: "transparent" }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
                                      fill="black"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="card">
                  {[1, 2].map((item) => (
                    <div className="product-section mb-4">
                      <div className="flex">
                        <Skeleton width={125} height={187} className="mr-5" />

                        <div style={{ flexGrow: "1" }}>
                          <div className="flex justify-between">
                            <div>
                              <Skeleton width={300} />
                              <Skeleton width={100} />
                              <Skeleton width={100} />
                            </div>

                            <Skeleton width={30} height={30} />
                          </div>

                          <div className="flex justify-between mt-4 mb-1">
                            <Skeleton width={100} height={30} />
                            <Skeleton width={200} height={30} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-2/5 mt-3 lg:mt-0 md:mt-3">
              {cart != null ? (
                <div className="card">
                  <div className="product-price mb-6">Order Summary</div>

                  <div className="flex justify-between">
                    <p className="text-light-1">Subtotal</p>
                    <p className="product-label">${subtotal}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-light-1">Discount (-20%)</p>
                    <p className="product-label">$45</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-light-1">Delivery Fee</p>
                    <p className="product-label">$34</p>
                  </div>

                  <hr />
                  <div className="flex justify-between mt-3">
                    <p className="text-light-1">Total</p>
                    <p className="product-label">${subtotal}</p>
                  </div>

                  <div className="flex items-start">
                    <div
                      className="text-area-container w-2/3"
                      style={{ marginRight: "0.75rem" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.0766 12.4857L13.7653 3.17444C13.5917 2.9997 13.3851 2.86115 13.1576 2.76685C12.93 2.67254 12.686 2.62435 12.4397 2.62507H3.75001C3.45164 2.62507 3.16549 2.7436 2.95451 2.95457C2.74353 3.16555 2.62501 3.4517 2.62501 3.75007V12.4398C2.62429 12.6861 2.67248 12.9301 2.76679 13.1576C2.86109 13.3852 2.99963 13.5918 3.17438 13.7654L12.4856 23.0766C12.8372 23.4281 13.3141 23.6256 13.8113 23.6256C14.3084 23.6256 14.7853 23.4281 15.1369 23.0766L23.0766 15.1369C23.4281 14.7853 23.6255 14.3085 23.6255 13.8113C23.6255 13.3141 23.4281 12.8373 23.0766 12.4857ZM13.8113 21.2204L4.87501 12.2813V4.87507H12.2813L21.2175 13.8113L13.8113 21.2204ZM9.37501 7.87507C9.37501 8.17174 9.28703 8.46175 9.12221 8.70842C8.95739 8.9551 8.72312 9.14736 8.44903 9.26089C8.17494 9.37442 7.87334 9.40412 7.58237 9.34625C7.2914 9.28837 7.02413 9.14551 6.81435 8.93573C6.60457 8.72595 6.46171 8.45868 6.40383 8.1677C6.34595 7.87673 6.37566 7.57513 6.48919 7.30104C6.60272 7.02695 6.79498 6.79269 7.04165 6.62786C7.28833 6.46304 7.57834 6.37507 7.87501 6.37507C8.27283 6.37507 8.65436 6.5331 8.93567 6.81441C9.21697 7.09571 9.37501 7.47724 9.37501 7.87507Z"
                          fill="black"
                          fill-opacity="0.4"
                        />
                      </svg>

                      <input type="text" placeholder="Add Promo Code" />
                    </div>

                    <button className="hero-button w-full">Apply</button>
                  </div>

                  <button
                    style={{ width: "100%" }}
                    className="hero-button flex justify-center items-center"
                  >
                    Go To Checkout{" "}
                    <span style={{ marginLeft: "0.7rem" }}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9133 3.71169L17.5383 9.33669C17.6257 9.42379 17.695 9.52728 17.7423 9.64124C17.7897 9.75519 17.814 9.87737 17.814 10.0008C17.814 10.1241 17.7897 10.2463 17.7423 10.3603C17.695 10.4742 17.6257 10.5777 17.5383 10.6648L11.9133 16.2898C11.7372 16.4659 11.4983 16.5649 11.2492 16.5649C11.0001 16.5649 10.7613 16.4659 10.5852 16.2898C10.409 16.1137 10.3101 15.8748 10.3101 15.6258C10.3101 15.3767 10.409 15.1378 10.5852 14.9617L14.6094 10.9375L3.125 10.9375C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 9.99997C2.1875 9.75133 2.28627 9.51288 2.46209 9.33706C2.6379 9.16125 2.87636 9.06247 3.125 9.06247L14.6094 9.06247L10.5844 5.03826C10.4083 4.86214 10.3093 4.62326 10.3093 4.37419C10.3093 4.12512 10.4083 3.88625 10.5844 3.71013C10.7605 3.53401 10.9994 3.43506 11.2484 3.43506C11.4975 3.43506 11.7364 3.53401 11.9125 3.71013L11.9133 3.71169Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              ) : (
                <div className="card">
                  <Skeleton width={200} height={30} />

                  <div className="flex justify-between mt-4 mb-4">
                    <Skeleton width={100} height={25} />
                    <Skeleton width={100} height={25} />
                  </div>

                  <div className="flex justify-between mb-4">
                    <Skeleton width={100} height={25} />
                    <Skeleton width={100} height={25} />
                  </div>

                  <div className="flex justify-between mb-4">
                    <Skeleton width={100} height={25} />
                    <Skeleton width={100} height={25} />
                  </div>

                  <hr />

                  <div className="flex justify-between mt-3 mb-4">
                    <Skeleton width={100} height={25} />
                    <Skeleton width={100} height={25} />
                  </div>

                  <div className="flex items-start">
                    <div
                      className="text-area-container w-2/3"
                      style={{ marginRight: "0.75rem" }}
                    >
                      <Skeleton height={25} />
                    </div>

                    <Skeleton width={100} height={25} />
                  </div>

                  <Skeleton
                    style={{ width: "100%" }}
                    height={36}
                    className="mt-4"
                  ></Skeleton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
