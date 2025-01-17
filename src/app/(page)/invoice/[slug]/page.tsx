"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { detailInvoice } from "@/app/api/transaksi/detail-transaksi";
import React from "react";
import {
  HousePlus,
  Printer,
  SquareArrowLeft,
  Truck,
  Undo2,
} from "lucide-react";
import { InvoiceData } from "@/app/lib/model/invoice";
import InvoiceSkeleton from "@/components/core/Skeleton/InvoiceSkeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function DetailInvoice({ params }: Props) {
  const [data, setData] = useState<InvoiceData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    try {
      (async () => {
        const slug = (await params).slug;
        const data = (await detailInvoice({
          transaksiId: slug,
        })) as InvoiceData;
        setLoading(false);
        setData(data);
      })();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 5mm;
          }
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }
          .text-sm {
            font-size: 12px;
            line-height: 1.4;
          }
          .space-y-10 {
            margin-top: 5mm !important;
            margin-bottom: 5mm !important;
          }
          .text-4xl {
            font-size: 24px !important;
          }
          .font-bold {
            font-weight: bold !important;
          }
          .fixed {
            display: none !important;
          }
          .gap-y-5 {
            gap: 0 !important;
          }
          .py-5 {
            padding: 2mm !important;
          }
          .mx-5 {
            margin-left: 5mm !important;
            margin-right: 5mm !important;
          }
          .grid-cols-5 {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr !important;
          }
        }
      `}</style>
      {loading ? (
        <InvoiceSkeleton />
      ) : (
        <div className="invoice-container">
          {/* Print Button */}
          <div className="fixed flex w-full justify-between border shadow-md">
            <Button
              variant={"ghost"}
              onClick={() => router.back()}
              className="text-black [&_svg]:size-9"
            >
              <SquareArrowLeft />
            </Button>
            <Button
              variant={"outline"}
              onClick={() => window.print()}
              className="bg-blue-500 text-white"
            >
              <Printer />
              Print
            </Button>
          </div>

          {/* Main Content */}
          <div className="mx-auto my-auto grid min-h-screen max-w-4xl space-y-5">
            {/* Header */}
            <div className="grid grid-cols-2 items-center mt-[50px]">
              <p className="text-4xl">BelanjaKuy</p>
              <div className="ml-auto grid text-right">
                <p className="text-xl">INVOICE</p>
                <p className="text-blue-500">
                  {data?.transaksi_id.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Info Diterbitkan */}
            <div className="grid grid-cols-2">
              <div className="text-sm">
                <p className="font-bold">DITERBITKAN ATAS NAMA</p>
                <p>
                  Penjual: <span className="font-bold">Reza Prawitama R.</span>
                </p>
              </div>
              <div>
                <p className="font-bold">UNTUK</p>
                {[
                  { name: "Pembeli", value: data?.recipient },
                  {
                    name: "Tanggal Pembelian",
                    value: data?.created_at.toString().slice(0, 10),
                  },
                  { name: "Alamat Pengiriman", value: data?.address },
                ].map((value, index) => (
                  <p key={index}>
                    {value.name}&#9;:{" "}
                    <span className="font-bold">{value.value}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Produk dan Biaya */}
            <div className="grid gap-y-3">
              <div className="border-y-4 py-5 text-right uppercase">
                <div className="mx-5 grid grid-cols-5 font-bold">
                  <p className="col-span-2 text-left">Info Produk</p>
                  <p>Jumlah</p>
                  <p>Harga Satuan</p>
                  <p>Total Harga</p>
                </div>
              </div>

              {data?.products.map((product, index) => (
                <div
                  key={index}
                  className="mx-5 grid grid-cols-5 gap-y-5 text-right"
                >
                  <Link
                    className="col-span-2"
                    href={`/detail-product/${product.product_id}`}
                  >
                    <p className="text-left text-blue-500 duration-150 hover:text-blue-600">
                      {product.name}
                    </p>
                  </Link>
                  <p>{data.amount[index]}</p>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.price)}
                  </p>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.price * data.amount[index])}
                  </p>
                </div>
              ))}

              {/* Total Biaya */}
              <div className="border-y-2 pt-5 text-right">
                <div className="grid grid-cols-5">
                  <div className="col-span-3"></div>
                  <div className="col-span-2 flex gap-2">
                    <div className="grid w-full text-left">
                      <div className="mr-5 flex justify-between">
                        <p>Subtotal Harga Barang</p>
                        <p>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(
                            data?.paid_amount! -
                              data?.shippingCost! -
                              data?.serviceFee! -
                              data?.handlingFee!,
                          )}
                        </p>
                      </div>
                      <div className="mr-5 flex justify-between">
                        <p>Total Ongkos Kirim</p>
                        <p>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(data?.shippingCost!)}
                        </p>
                      </div>
                      <div className="border-y-2 py-3">
                        <div className="mr-5 flex justify-between font-bold">
                          <p className="text-sm uppercase">Total Belanja</p>
                          <p>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(
                              data?.paid_amount! -
                                data?.serviceFee! -
                                data?.handlingFee!,
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="mr-5 flex justify-between">
                        <p>Biaya Layanan</p>
                        <p>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(data?.serviceFee!)}
                        </p>
                      </div>
                      <div className="mr-5 flex justify-between">
                        <p>Biaya Jasa Aplikasi</p>
                        <p>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(data?.handlingFee!)}
                        </p>
                      </div>
                      <div className="border-t-2 py-3">
                        <div className="mr-5 flex justify-between font-bold">
                          <p className="text-sm uppercase">Total Tagihan</p>
                          <p>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(data?.paid_amount!)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div className="grid grid-cols-5">
                <div className="col-span-3"></div>
                <div>
                  <p>Metode Pembayaran:</p>
                  <p className="font-bold">
                    {data?.payment_method.slice(0, 1) +
                      data?.payment_method.slice(1).toLowerCase()!}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
