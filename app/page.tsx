"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { fetchProducts } from "./lib/api";
import ProductCard, { Product } from "./components/ProductCard";
import { useEffect, useState } from "react";
import Container from "./components/Container";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  const skeletonArray = Array.from({ length: 4 });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-8 sm:p-10">
        {loading ? (
          <Container>
            {skeletonArray.map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gray-200 h-80"
              />
            ))}
          </Container>
        ) : (
          <Container>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Container>
        )}
      </main>
      <Footer />
    </div>
  );
}
