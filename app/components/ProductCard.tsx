"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export interface Variant {
  id: string;
  color: string;
  size: string;
  stock: number;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  baseImage: string;
  variants: Variant[];
  available?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {addToCart} = useCart();
  const [selectedColor, setSelectedColor] = useState(product.variants[0].color);
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size);

  const handleAddToCart = () => {
  if (!isOutOfStock) {
    addToCart(product, currentVariant!);
    currentVariant!.stock -= 1;
  }
};

  const currentVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const colors = Array.from(new Set(product.variants.map((v) => v.color)));
  const sizes = Array.from(new Set(product.variants.map((v) => v.size)));

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  const isOutOfStock = currentVariant?.stock === 0;

  const availableSizes = product.variants
    .filter((v) => v.color === selectedColor && v.stock > 0)
    .map((v) => v.size);

  const stockForDisplay =
    product.variants.length > 1
      ? currentVariant?.stock || 0
      : product.variants[0].stock;

  useEffect(() => {
    if (!availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedColor, availableSizes]);

  return (
    <div className="shadow-sm w-full p-2 flex flex-col gap-4">
      <div className="w-full h-56 relative">
        <Image
          src={
            currentVariant?.imageUrl || product.baseImage || "/placeholder.png"
          }
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-700 font-semibold">
          ${product.price.toFixed(2)}
        </p>

        {/* Stock display */}
        <p className="text-sm mt-1 text-gray-500">
          <span className="text-red-600">{stockForDisplay}</span> Left
        </p>

        {/* Color selector */}
        <div className="flex gap-2 mt-2">
          {colors.map((color) => {
            const isAvailable = product.variants.some(
              (v) => v.color === color && v.stock > 0
            );
            return (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                disabled={!isAvailable}
                className={`w-6 h-6 rounded-full border ${
                  selectedColor === color ? "ring ring-black" : ""
                } ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            );
          })}
        </div>

        {/* Size selector */}
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="border rounded px-2 py-1 mt-2 w-auto min-w-[80px]"
        >
          {availableSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Add to cart */}
        <button
         onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`mt-4 w-full py-2 rounded ${
            isOutOfStock
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-black hover:bg-gray-800 text-white"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
