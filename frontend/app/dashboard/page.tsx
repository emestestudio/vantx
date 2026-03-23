'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) router.push('/login');
    else setReady(true);
  }, [router]);
  if (!ready) return null;
  return (
    <div style={{minHeight:'100vh',background:'#f5f5f5',padding:'2rem'}}>
      <div style={{maxWidth:'1000px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
          <h1 style={{fontSize:'2rem',fontWeight:'bold'}}>Dashboard</h1>
          <button onClick={()=>{localStorage.removeItem('token');router.push('/login');}}
            style={{padding:'0.5rem 1rem',background:'#e53e3e',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
            Cerrar sesión
          </button>
        </div>
        <div style={{background:'white',padding:'2rem',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
          <h2>¡Bienvenido a Vantx! 🚀</h2>
          <p style={{color:'#666',marginTop:'0.5rem'}}>Tu plataforma SaaS está funcionando correctamente.</p>
        </div>
      </div>
    </div>
  );
}