"use client";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.access_token);
      alert("Inicio de sesión exitoso ✅");
      window.location.href = "/";
    } catch (error) {
      alert("Error en login ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white rounded p-2">
          Entrar
        </button>
      </form>
    </div>
  );
}
