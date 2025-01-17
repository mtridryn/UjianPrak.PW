"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Card from "@/components/core/Card/search_list";
import Navbar from "@/components/fragments/Navbar/Navbar";
import Footer from "@/components/fragments/Footer/Footer";
import SideBar from "@/components/fragments/Sidebar/ProductList";
import searchProductsByName from "@/app/api/search_list/product";
import ProductPreview from "@/app/lib/model/product_review";
import SearchListSkeleton from "@/components/core/Skeleton/SearchListSkeleton";

import "@/app/assets/css/home.css";

export default function Keranjang() {
  const { keyword } = useParams();
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [filters, setFilters] = useState<any>({
    name: keyword,
  });
  const [loading, setLoading] = useState(true);
  const [noItems, setNoItems] = useState(false);

  const handleFilterSubmit = (newFilters: any) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      setNoItems(false);
      const data = await searchProductsByName(filters);
      setProducts(data);
      setLoading(false);
    };

    if (keyword) {
      applyFilters();
    }
  }, [keyword, filters]);

  useEffect(() => {
    if (loading) {
      if (products.length == 0) {
        const timer = setTimeout(() => {
          setNoItems(true);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, products, keyword]);

  return (
    <div className="">
      <Navbar />

      <div className="container mt-16 min-h-[77vh]">
        <div className="fixed mb-5 h-full w-1/5">
          <SideBar
            onSubmitFilters={handleFilterSubmit}
            params={keyword as string}
          />
        </div>
        <div className="flex w-full pt-10">
          <div className="ml-96 w-full p-5">
            {loading ? (
              ""
            ) : products.length === 0 ? (
              <div className="h-[400px]">
                <p className="mt-10 text-center text-gray-500">
                  No items match
                </p>
              </div>
            ) : (
              <p className="mb-2 font-semibold">
                `Showing 1 - {products.length} of total items for 'All
                Categories'`
              </p>
            )}

            <div className="pb-4">
              {loading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index}>
                      <SearchListSkeleton />
                    </div>
                  ))}
                </div>
              ) : noItems ? (
                <div className="h-[400px]">
                  <p className="mt-10 text-center text-gray-500">
                    No items match
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product, index) => (
                    <Card
                      key={index}
                      product_id={product.product_id}
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      imageUrl={"/assets" + product.image_url}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!loading && (
        <div className="ml-[20.9rem]">
          <Footer />
        </div>
      )}
    </div>
  );
}
