import SliderComp from "./SliderComp";

export default function Carousel() {
  return (
    <div className="overflow-x-hidden">
      <div className="mx-auto max-w-7xl pt-[40px] text-center">
        <div className="text-white">
          <SliderComp></SliderComp>
        </div>
        <h1 className="text-[28px] font-extrabold text-white">
          THE SOUND OF THE PROJECT 2024
        </h1>
        <div className="mx-auto w-[28rem] py-[1rem] text-[0.9rem] text-white">
          <p className="pb-3 text-xl font-light">
            20 Agustus 2024 - 15 Maret 2025
          </p>
          <p className="text-base">
            Jakarta | Bandung | Surabaya | Maluku | Riau
          </p>
        </div>
      </div>
    </div>
  );
}
