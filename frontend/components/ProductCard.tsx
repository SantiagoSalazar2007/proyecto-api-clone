import React from 'react';

interface ProductProps {
  name: string;
  price: number;
  description?: string;
}

const ProductCard: React.FC<ProductProps> = ({ name, price, description }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem',
      textAlign: 'center'
    }}>
      <h3>{name}</h3>
      <p>{description || 'Sin descripción'}</p>
      <strong>${price}</strong>
      <button style={{ display: 'block', margin: '1rem auto', padding: '0.5rem 1rem' }}>Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;
