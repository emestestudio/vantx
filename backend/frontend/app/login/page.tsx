'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@vantx.cl')
  const [password, setPassword] = useState('123456')

  const login = async (e: any) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!data.access_token) {
      alert('Credenciales incorrectas')
      return
    }

    localStorage.setItem('token', data.access_token)

    window.location.href = '/dashboard'
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#0f0f0f',
      color: 'white'
    }}>
      <form onSubmit={login} style={{
        width: 320,
        padding: 30,
        background: '#1a1a1a',
        borderRadius: 10
      }}>
        <h2>VANTX 🚀</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />

        <button type="submit" style={{
          width: '100%',
          padding: 10,
          background: '#00c853',
          border: 'none',
          color: 'white'
        }}>
          Ingresar
        </button>
      </form>
    </div>
  )
}