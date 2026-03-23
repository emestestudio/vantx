'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://vantx.onrender.com';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Credenciales incorrectas');
      localStorage.setItem('token', data.access_token);
      document.cookie = `vantx_token=${data.access_token}; path=/; max-age=86400`;
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesion');
    } finally {
      setLoading(false);
    }
  }

  const s = {
    page: { minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '20px' } as React.CSSProperties,
    card: { background: '#1e293b', borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '420px', border: '1px solid #334155' } as React.CSSProperties,
    logo: { fontSize: '28px', fontWeight: 800, color: '#6366f1', textAlign: 'center' as const, marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: '#64748b', textAlign: 'center' as const, marginBottom: '36px' },
    title: { fontSize: '22px', fontWeight: 700, color: '#f1f5f9', textAlign: 'center' as const, marginBottom: '28px' } as React.CSSProperties,
    label: { display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px', fontWeight: 500 } as React.CSSProperties,
    input: { width: '100%', padding: '13px 16px', background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', color: '#f1f5f9', fontSize: '15px', marginBottom: '18px', boxSizing: 'border-box' as const } as React.CSSProperties,
    btn: { width: '100%', padding: '14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', marginTop: '8px' } as React.CSSProperties,
    error: { background: '#450a0a', border: '1px solid #991b1b', color: '#fca5a5', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' } as React.CSSProperties,
    footer: { textAlign: 'center' as const, marginTop: '24px', fontSize: '14px', color: '#64748b' },
    link: { color: '#6366f1', textDecoration: 'none', fontWeight: 500 },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>Vantx</div>
        <div style={s.subtitle}>Gestion de proyectos SaaS</div>
        <h1 style={s.title}>Iniciar sesion</h1>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Email</label>
          <input style={s.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" required />
          <label style={s.label}>Contrasena</label>
          <input style={s.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          <button style={s.btn} type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Entrar'}</button>
        </form>
        <div style={s.footer}>
          No tienes cuenta?{' '}
          <a href="/register" style={s.link}>Registrate gratis</a>
        </div>
      </div>
    </div>
  );
}