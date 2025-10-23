"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("Inicio de sesión exitoso ✅");
        console.log("Usuario:", data);
      } else {
        const error = await res.json();
        setMessage(error.message || "Error al iniciar sesión ❌");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>Entrar</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}

