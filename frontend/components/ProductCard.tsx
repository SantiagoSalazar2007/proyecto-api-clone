"use client";
import Link from "next/link";
import axios from "axios";

export default function ProductCard({ product }: { product: any }) {
  const addToCart = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return alert("Debes iniciar sesión para agregar al carrito");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Producto agregado al carrito ✅");
    } catch (e) {
      console.error(e);
      alert("Error al agregar al carrito");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h3 classN

