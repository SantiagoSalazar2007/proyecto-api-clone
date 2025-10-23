"use client";
import { useEffect, useState } from "react";

interface CartItem {
  _id: string;
  productName: string;
  quantity: number;
  price: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:4000/cart");
        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) return <p>Cargando carrito...</p>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Carrito</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item._id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
                <h4>{item.productName}</h4>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price}</p>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
        </div>
      )}
    </main>
  );
}

