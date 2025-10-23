"use client";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Productos</h1>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li
              key={product._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                marginBottom: "10px",
                padding: "10px",
              }}
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>${product.price}</strong>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
