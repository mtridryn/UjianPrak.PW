export default function CartSkeleton() {
    return (
      <div className="flex items-center shadow-md justify-between px-6 py-8 rounded-lg mb-5 border-1 border-[#f4f1eb] animate-pulse">
        <div className="flex items-start w-full">
          <div className="bg-gray-300 w-[20px] h-[20px] rounded-full mr-3"></div>
          <div className="bg-gray-300 w-[150px] h-[100px] rounded-md mr-4"></div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between mb-3">
                <div className="bg-gray-300 h-5 w-[150px] rounded-md mb-2"></div>
                <div className="bg-gray-300 h-5 w-[100px] rounded-md mb-2"></div>
            </div>

            <div className="bg-gray-300 h-4 w-full rounded-md mb-2"></div>
            <div className="bg-gray-300 h-4 w-full rounded-md mb-2"></div>
            <div className="bg-gray-300 h-4 w-1/2 rounded-md mb-2"></div>
            
            <div className="flex justify-between mt-5 space-x-4">
              <div className="flex">
                <div className="bg-gray-300 h-6 w-16 rounded-md"></div>
                <div className="bg-gray-300 h-6 w-16 ml-3 rounded-md"></div>
              </div>

              <div className="flex">
                <div className="bg-gray-300 h-6 w-10 rounded-md"></div>
                <div className="bg-gray-300 h-6 w-24 ml-3 rounded-md"></div>
              </div>

            </div>

          </div>

        </div>
      </div>
    )
}