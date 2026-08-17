"use client";

import { FC, startTransition, useOptimistic, useRef, useState } from "react";
import ProductCard from "./card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAction } from "next-safe-action/hooks";
import inOrOutFavouriteAction from "@/utils/actions/inOrOutFavourite";

interface Product {
  price: number;
  description: string;
  name: string;
  id: number;
  image: string | null;
}

interface CardsProps {
  products: Product[];
  favoritesId: number[];
}

const Cards: FC<CardsProps> = ({ products, favoritesId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [favorites, setFavorites] = useState<number[]>(favoritesId);

  const { execute } = useAction(inOrOutFavouriteAction, {
    onSuccess: ({ data }) => {
      setFavorites(data);
    },
    onError: ({ error }) => {
      if (error.serverError) {
        console.log(error.serverError);
      }
    },
  });

  const [optimisticFavoritesId, setOptimisticFavoritesId] = useOptimistic(
    favorites,
    (prev, productId: number) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    },
  );

  const handleFavoriteClick = (productId: number) => {
    startTransition(() => {
      setOptimisticFavoritesId(productId);
      const newFavorites = execute({ id: productId });
    })
  }

  useGSAP(() => {
    const elements = containerRef.current?.children;
    if (!elements) return;

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          isFavorite={optimisticFavoritesId.includes(product.id)}
          handleFavoriteClick={handleFavoriteClick}
          {...product}
          className="opacity-0 -translate-y-100"
        />
      ))}
    </div>
  );
};

export default Cards;
