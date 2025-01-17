import { cn } from "@/lib/utils";

export default function CardInvoiceSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-[#D9D9D9] shadow-md">
      <div className="flex items-center gap-10 bg-[#D9D9D9] px-10 py-5">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="h-5 w-24 rounded bg-gray-300"></div>
        <div className="h-5 w-32 rounded bg-gray-300"></div>
        <div className="h-8 w-20 rounded bg-[#A3D3BD]"></div>
      </div>
      <div className="flex justify-between">
        <div className="grid space-y-3 p-10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            <div className="h-5 w-24 rounded bg-gray-300"></div>
          </div>
          {/* Skeleton for products */}
          {Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="grid space-y-5">
              <div className="flex items-center gap-8">
                <div className="h-16 w-16 rounded bg-gray-300"></div>
                <ul className="space-y-2">
                  <li>
                    <div className="h-5 w-32 rounded bg-gray-300"></div>
                  </li>
                  <li>
                    <div className="h-5 w-48 rounded bg-gray-300"></div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
