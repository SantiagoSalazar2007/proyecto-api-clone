import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || 'Usuario registrado correctamente');
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '250px', margin: '0 auto' }}>
          <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
          <button type="submit" style={{ marginTop: '1rem' }}>Registrarse</button>
        </form>
      </main>
    </>
  );
}

