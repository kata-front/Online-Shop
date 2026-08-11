import ProductCard from "@/components/UI/card";
import prisma from "@/utils/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
    }
  });

  return (
    <div>
      <h1>Каталог товаров</h1>
      <div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      >
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
