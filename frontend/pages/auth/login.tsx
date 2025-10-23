import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log(data);
    alert(data.message || 'Inicio de sesión exitoso');
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '250px', margin: '0 auto' }}>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={{ marginTop: '1rem' }}>Entrar</button>
        </form>
      </main>
    </>
  );
}

