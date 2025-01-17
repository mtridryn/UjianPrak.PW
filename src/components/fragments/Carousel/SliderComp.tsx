"use client";

import Slider from "react-slick";
import { useRef, useEffect, useState } from "react";
import Card from "@/components/core/Card/Card";
import CardSkeleton from "@/components/core/Skeleton/CardSkeleton";
import { getLatestProducts } from "@/app/api/product/latest_product";
import ProductPreview from "@/app/lib/model/product_review";

export default function SliderComp() {
  const sliderRef = useRef(null);

  const [products, setProducts] = useState<ProductPreview[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const latestProducts = await getLatestProducts();
      setProducts(latestProducts);
    };
    fetchProducts();
  }, []);

  let settings = {
    className: "center",
    centerMode: true,
    snapToGrid: false,
    swipeToSlide: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {products.length === 0
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <CardSkeleton />
              </div>
            ))
          : products.map((product, index) => (
              <Card
                key={index}
                product_id={product.product_id}
                title={product.name}
                description={product.description}
                price={product.price}
                imageUrl={"assets" + product.image_url}
              />
            ))}
      </Slider>
    </>
  );
}
