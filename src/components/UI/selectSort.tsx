"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value

    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', value);

    router.push(`?${params.toString()}`);
  };
  
  return (
    <div className="flex flex-col w-full md:w-auto">
      <label htmlFor="sort" className="text-sm font-medium text-gray-600 mb-1">
        Сортировать по:
      </label>
      <select
        onChange={handleChange}
        value={searchParams.get('sort') || 'date_asc'}
        id="sort"
        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150 bg-white shadow-sm"
      >
        <option value="date_asc">Самые новые</option>
        <option value="price_asc">Сначала дешевые</option>
        <option value="price_desc">Сначала дорогие</option>
      </select>
    </div>
  );
};

export default SortSelect;
