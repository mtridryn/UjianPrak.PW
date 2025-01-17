"use client";

import Link from "next/link";
import Navbar from "@/components/fragments/Navbar/Navbar";
import Footer from "@/components/fragments/Footer/Footer";
import ShoppingCart from "@/components/fragments/Cart/ShoppingCart";

export default function Keranjang() {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 sm:px-5 md:px-0 lg:px-0">
        <ShoppingCart />
      </div>

      <Footer />
    </div>
  );
}
