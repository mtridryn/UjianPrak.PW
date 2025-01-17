import { ConfirmTransaction } from "@/app/api/transaksi/konfirmasi_transaksi";
import Product from "@/app/lib/model/product";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { faBagShopping, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Props {
  date?: Date;
  status?: string;
  quantity?: number;
  paidAmount?: number;
  products?: Product[];
  transactionId: string;
  productAmount: number[];
  confirmed: boolean;
}

export default function CardInvoice({
  date,
  status = "",
  paidAmount = 0,
  transactionId = "",
  products,
  productAmount,
  confirmed,
}: Props) {
  const [confirm, setConfirm] = useState<boolean>(confirmed);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleConfirmTransaction = async () => {
    setLoading(true);
    try {
      const confirmed = await ConfirmTransaction(transactionId, true);
      if (confirmed) {
        setConfirm(true);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Transaction confirmed successfully.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "There was an error confirming the transaction.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmed = () => {
    if (confirm) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Your Transaction Was Confirmed!",
      });
    }
  };

  return (
    <div className="rounded-lg border border-[#D9D9D9] shadow-md">
      <div className="flex items-center gap-10 bg-[#D9D9D9] px-10 py-5">
        <FontAwesomeIcon icon={faBagShopping} className="text-4xl" />
        <p>Shopping</p>
        <p>{date?.toLocaleString("en-US")}</p>
        <p className={`rounded-lg bg-[#A3D3BD] p-2`}>
          {status?.charAt(0) + status?.slice(1).toLowerCase()}
        </p>
        {confirm && <p className={`rounded-lg bg-[#A3D3BD] p-2`}>Confirmed</p>}
      </div>
      <div className="flex justify-between">
        <div className="grid space-y-3 p-10">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" width={30} height={30} alt="Claw Image" />
            <p>BelanjaKuy</p>
          </div>
          {products?.map((product, index) => (
            <div key={product.product_id} className="grid space-y-5">
              <div className="flex gap-8">
                <Image
                  src={`/assets${product.image_url}`}
                  width={70}
                  height={70}
                  alt="Product Image"
                />
                <ul>
                  <li>
                    <p>{product.name}</p>
                  </li>
                  <li>
                    <p>
                      {productAmount[index]}&nbsp;
                      {productAmount[index] === 1 ? `Item` : ` Items`} x &nbsp;
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="grid">
          <ul className="grid grid-cols-3 gap-3 text-end">
            <li className="col-span-2 grid items-end">
              <div>
                <p>Total Payment</p>
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(paidAmount)}
                </p>
              </div>
            </li>
          </ul>
          <div className="grid grid-cols-3 items-center gap-3">
            <Link href={`/invoice/${transactionId}`}>
              <Button
                variant={"ghost"}
                className={cn(`mx-auto w-full rounded-xl`)}
              >
                View Transaction Details
              </Button>
            </Link>
            {/* <Link href={`/detail-product/${}`}> */}
            <Button
              variant={"outline"}
              onClick={() => router.push("/search_list")}
              className={cn(
                `mx-auto w-full rounded-xl bg-blue-500 text-white hover:bg-blue-600 hover:text-white`,
              )}
            >
              Buy Again
            </Button>
            {/* </Link> */}

            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={handleConfirmed}
                className="flex w-10 justify-center focus:border-none focus:outline-none [&_svg]:size-8"
              >
                <Ellipsis />
              </DropdownMenuTrigger>
              {!confirm && !loading && (
                <DropdownMenuContent
                  align="end"
                  side="right"
                  className="m-0 p-0"
                >
                  <DropdownMenuLabel className="p-0">
                    <Button
                      variant="outline"
                      className="w-full border-none outline-none"
                      onClick={handleConfirmTransaction}
                    >
                      Order Confirmation
                    </Button>
                    {loading && (
                      <Button variant="outline" className="w-full" disabled>
                        Loading...
                      </Button>
                    )}
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
