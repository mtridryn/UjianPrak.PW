import { Skeleton } from "@/components/ui/skeleton";

export default function InvoiceSkeleton() {
  return (
    <div className="text-sm">
      <div className="mx-auto my-auto grid min-h-screen max-w-4xl space-y-10">
        {/* Header skeleton */}
        <div className="grid grid-cols-2 items-center">
          <Skeleton className="h-10 w-48 text-4xl" />
          <div className="ml-auto grid text-right">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="mt-2 h-4 w-20" />
          </div>
        </div>

        {/* Body skeleton */}
        <div className="grid grid-cols-2">
          <div className="text-sm">
            <Skeleton className="mt-2 h-6 w-48" />
          </div>
          <div>
            {[
              { name: "Pembeli", value: "" },
              { name: "Tanggal Pembelian", value: "" },
              { name: "Alamat Pengiriman", value: "" },
            ].map((value, index) => (
              <div key={index} className="mb-2">
                <Skeleton className="mt-2 h-5 w-48" />
              </div>
            ))}
          </div>
        </div>

        {/* Products list skeleton */}
        <div className="grid gap-y-3">
          <div className="border-y-4 py-5 text-right uppercase">
            <div className="mx-5 grid grid-cols-5">
              <Skeleton className="col-span-2 h-6 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          {/* Skeleton for each product */}
          {new Array(3).fill(null).map((_, index) => (
            <div
              key={index}
              className="mx-5 grid grid-cols-5 gap-y-5 text-right"
            >
              <Skeleton className="col-span-2 h-5 w-32" />
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}

          {/* Total Section Skeleton */}
          <div className="pt-5 text-right">
            <div className="grid grid-cols-5">
              <div className="col-span-3"></div>
              <div className="col-span-2 flex gap-2">
                <div className="grid w-full text-left">
                  <div className="mr-5 flex justify-between">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="mr-5 flex justify-between">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="py-3">
                    <div className="mr-5 flex justify-between font-bold">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                  <div className="mr-5 flex justify-between">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="mr-5 flex justify-between">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="py-3">
                    <div className="mr-5 flex justify-between font-bold">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment method skeleton */}
          <div className="grid grid-cols-5">
            <div className="col-span-3"></div>
            <div>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="mt-2 h-5 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
