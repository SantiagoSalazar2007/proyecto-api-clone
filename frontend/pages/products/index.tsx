import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => console.log('Error al cargar los productos'));
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h1>Productos disponibles</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard key={p._id} name={p.name} price={p.price} description={p.description} />
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </main>
    </>
  );
}

