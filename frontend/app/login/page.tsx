'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');
      localStorage.setItem('token', data.access_token);
      router.push('/dashboard');
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f5f5f5'}}>
      <div style={{background:'white',padding:'2rem',borderRadius:'8px',width:'360px',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
        <h1 style={{marginBottom:'1.5rem',fontSize:'1.5rem',fontWeight:'bold'}}>Iniciar Sesión</h1>
        {error && <p style={{color:'red',marginBottom:'1rem'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required
            style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'1px solid #ddd',borderRadius:'4px',boxSizing:'border-box'}}/>
          <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required
            style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'1px solid #ddd',borderRadius:'4px',boxSizing:'border-box'}}/>
          <button type="submit" disabled={loading}
            style={{width:'100%',padding:'0.75rem',background:'#0070f3',color:'white',border:'none',borderRadius:'4px',cursor:'pointer',fontSize:'1rem'}}>
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>
        <p style={{marginTop:'1rem',textAlign:'center'}}>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
      </div>
    </div>
  );
}