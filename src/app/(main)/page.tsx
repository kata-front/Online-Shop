import ProductCard from "@/components/UI/card";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image?: string;
}

export default function Home() {
  const products: ProductCardProps[] = [
    {
      name: 'Product 1',
      price: 100,
      description: 'Description 1',
    },
    {
      name: 'Product 2',
      price: 200,
      description: 'Description 2',
    },
    {
      name: 'Product 3',
      price: 300,
      description: 'Description 3',
    },
  ]

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
