import Navbar from '../../components/Navbar';

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🛒 Tu carrito</h1>
        <p>Aquí aparecerán los productos que agregues al carrito.</p>
      </main>
    </>
  );
}

