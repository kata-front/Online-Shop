"use client";

import { FC, useRef } from "react";
import ProductCard from "./card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Product {
  price: number;
  description: string;
  name: string;
  id: number;
  image: string | null;
}

interface CardsProps {
  products: Product[];
}

const Cards: FC<CardsProps> = ({ products }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        <ProductCard key={product.id} {...product} className="opacity-0 -translate-y-100" />
      ))}
    </div>
  );
};

export default Cards;
