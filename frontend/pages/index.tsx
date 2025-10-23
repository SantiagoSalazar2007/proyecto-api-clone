import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Bienvenido a la tienda 🛒</h1>
        <p>Explora los productos y realiza tus compras fácilmente.</p>
      </main>
    </>
  );
}

