import { useState } from "react";
import searchProductsByName from "@/app/api/search_list/product";

type Props = {
  params: string;
  onSubmitFilters: (filters: any) => void;
};

export default function SideBar({ params, onSubmitFilters }: Props) {
  const initialFilters = {
    name: params,
    kategori: "",
    harga: "",
    kondisi: "",
    penilaian: 0,
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (
    category: string,
    value: string | number | null,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  const handleSubmit = async () => {
    onSubmitFilters(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onSubmitFilters(initialFilters); // Optional: langsung mengirim nilai reset
  };

  return (
    <div className="flex h-full flex-col items-start rounded-lg bg-white p-4 pt-10 shadow-lg">
      <div className="mb-4 pt-4">
        <h2 className="mb-2 text-lg font-semibold">Category</h2>
        <div className="ml-4 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              className="mr-2"
              value="Accessories"
              checked={filters.kategori === "Accessories"}
              onChange={() => handleFilterChange("kategori", "Accessories")}
            />
            Accessories
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="mr-2"
              value="Electronic"
              checked={filters.kategori === "Electronic"}
              onChange={() => handleFilterChange("kategori", "Electronic")}
            />
            Electronics
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="mr-2"
              value="Sports"
              checked={filters.kategori === "Sports"}
              onChange={() => handleFilterChange("kategori", "Sports")}
            />
            Sports
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="mr-2"
              value="Clothes"
              checked={filters.kategori === "Clothes"}
              onChange={() => handleFilterChange("kategori", "Clothes")}
            />
            Clothes
          </label>
        </div>
      </div>

      <div className="mb-4 w-full border-t pt-4">
        <h2 className="mb-2 text-lg font-semibold">Sort by Price</h2>
        <div className="ml-4 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              className="mr-2"
              value="termurah"
              checked={filters.harga === "termurah"}
              onChange={() => handleFilterChange("harga", "termurah")}
            />
            Cheapest
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="mr-2"
              value="termahal"
              checked={filters.harga === "termahal"}
              onChange={() => handleFilterChange("harga", "termahal")}
            />
            Most Expensive
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="mr-2"
              value="netral"
              checked={filters.harga === "netral"}
              onChange={() => handleFilterChange("harga", "netral")}
            />
            Neutral
          </label>
        </div>
      </div>

      <button
        className="text-md mt-5 w-full rounded-full bg-blue-500 px-4 py-1 text-white transition duration-300 hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        className="text-md mt-2 w-full rounded-full bg-red-400 px-4 py-1 text-white transition duration-300 hover:bg-red-500"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}
