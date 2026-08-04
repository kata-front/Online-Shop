import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image?: string;
}

const ProductCard = ({ name, price, description, image }: ProductCardProps) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Изображение (или плейсхолдер) */}
      <div className="relative h-52 w-full bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Кнопка быстрого просмотра (появляется при наведении) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/20">
          <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-md hover:bg-gray-100">
            Быстрый просмотр
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/product/${encodeURIComponent(name)}`}
          className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-1"
        >
          {name}
        </Link>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-1">
          {description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">
            {price.toLocaleString("ru-RU")} ₽
          </span>
          <button
            className="rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600 active:scale-95"
            aria-label="Добавить в корзину"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;