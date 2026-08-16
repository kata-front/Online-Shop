import ProductCard from "@/components/UI/card";
import Cards from "@/components/UI/cards";
import SearchQuery from "@/components/UI/searchQuery";
import SelectSort from "@/components/UI/selectSort";
import prisma from "@/utils/prisma";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: { sort?: string; query?: string };
}) {
  const params = await searchParams;

  const sort = params?.sort || "date_asc";
  let orderBy = {};

  if (sort === "date_asc") {
    orderBy = {
      createdAt: "desc",
    };
  } else if (sort === "price_asc") {
    orderBy = {
      price: "asc",
    };
  } else if (sort === "price_desc") {
    orderBy = {
      price: "desc",
    };
  }

  const query = params?.query || "";
  let where: any = {};

  if (query.trim()) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
    },
    orderBy: orderBy,
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10 border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Каталог товаров</h1>

        <Suspense fallback={<div>Загрузка...</div>}>
          <SearchQuery />
        </Suspense>

        <Suspense fallback={<div>Загрузка...</div>}>
          <SelectSort />
        </Suspense>
      </div>

      <h1>Каталог товаров</h1>
      <Cards products={products} />
    </div>
  );
}
