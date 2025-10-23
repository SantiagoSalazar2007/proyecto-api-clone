import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#222',
      color: 'white'
    }}>
      <h2>🛍️ Proyecto API</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/">Inicio</Link>
        <Link href="/products">Productos</Link>
        <Link href="/cart">Carrito</Link>
        <Link href="/orders">Órdenes</Link>
        <Link href="/auth/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
