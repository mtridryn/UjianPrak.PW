import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonAddressPayment = () => {
  return (
    <div>
      <Skeleton className="mb-2 h-6 w-2/3"></Skeleton>
      <Skeleton className="mb-2 h-6 w-2/3"></Skeleton>
      <Skeleton className="mb-2 h-6 w-2/3"></Skeleton>
    </div>
  );
};

export default SkeletonAddressPayment;
