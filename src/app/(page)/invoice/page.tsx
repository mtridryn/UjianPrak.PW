"use client";

import { Input } from "@/components/ui/input";
import Navbar from "@/components/fragments/Navbar/Navbar";
import { DatePicker } from "@/components/core/Button/DatePicker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CardInvoice from "@/components/core/Card/CardInvoice";
import { InvoiceData } from "@/app/lib/model/invoice";
import invoice from "@/app/api/invoice/invoice";
import CardInvoiceSkeleton from "@/components/core/Skeleton/CardInvoiceSkeleton";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { SquareArrowLeft } from "lucide-react";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirm, setConfirm] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const router = useRouter();
  const session = localStorage.getItem("userSession");

  useEffect(() => {
    !session && router.push("/");
    const fetchData = async () => {
      if (session) {
        const userData = JSON.parse(session);
        const userId: string = userData.user_id;

        if (userId) {
          const userInvoice = await invoice({ userId });
          setLoading(false);
          if (userInvoice) {
            setInvoices(userInvoice);
          } else {
            console.log("No invoices found for this user.");
          }
        }
      }
    };
    fetchData();
  }, []);

  const handleFilterConfirm = (filterStatus: boolean | null) => {
    setConfirm(filterStatus);
  };

  const handleDateChange = (date: string | null) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setConfirm(null);
    setSelectedDate(null);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const isConfirmed = invoice.confirmed === true;

    if (confirm !== null && isConfirmed !== confirm) {
      return false;
    }

    if (
      searchTerm &&
      !invoice.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    ) {
      return false;
    }

    if (
      selectedDate &&
      !dayjs(invoice.created_at).isSame(dayjs(selectedDate), "day")
    ) {
      return false;
    }

    return true;
  });

  const getButtonStyle = (status: boolean | null) => {
    if (confirm === status) {
      return "bg-[#A3D3BD] hover:bg-[#76c8a4]";
    }
    return "bg-white hover:bg-[#D9D9D9]";
  };

  return (
    <>
      {session && (
        <div className="mt-20">
          <Navbar />
          <div className="mx-10 grid">
            <Button
              onClick={() => router.back()}
              variant="empty"
              className="my-5 w-10 bg-white hover:bg-[#D9D9D9] [&_svg]:size-9"
            >
              <SquareArrowLeft />
            </Button>

            <div className="space-y-10 rounded-lg border-4 border-[#D9D9D9] px-10 py-5 shadow-md">
              <p className="text-3xl font-bold">Invoices</p>
              <div className="grid grid-cols-3 gap-5">
                <Input
                  type="text"
                  placeholder="Search by Product Name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
              </div>

              <div className={cn(`flex items-center gap-8`)}>
                <p>Status</p>
                {["Confirmed", "Not Confirmed"].map((value, i) => (
                  <Button
                    onClick={() => handleFilterConfirm(i === 0 ? true : false)}
                    key={i}
                    variant={"outline"}
                    className={cn(getButtonStyle(i === 0 ? true : false))}
                  >
                    {value}
                  </Button>
                ))}
                <Button
                  onClick={resetFilters}
                  variant={"outline"}
                  className="bg-white hover:bg-[#D9D9D9]"
                >
                  Reset Filter
                </Button>
              </div>

              {!loading ? (
                filteredInvoices.length > 0 ? (
                  filteredInvoices.map((product) => (
                    <CardInvoice
                      key={product.transaksi_id}
                      date={product.created_at}
                      status={product.status}
                      quantity={product.totalQuantity}
                      paidAmount={product.paid_amount}
                      products={product.products}
                      transactionId={product.transaksi_id}
                      productAmount={product.amount}
                      confirmed={product.confirmed}
                    />
                  ))
                ) : (
                  <p>No invoices found with the selected filter.</p>
                )
              ) : (
                <CardInvoiceSkeleton />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
