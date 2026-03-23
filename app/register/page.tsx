'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://vantx.onrender.com';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', companyName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al registrarse');
      localStorage.setItem('token', data.access_token);
      document.cookie = `vantx_token=${data.access_token}; path=/; max-age=86400`;
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  }

  const s = {
    page: { minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '20px' } as React.CSSProperties,
    card: { background: '#1e293b', borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '440px', border: '1px solid #334155' } as React.CSSProperties,
    logo: { fontSize: '28px', fontWeight: 800, color: '#6366f1', textAlign: 'center' as const, marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: '#64748b', textAlign: 'center' as const, marginBottom: '36px' },
    title: { fontSize: '22px', fontWeight: 700, color: '#f1f5f9', textAlign: 'center' as const, marginBottom: '28px' } as React.CSSProperties,
    label: { display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px', fontWeight: 500 } as React.CSSProperties,
    input: { width: '100%', padding: '13px 16px', background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', color: '#f1f5f9', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box' as const } as React.CSSProperties,
    btn: { width: '100%', padding: '14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', marginTop: '8px' } as React.CSSProperties,
    error: { background: '#450a0a', border: '1px solid #991b1b', color: '#fca5a5', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' } as React.CSSProperties,
    footer: { textAlign: 'center' as const, marginTop: '24px', fontSize: '14px', color: '#64748b' },
    link: { color: '#6366f1', textDecoration: 'none', fontWeight: 500 },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>Vantx</div>
        <div style={s.subtitle}>Crea tu cuenta gratis</div>
        <h1 style={s.title}>Registro</h1>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Tu nombre</label>
          <input style={s.input} type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Juan Perez" required />
          <label style={s.label}>Nombre de tu empresa</label>
          <input style={s.input} type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} placeholder="Mi Empresa S.A." required />
          <label style={s.label}>Email</label>
          <input style={s.input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@empresa.com" required />
          <label style={s.label}>Contrasena</label>
          <input style={s.input} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min. 6 caracteres" minLength={6} required />
          <button style={s.btn} type="submit" disabled={loading}>{loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}</button>
        </form>
        <div style={s.footer}>
          Ya tienes cuenta?{' '}
          <a href="/login" style={s.link}>Inicia sesion</a>
        </div>
      </div>
    </div>
  );
}