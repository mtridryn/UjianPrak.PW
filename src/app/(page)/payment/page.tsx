"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "@/components/fragments/Navbar/Navbar";
import DropdownShipping from "@/components/core/Dropdown/ShippingDropdown";
import QuantitySelectorPayment from "@/components/core/Input/QuantitySelectorPayment";
import { handleCheckout } from "@/app/api/transaksi/transaksi";
import Image from "next/image";

import { getProfileByUserId } from "@/app/api/profile/profile";

interface Product {
  cart_id: string;
  product_id: string;
  image_url: string;
  name: string;
  description: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  price: number;
  total_price: number;
}

export default function Checkout() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedShippingETA, setSelectedETA] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [alamat, setAlamat] = useState({
    nama: "Recipient's name",
    nomor: "(+62) 888-8888-8888",
    detail:
      "Jl. Moch Kahfi II Gg. Suro, Cipedak, Kec. Jagakarsa, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, ID 12630.",
  });

  const [formInput, setFormInput] = useState(alamat);

  const handleUbah = () => {
    setIsEditing(true);
  };

  const handleSimpan = () => {
    setAlamat(formInput);
    setIsEditing(false);
  };

  const session = localStorage.getItem("userSession");
  const userData = JSON.parse(session!);

  useEffect(() => {
    const updateProducts = () => {
      const cartData = localStorage.getItem("cartSession");
      if (cartData) {
        const parsedCartData = JSON.parse(cartData);
        setProducts(parsedCartData);
      }
    };

    window.addEventListener("storage", updateProducts);
    updateProducts();

    return () => {
      window.removeEventListener("storage", updateProducts);
    };
  }, []);

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const HANDLING_FEE = 1500;
  const SERVICE_COST = 1000;

  const totalOrder = subtotal + shippingCost + HANDLING_FEE + SERVICE_COST;

  const handleShippingSelect = (option: {
    price: string;
    name: string;
    eta: string;
  }) => {
    setShippingCost(parseInt(option.price));
    setSelectedShipping(option.name);
    setSelectedETA(option.eta);
  };

  const handleDefault = async () => {
    try {
      if (!userData?.user_id) {
        Swal.fire({
          icon: "error",
          title: "User ID Missing",
          text: "Unable to fetch profile. Please login first.",
        });
        return;
      }

      const profile = await getProfileByUserId(userData.user_id);

      if (profile) {
        setFormInput({
          nama: profile.name || "Recipient's name",
          nomor: profile.phone || "(+62) 888-8888-8888",
          detail: profile.location || "Complete address",
        });

        Swal.fire({
          icon: "success",
          title: "Profile Loaded",
          text: "Default profile has been loaded successfully.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load default profile. Please try again.",
      });
    }
  };

  const handleCheckoutClick = async () => {
    if (!selectedMethod) {
      Swal.fire({
        icon: "warning",
        title: "Empty Payment Method",
        text: "Please select a payment method before proceeding!",
      });
      return;
    }

    if (!shippingCost) {
      Swal.fire({
        icon: "warning",
        title: "Expedition Not Selected",
        text: "Please select an expedition before continuing!",
      });
      return;
    }

    if (products.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Empty Cart",
        text: "There are no products in the cart for checkout",
      });
      return;
    }

    await handleCheckout({
      user_id: userData?.user_id ?? "",
      email: userData?.email ?? "",
      recipient: alamat.nama ?? "",
      telepon: alamat.nomor ?? "",
      address: alamat.detail ?? "",
      description:
        "Terima kasih telah berbelanja di toko kami! 😊, Kami sangat menghargai kepercayaan Anda dalam memilih produk kami. Silakan selesaikan pembayaran untuk memproses pesanan Anda segera. Jangan khawatir, proses pembayaran aman dan mudah! 💳, Jika Anda mengalami kesulitan, tim kami siap membantu kapan saja. Selamat berbelanja dan semoga hari Anda menyenangkan! 🌟",
      price: products.map((p) => p.price),
      amount: products.map((p) => p.quantity),
      color: products.map((p) => p.selectedColor),
      variant: products.map((p) => p.selectedSize),
      product_id: products.map((p) => p.product_id),
      cart_id: products.map((p) => p.cart_id),

      shippingName: selectedShipping,
      shippingCost: shippingCost,
      shippingETA: selectedShippingETA,
    });
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex min-h-screen justify-center bg-gray-100">
        <div className="mx-auto mb-10 mt-24 max-w-7xl rounded-lg bg-white p-6 shadow-lg">
          <h1 className="my-10 text-center text-3xl font-bold">Check Out</h1>

          <div className="grid grid-cols-2 gap-x-10 gap-y-5 md:grid-cols-2">
            <div>
              <div className="rounded-lg border bg-gray-50 p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-medium">Shipping address</h2>
                {!isEditing ? (
                  <div className="space-y-2">
                    <p className="font-semibold">{alamat.nama}</p>
                    <p>{alamat.nomor}</p>
                    <p>{alamat.detail}</p>
                    <button
                      onClick={handleUbah}
                      className="mt-2 text-blue-500 underline hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label
                        className="mb-2 block font-semibold"
                        htmlFor="nama"
                      >
                        Recipient's name
                      </label>
                      <input
                        id="nama"
                        type="text"
                        value={formInput.nama}
                        onChange={(e) =>
                          setFormInput((prev) => ({
                            ...prev,
                            nama: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        className="mb-2 block font-semibold"
                        htmlFor="nomor"
                      >
                        Phone number
                      </label>
                      <input
                        id="nomor"
                        type="text"
                        value={formInput.nomor}
                        onChange={(e) =>
                          setFormInput((prev) => ({
                            ...prev,
                            nomor: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        className="mb-2 block font-semibold"
                        htmlFor="detail"
                      >
                        Complete address
                      </label>
                      <textarea
                        id="detail"
                        value={formInput.detail}
                        onChange={(e) =>
                          setFormInput((prev) => ({
                            ...prev,
                            detail: e.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSimpan}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                      >
                        Save
                      </button>

                      <button
                        onClick={handleDefault}
                        className="rounded-lg border border-blue-500 px-4 py-2 text-blue-500 shadow hover:bg-blue-500 hover:text-white"
                      >
                        Default Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row-span-3">
              <div className="rounded-lg border bg-gray-50 p-4">
                <h2 className="mb-4 text-2xl font-medium">Order Summary</h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.cart_id}
                      className="flex space-x-2 border-b pb-4"
                    >
                      <div className="w-24">
                        <img
                          src={"assets" + product.image_url}
                          alt="Product"
                          className="h-[80px] w-[80px]"
                        />
                      </div>

                      <div className="w-full">
                        <div className="flex justify-between">
                          <p className="font-semibold">{product.name}</p>
                          <p className="ml-64 font-semibold">
                            Rp{product.total_price.toLocaleString("id-ID")}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600">
                          Variant: {product.selectedSize}
                        </p>

                        <p className="mb-3 text-sm text-gray-600">
                          Color: {product.selectedColor}
                        </p>

                        <QuantitySelectorPayment
                          onQuantityChange={(quantity, price) => {
                            const cartSessions = JSON.parse(
                              localStorage.getItem("cartSession") || "[]",
                            );
                            const cartIndex = cartSessions.findIndex(
                              (item: any) => item.cart_id === product.cart_id,
                            );

                            if (cartIndex > -1) {
                              cartSessions[cartIndex] = {
                                ...cartSessions[cartIndex],
                                quantity: quantity,
                                total_price: price,
                              };

                              localStorage.setItem(
                                "cartSession",
                                JSON.stringify(cartSessions),
                              );
                              window.dispatchEvent(new Event("storage"));
                            }
                          }}
                          cartId={product.cart_id}
                          unitPrice={product.price}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter Voucher Code"
                    className="mb-2 w-full rounded border p-2"
                  />
                  <button className="w-full rounded bg-blue-500 py-2 text-white">
                    Apply
                  </button>
                </div>
                <div className="mt-4 text-sm">
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span>Subtotal Products</span>
                    <span>Rp{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal Service</span>
                    <span>Rp {SERVICE_COST.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Handling Fee</span>
                    <span>Rp {HANDLING_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Costs</span>
                    <span>Rp {shippingCost.toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Orders</span>
                    <span>Rp {totalOrder.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="row-span-4 mt-6">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white"
                >
                  Checkout
                </button>
              </div>
            </div>

            <div>
              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="space-y-2">
                  <h2 className="mb-4 text-2xl font-medium">Payment Method</h2>
                  <div>
                    <input
                      type="radio"
                      id="transfer-bank"
                      name="payment-method"
                      className="mr-2"
                      value="transfer"
                      onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    <label htmlFor="transfer-bank">Cashless</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="cod"
                      name="payment-method"
                      className="mr-2"
                      value="cod"
                      onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>
                </div>
              </div>

              {selectedMethod === "transfer" && (
                <div className="mt-4">
                  <DropdownShipping onShippingSelect={handleShippingSelect} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
