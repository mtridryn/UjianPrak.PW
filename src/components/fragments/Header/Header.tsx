export default function Header() {
  return (
    <div className="mt-[70px] lg:px-0 mb-10">
      <div className="relative flex justify-center">
        <img
          src="/assets/image/header_2.png"
          alt="header"
          className="w-full"
        />

        <div className="absolute left-[7vw] top-[14vh] flex flex-col bg-opacity-50 rounded-[8px] p-4">
          <p className="text-md font-semibold text-white mb-3">WINTER 2024</p>
          <h1 className="text-5xl sm:text-xl md:text-2xl lg:text-5xl font-bold text-white mb-2">
            NEW TV COLLECTION
          </h1>
          <p className="text-md sm:text-sm md:text-base lg:text-lg text-white mb-3">
            Upscale every moment with more Wow
          </p>
          <button className="bg-blue-500 text-white text-md font-semibold py-3 px-10 sm:w-[100px] md:w-[150px] lg:w-[200px] sm:px-5 md:px-6 rounded-[14px] hover:bg-blue-600 transition">
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}
