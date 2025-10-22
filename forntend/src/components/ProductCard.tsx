"use client";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 font-bold">${product.price}</p>
      <Link href={`/product/${product._id}`} className="text-blue-500 underline">
        Ver detalle
      </Link>
    </div>
  );
}
