"use client";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Mis Órdenes</h1>
      {orders.length === 0 ? (
        <p>No tienes órdenes registradas.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
              <p><strong>ID:</strong> {order._id}</p>
              <p><strong>Estado:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

