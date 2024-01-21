"use client";
import { Nav } from "../components/Nav";
import { Footer } from "../components/footer";
import { useState, useEffect } from "react";
import Link from "next/link";

import Skeleton from "react-loading-skeleton";

export default function Category() {
  const [data, setData] = useState(null);

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

  const Star = () => (
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
  );

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Nav />
      <hr className="mt-6" />
      <div className="container mx-auto px-4 lg:px-20">
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
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-1 hidden lg:block">
            {data ? (
              <div className="card">
                <div className="flex justify-between">
                  <h1 className="filter-light-header">Filters</h1>

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
                  </svg>
                </div>

                <hr />

                <div className="mt-3">
                  <div className="flex justify-between items-center filter-link-container">
                    <p className="filter-link">T shirt</p>
                    <LeftArrow />
                  </div>
                  <div className="flex justify-between items-center filter-link-container">
                    <p className="filter-link">Shorts</p>
                    <LeftArrow />
                  </div>
                  <div className="flex justify-between items-center filter-link-container">
                    <p className="filter-link">Skirt</p>
                    <LeftArrow />
                  </div>
                  <div className="flex justify-between items-center filter-link-container">
                    <p className="filter-link">Hoodie</p>
                    <LeftArrow />
                  </div>
                  <div className="flex justify-between items-center filter-link-container">
                    <p className="filter-link">Jean</p>
                    <LeftArrow />
                  </div>
                </div>

                <hr />

                <div className="filter-section">
                  <h1 className="filter-light-header mt-2">Price</h1>

                  <progress id="file" value="32" max="100">
                    {" "}
                    32%{" "}
                  </progress>
                </div>

                <div className="filter-section">
                  <h1 className="filter-light-header">Colors</h1>

                  <div className="flex justify-between">
                    <div style={{ position: "relative" }}>
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

                      <svg
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="18.5"
                          fill="#00C12B"
                        />
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="17.5"
                          stroke="black"
                          stroke-opacity="0.2"
                          stroke-width="2"
                        />
                      </svg>
                    </div>

                    <div style={{ position: "relative" }}>
                      <svg
                        width="38"
                        height="37"
                        viewBox="0 0 38 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="19" cy="18.5001" r="18.5" fill="#F50606" />
                        <circle
                          cx="19"
                          cy="18.5001"
                          r="18"
                          stroke="black"
                          stroke-opacity="0.2"
                        />
                      </svg>
                    </div>

                    <div style={{ position: "relative" }}>
                      <svg
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="18.5"
                          fill="#F5DD06"
                        />
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="18"
                          stroke="black"
                          stroke-opacity="0.2"
                        />
                      </svg>
                    </div>

                    <div style={{ position: "relative" }}>
                      <svg
                        width="38"
                        height="37"
                        viewBox="0 0 38 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="19" cy="18.5001" r="18.5" fill="#F57906" />
                        <circle
                          cx="19"
                          cy="18.5001"
                          r="18"
                          stroke="black"
                          stroke-opacity="0.2"
                        />
                      </svg>
                    </div>

                    <div style={{ position: "relative" }}>
                      <svg
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="18.5"
                          fill="#06CAF5"
                        />
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="18"
                          stroke="black"
                          stroke-opacity="0.2"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="flex justify-between"
                    style={{ marginTop: "1rem" }}
                  >
                    <div style={{ position: "relative" }}>
                      {/* <svg
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
                    </svg> */}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                      >
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="18.5"
                          fill="#063AF5"
                        />
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="17.5"
                          stroke="black"
                          stroke-opacity="0.2"
                          stroke-width="2"
                        />
                      </svg>
                    </div>

                    <div style={{ position: "relative" }}>
                      <svg
                        width="38"
                        height="37"
                        viewBox="0 0 38 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="19" cy="18.5001" r="18.5" fill="#7D06F5" />
                        <circle
                          cx="19"
                          cy="18.5001"
                          r="18"
                          stroke="black"
                          stroke-opacity="0.2"
                        />
                      </svg>
                    </div>

                    <div style={{ position: "relative" }}>
                      <svg
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="18.5"
                          fill="#F506A4"
                        />
                        <circle
                          cx="18.5"
                          cy="18.5001"
                          r="18"
                          stroke="black"
                          stroke-opacity="0.2"
                        />
                      </svg>
                    </div>

                    <div style={{ position: "relative" }}>
                      <svg
                        width="38"
                        height="37"
                        viewBox="0 0 38 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="19" cy="18.5001" r="18.5" fill="white" />
                        <circle
                          cx="19"
                          cy="18.5001"
                          r="18"
                          stroke="black"
                          stroke-opacity="0.2"
                        />
                      </svg>
                    </div>

                    <div style={{ position: "relative" }}>
                      <svg
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="18.5" cy="18.5001" r="18.5" fill="black" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="filter-section">
                  <h1 className="filter-light-header">Size</h1>
                  <div className="flex flex-wrap">
                    {sizes.map((e) => (
                      <button className="size-button">{e}</button>
                    ))}
                  </div>
                </div>

                <div className="filter-section">
                  <h1 className="filter-light-header">Dress Style</h1>
                  <div>
                    <div className="flex justify-between items-center filter-link-container">
                      <p className="filter-link">T shirt</p>
                      <LeftArrow />
                    </div>
                    <div className="flex justify-between items-center filter-link-container">
                      <p className="filter-link">Shorts</p>
                      <LeftArrow />
                    </div>
                    <div className="flex justify-between items-center filter-link-container">
                      <p className="filter-link">Skirt</p>
                      <LeftArrow />
                    </div>
                    <div className="flex justify-between items-center filter-link-container">
                      <p className="filter-link">Hoodie</p>
                      <LeftArrow />
                    </div>
                    <div className="flex justify-between items-center filter-link-container">
                      <p className="filter-link">Jean</p>
                      <LeftArrow />
                    </div>
                  </div>

                  <button className="hero-button mt-4">Apply Filter</button>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="flex justify-between mb-6">
                  <Skeleton width={80} />
                  <Skeleton width={50} />
                </div>

                <hr className="mb-4" />

                <Skeleton className=" mb-3" count={5} />

                <Skeleton width={70} className="mt-5" />

                <Skeleton width={200} className="mb-5" />
                <hr />

                <Skeleton width={70} className="mt-5" />

                <div className="flex flex-wrap">
                  {new Array(10).fill(0).map((e) => (
                    <Skeleton
                      className="mr-2 mb-3"
                      height={35}
                      width={35}
                      circle={true}
                    />
                  ))}
                </div>

                <hr />

                <Skeleton width={50} className="mt-5" />

                <Skeleton width={200} />
              </div>
            )}
          </div>

          <div className="col-span-4 lg:col-span-3">
            {data ? (
              <>
                <div className="flex justify-between only-small">
                  <div className="flex items-center">
                    <h2 className="product-price big">Casual</h2>
                    <p className="filter-link ml-2">
                      Showing 1- 10 of 100 products.{" "}
                    </p>
                  </div>

                  <div>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="16" fill="#F0F0F0" />
                      <path
                        d="M16.75 15.75V21.5C16.75 21.6989 16.671 21.8897 16.5303 22.0303C16.3897 22.171 16.1989 22.25 16 22.25C15.8011 22.25 15.6103 22.171 15.4697 22.0303C15.329 21.8897 15.25 21.6989 15.25 21.5V15.75C15.25 15.5511 15.329 15.3603 15.4697 15.2197C15.6103 15.079 15.8011 15 16 15C16.1989 15 16.3897 15.079 16.5303 15.2197C16.671 15.3603 16.75 15.5511 16.75 15.75ZM20.5 20C20.3011 20 20.1103 20.079 19.9697 20.2197C19.829 20.3603 19.75 20.5511 19.75 20.75V21.5C19.75 21.6989 19.829 21.8897 19.9697 22.0303C20.1103 22.171 20.3011 22.25 20.5 22.25C20.6989 22.25 20.8897 22.171 21.0303 22.0303C21.171 21.8897 21.25 21.6989 21.25 21.5V20.75C21.25 20.5511 21.171 20.3603 21.0303 20.2197C20.8897 20.079 20.6989 20 20.5 20ZM22 17.5H21.25V10.5C21.25 10.3011 21.171 10.1103 21.0303 9.96967C20.8897 9.82902 20.6989 9.75 20.5 9.75C20.3011 9.75 20.1103 9.82902 19.9697 9.96967C19.829 10.1103 19.75 10.3011 19.75 10.5V17.5H19C18.8011 17.5 18.6103 17.579 18.4697 17.7197C18.329 17.8603 18.25 18.0511 18.25 18.25C18.25 18.4489 18.329 18.6397 18.4697 18.7803C18.6103 18.921 18.8011 19 19 19H22C22.1989 19 22.3897 18.921 22.5303 18.7803C22.671 18.6397 22.75 18.4489 22.75 18.25C22.75 18.0511 22.671 17.8603 22.5303 17.7197C22.3897 17.579 22.1989 17.5 22 17.5ZM11.5 18C11.3011 18 11.1103 18.079 10.9697 18.2197C10.829 18.3603 10.75 18.5511 10.75 18.75V21.5C10.75 21.6989 10.829 21.8897 10.9697 22.0303C11.1103 22.171 11.3011 22.25 11.5 22.25C11.6989 22.25 11.8897 22.171 12.0303 22.0303C12.171 21.8897 12.25 21.6989 12.25 21.5V18.75C12.25 18.5511 12.171 18.3603 12.0303 18.2197C11.8897 18.079 11.6989 18 11.5 18ZM13 15.5H12.25V10.5C12.25 10.3011 12.171 10.1103 12.0303 9.96967C11.8897 9.82902 11.6989 9.75 11.5 9.75C11.3011 9.75 11.1103 9.82902 10.9697 9.96967C10.829 10.1103 10.75 10.3011 10.75 10.5V15.5H10C9.80109 15.5 9.61032 15.579 9.46967 15.7197C9.32902 15.8603 9.25 16.0511 9.25 16.25C9.25 16.4489 9.32902 16.6397 9.46967 16.7803C9.61032 16.921 9.80109 17 10 17H13C13.1989 17 13.3897 16.921 13.5303 16.7803C13.671 16.6397 13.75 16.4489 13.75 16.25C13.75 16.0511 13.671 15.8603 13.5303 15.7197C13.3897 15.579 13.1989 15.5 13 15.5ZM17.5 12.5H16.75V10.5C16.75 10.3011 16.671 10.1103 16.5303 9.96967C16.3897 9.82902 16.1989 9.75 16 9.75C15.8011 9.75 15.6103 9.82902 15.4697 9.96967C15.329 10.1103 15.25 10.3011 15.25 10.5V12.5H14.5C14.3011 12.5 14.1103 12.579 13.9697 12.7197C13.829 12.8603 13.75 13.0511 13.75 13.25C13.75 13.4489 13.829 13.6397 13.9697 13.7803C14.1103 13.921 14.3011 14 14.5 14H17.5C17.6989 14 17.8897 13.921 18.0303 13.7803C18.171 13.6397 18.25 13.4489 18.25 13.25C18.25 13.0511 18.171 12.8603 18.0303 12.7197C17.8897 12.579 17.6989 12.5 17.5 12.5Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
                <div className="hidden justify-between md:flex lg:flex">
                  <h2 className="filter-header">Casual</h2>

                  <div className="flex items-center">
                    <p className="filter-link">
                      Showing 1 - 10 of 100 products.
                    </p>

                    <p>Sort By: Most Popular</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <Skeleton width={100} />
                <Skeleton width={100} />
              </div>
            )}

            <div className="grid grid-cols-2 2xl:grid-cols-4 md:grid-cols-3 lg:grid-cols-3 gap-3 mt-3">
              {data
                ? data.map((product) => (
                    <Link href={`/product/${product._id}`}>
                      <div className="">
                        <div className="product-img-container">
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
                  ))
                : [1, 2, 3].map((product) => (
                    <div className="">
                      <div className="product-img-container">
                        <Skeleton style={{ width: "100%", height: "100%" }} />
                      </div>

                      <Skeleton className="w-40" />
                      <div className="flex mt-2 mb-2">
                        {[1, 2, 3, 4].map((e) => (
                          <Skeleton
                            className="mr-2"
                            height={20}
                            width={20}
                            circle={true}
                          />
                        ))}
                      </div>
                      <Skeleton className="mr-2" height={20} width={70} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
