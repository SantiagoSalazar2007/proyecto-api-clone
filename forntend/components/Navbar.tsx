import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Inicio</Link> |{" "}
      <Link href="/products">Productos</Link> |{" "}
      <Link href="/cart">Carrito</Link> |{" "}
      <Link href="/orders">Órdenes</Link> |{" "}
      <Link href="/auth/login">Login</Link>
    </nav>
  );
}

