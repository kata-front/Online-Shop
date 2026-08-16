"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchQuery = () => {
  const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
        const newParams = new URLSearchParams(searchParams.toString());

        if (query === "") {
            newParams.delete("query");
        } else {
            newParams.set("query", query);
        }

        router.push(`?${newParams.toString()}`);
    }, 1000)

    return () => clearTimeout(timer)
  }, [query, router, searchParams])

  return (
    <div>
      <div>Поиск</div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchQuery;