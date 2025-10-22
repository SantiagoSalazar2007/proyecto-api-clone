"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-3">
      <Link href="/" className="font-bold text-lg">🛍️ Proyecto API</Link>
      <div className="flex gap-4">
        <Link href="/login">Login</Link>
        <Link href="/register">Registro</Link>
        <Link href="/cart">Carrito</Link>
        <Link href="/orders">Órdenes</Link>
      </div>
    </nav>
  );
}
