"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

const SortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-full md:w-auto">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-gray-700 mb-1.5 tracking-wide"
      >
        Сортировать по:
      </label>

      <div className="relative">
        <select
          onChange={handleChange}
          value={searchParams.get("sort") || "date_asc"}
          id="sort"
          className="w-full md:w-56 appearance-none rounded-xl border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 ease-in-out hover:border-indigo-400 hover:shadow-md focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none cursor-pointer"
        >
          <option value="date_asc">Самые новые</option>
          <option value="price_asc">Сначала дешевле</option>
          <option value="price_desc">Сначала дороже</option>
        </select>

        <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default SortSelect;
