"use client";

import React, { useState, useEffect } from "react";
import "@/app/assets/css/detail_produk.css";
import "@/app/assets/css/skeleton-loading.css";
import QuantitySelector from "@/components/core/Input/QuantitySelector";
import formatRupiah from "@/app/lib/format_money";
import Swal from "sweetalert2";
import { useRouter, useParams } from "next/navigation";
import { getProductByProductId } from "@/app/api/product/detail_product";
import CartItem from "@/app/lib/model/cartItem";
import Image from "next/image";
import addCartItem from "@/app/api/cart/add_cart";
import Product from "@/app/lib/model/product";
import { Button } from "@/components/ui/button";
import { Check, SquareArrowLeft } from "lucide-react";

const SkeletonText = ({ width }: { width: string }) => (
  <span className="skeleton-loading" style={{ width }}></span>
);

const SkeletonImg = ({ width, height }: { width: string; height: string }) => (
  <div className="skeleton-loading" style={{ width, height }}></div>
);

export default function DetailProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { id } = useParams();

  const session = localStorage.getItem("userSession");
  const userData = JSON.parse(session!);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProductByProductId(id as string);

        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Product Not Found`,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              router.push("/");
            }
          });
        }
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleAddToCart = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to add to cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        if (selectedSize && selectedColor) {
          await addCartItem(
            userData.user_id,
            id as string,
            product!.price,
            quantity,
            selectedSize,
            selectedColor,
          );
          router.push("/keranjang");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in the color and size first",
          });
        }
      }
    } catch (error) {
      Swal.fire("Failed", "Failed to remove the item from the cart.", "error");
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleProceedToPayment = async () => {
    const selectedCartItems: CartItem[] = [];

    if (!product) {
      Swal.fire({
        icon: "warning",
        title: "Product data has not finished loading",
        text: "Please wait a moment",
      });
      return;
    }

    if (!selectedColor || !selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in the color and size first",
      });
      return;
    }

    selectedCartItems.push({
      cart_id: "",
      product_id: product.product_id,
      image_url: product?.image_url,
      name: product.name,
      description: product.description,
      selectedColor: selectedColor!,
      selectedSize: selectedSize!,
      quantity: quantity,
      price: product.price,
      total_price: product.price * quantity,
    });

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to checkout you cart?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (selectedCartItems.length > 0) {
          if (result.isConfirmed) {
            localStorage.setItem(
              "cartSession",
              JSON.stringify(selectedCartItems),
            );
            router.push("/payment");
            console.log(
              "Selected items saved to localStorage:",
              selectedCartItems,
            );
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "No matching items found",
          });
        }
      });
    } catch (error) {
      Swal.fire("Failed", "Failed to remove the item from the cart.", "error");
    }
  };

  return (
    <div>
      <Button
        variant={"link"}
        onClick={() => router.back()}
        className="fixed left-2 top-10 flex cursor-pointer items-center [&_svg]:size-8"
      >
        <SquareArrowLeft className="text-gray-700 duration-300 hover:text-black" />
      </Button>

      <div className="flex min-h-screen items-center justify-center bg-[#f4f1eb] p-4 md:p-8">
        <div className="flex w-full max-w-screen-xl flex-col rounded-xl bg-white shadow-lg md:flex-col">
          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center p-4 md:p-6">
              {product ? (
                <Image
                  src={"/assets" + product!.image_url}
                  width={500}
                  height={500}
                  priority
                  alt="Detail Produk"
                  className="rounded-md object-contain"
                />
              ) : (
                <SkeletonImg width="500px" height="500px" />
              )}
            </div>

            <div className="max-h-screen flex-1 overflow-y-auto p-4 md:max-h-[600px] md:p-6">
              <div className="mb-2 flex flex-col">
                <span className="mb-3 max-w-min rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                  HOTSALE
                </span>
                <h1 className="text-xl font-bold md:text-2xl">
                  {product ? product.name : <SkeletonText width="50%" />}
                </h1>
              </div>

              <p className="mb-5 text-sm text-gray-500">
                {product ? (
                  `${product.category} | ${formatRupiah(product.price)}`
                ) : (
                  <SkeletonText width="70%" />
                )}
                {/* {product ? (
                  `${product.category} | ⭐️ 4.9 (2130 reviews) | ${formatRupiah(product.price)}`
                ) : (
                  <SkeletonText width="70%" />
                )} */}
              </p>

              <h1 className="text-lg font-semibold">Description :</h1>

              <div className="mt-2 space-y-2 text-justify text-sm text-gray-700 md:text-base">
                {product ? product.description : <SkeletonText width="90%" />}
              </div>

              <div className="mt-6 flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      width={100}
                      height={100}
                      src="/assets/image/seller.png"
                      alt="Store Logo"
                      className="size-16 rounded-full object-scale-down"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-md font-semibold">
                          Reza Store
                        </span>
                        <span className="rounded-md bg-green-600 p-0.5 text-xs font-semibold [&_svg]:size-4">
                          <Check className="text-white" />
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-green-500">
                          • Online
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant={"outline"}
                    className="rounded-lg border border-green-500 px-4 font-semibold text-green-500 hover:bg-green-50"
                  >
                    Follow
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <span>⭐️ 5.0</span>
                    <span>(8 rb)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <span>⏱️ ± 1 hour</span>
                    <span>order processed</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-lg font-semibold">Select Size:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product
                    ? product.variant?.map((variant, index) => (
                        <button
                          key={index}
                          onClick={() => handleSizeSelect(variant)}
                          className={`mb-2 rounded-md px-4 py-2 font-semibold ${
                            selectedSize === variant
                              ? "bg-[#f9f7f3] text-[#a7a39b]"
                              : "border-2 border-[#e2dfd9] bg-transparent text-gray-800"
                          }`}
                        >
                          {variant}
                        </button>
                      ))
                    : Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                          <div className="h-8 w-[100px] rounded-md bg-gray-300"></div>
                        </div>
                      ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-lg font-semibold">Select Color:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product
                    ? product.color?.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => handleColorSelect(color)}
                          className={`mb-2 rounded-md px-4 py-2 font-semibold ${
                            selectedColor === color
                              ? "bg-[#f9f7f3] text-[#a7a39b]"
                              : "border-2 border-[#e2dfd9] bg-transparent text-gray-800"
                          }`}
                        >
                          {color}
                        </button>
                      ))
                    : Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                          <div className="h-8 w-[100px] rounded-md bg-gray-300"></div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between space-y-4 overflow-x-auto rounded-b-xl bg-white p-4 shadow-md sm:px-4 md:left-20 md:right-20 md:flex-row md:space-x-8 md:space-y-0 md:p-6">
            <div className="flex flex-shrink-0 items-center space-x-4">
              {product ? (
                <img
                  src={"/assets" + product!.image_url}
                  alt="Detail Produk"
                  className="h-[40px] w-[40px] rounded-md"
                />
              ) : (
                <SkeletonImg width="40px" height="40px" />
              )}
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold md:text-base">
                  {product ? product.name : <SkeletonText width="150px" />}
                </p>
                <p className="text-xs font-semibold text-blue-400 md:text-sm">
                  {product ? (
                    `${product!.category} | ${product!.quantityInStock}`
                  ) : (
                    <SkeletonText width="75px" />
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center space-x-4">
              <span className="text-sm font-semibold text-gray-700 md:text-base">
                Qty:
              </span>

              <QuantitySelector onQuantityChange={handleQuantityChange} />

              <button
                onClick={() => handleProceedToPayment()}
                className="rounded-md border border-blue-500 px-4 py-2 text-xs font-semibold text-blue-500 duration-300 hover:bg-blue-500 hover:text-white md:text-sm"
              >
                CHECKOUT
              </button>

              <button
                onClick={() => handleAddToCart()}
                className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 md:text-sm"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
