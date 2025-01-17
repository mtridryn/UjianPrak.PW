"use client";

import "@/app/assets/css/home.css";
import Navbar from "@/components/fragments/Navbar/Navbar";
import Footer from "@/components/fragments/Footer/Footer";
import Header from "@/components/fragments/Header/Header";
import HeaderSection from "@/components/fragments/HeaderSection/HeaderSection";
import EditorPick from "@/components/fragments/EditorPick/EditorPick";
import SliderComp from "@/components/fragments/Carousel/SliderComp";
import SliderBestProduct from "@/components/fragments/Carousel/SliderBestProduct";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>

      <Header />

      <div className="flex justify-center">
        <div className="container mx-auto px-4 sm:px-5 md:px-0 lg:px-0">
          <div>
            <HeaderSection
              title={"FLASH SALE"}
              subtitle={"Today's"}
              link={"Ini Link"}
            />

            <div className="mb-5 overflow-x-hidden">
              <div className="mx-auto max-w-7xl">
                <div>
                  <SliderComp></SliderComp>
                </div>
              </div>
            </div>

            <HeaderSection
              title={"EDITOR'S PICK"}
              subtitle={"Categories"}
              link={"Ini Link"}
            />

            <div className="mb-10">
              <EditorPick />
            </div>

            <HeaderSection
              title={"BEST SELLER PRODUCTS"}
              subtitle={"Categories"}
              link={"Ini Link"}
            />

            <div className="mb-10 overflow-x-hidden">
              <div className="mx-auto max-w-7xl">
                <div>
                  <SliderBestProduct></SliderBestProduct>
                </div>
              </div>
            </div>

            <HeaderSection
              title={"Our Resell World Wide"}
              subtitle={"Best"}
              link={"Ini Link"}
            />

            <div className="mx-auto mb-10 flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-[#f6f0eb] p-8 md:flex-row">
              <div className="flex-1 text-center md:text-left">
                <p className="mb-4 text-sm leading-relaxed text-gray-700 md:text-base text-justify">
                  Belanjakuy in your #1 trusted Indonesia vendor offering high-demand streetwear and electronics, 
                  allowing you to buy the best quality at very low and sell high for incredible profits. 
                  At Belanjakuy, we pride ourselves on providing exclusive access to premium products 
                  from top-tier brands, ensuring you stay ahead in the competitive reselling market. 
                  From limited-edition sneakers to the latest electronics, we curate a wide range of high-demand 
                  items to meet your business needs. With unbeatable prices and a seamless shopping experience,
                  we empower entrepreneurs and resellers to grow their profits effortlessly. 
                  Shop with confidence and take your business to the next level with Belanjakuy!
                </p>
                <button className="mt-4 rounded-lg bg-gray-300 px-5 py-2 text-gray-700 shadow-md transition-shadow hover:bg-gray-400">
                  Show More
                </button>
              </div>

              <div className="flex-1">
                <img
                  src="/assets/image/best_seller.png"
                  alt="best_seller"
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
