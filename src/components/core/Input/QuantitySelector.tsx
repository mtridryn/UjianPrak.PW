"use client";

import React, { useState } from "react";

interface QuantitySelectorProps {
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  onQuantityChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const newQuantity = value ? parseInt(value) : 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="flex items-center rounded-md border border-gray-300">
      <button
        onClick={decrementQuantity}
        className="bg-gray-100 px-3 py-2 font-bold text-gray-700 hover:bg-gray-200"
      >
        −
      </button>

      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="w-12 p-2 text-center outline-none"
      />

      <button
        onClick={incrementQuantity}
        className="bg-gray-100 px-3 py-2 font-bold text-gray-700 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
}
