"use client";

import React, { useState } from "react";

interface QuantitySelectorProps {
  onQuantityChange?: (quantity: number, price: number) => void;
  cartId: string;
  unitPrice: number;
}

export default function QuantitySelectorPayment({
  onQuantityChange = () => {},
  cartId,
  unitPrice,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(() => {
    // Initialize quantity from localStorage
    const cartSessions = JSON.parse(
      localStorage.getItem("cartSession") || "[]",
    );
    const cartItem = cartSessions.find((item: any) => item.cart_id === cartId);
    return cartItem ? cartItem.quantity : 1;
  });

  const updateLocalStorage = (newQuantity: number) => {
    const cartSessions = JSON.parse(
      localStorage.getItem("cartSession") || "[]",
    );
    const newPrice = newQuantity * unitPrice;
    const cartIndex = cartSessions.findIndex(
      (item: any) => item.cart_id === cartId,
    );

    if (cartIndex > -1) {
      cartSessions[cartIndex] = {
        ...cartSessions[cartIndex], // Preserve other existing properties
        quantity: newQuantity,
        total_price: newPrice,
      };
    } else {
      cartSessions.push({
        cart_id: cartId,
        quantity: newQuantity,
        total_price: newPrice,
      });
    }

    localStorage.setItem("cartSession", JSON.stringify(cartSessions));
    onQuantityChange(newQuantity, newPrice);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const newQuantity = value ? Math.max(1, parseInt(value, 10)) : 1;
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);
  };

  const changeQuantity = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);
  };

  return (
    <div className="flex w-1/4 items-center justify-center rounded-md border border-gray-300">
      <button
        onClick={() => changeQuantity(-1)}
        className="w-full bg-gray-100 px-3 py-2 font-bold text-gray-700 hover:bg-gray-200"
      >
        -
      </button>

      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="w-12 p-2 text-center outline-none"
      />

      <button
        onClick={() => changeQuantity(1)}
        className="w-full bg-gray-100 px-3 py-2 font-bold text-gray-700 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
}
