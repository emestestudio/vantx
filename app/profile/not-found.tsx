import Link from 'next/link';

export default function NotFound() {
  const s = {
    page: { minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0', textAlign: 'center' as const, padding: '20px' },
    code: { fontSize: '96px', fontWeight: 800, color: '#1e293b', lineHeight: 1 },
    title: { fontSize: '28px', fontWeight: 700, color: '#f1f5f9', marginBottom: '12px' },
    sub: { fontSize: '16px', color: '#64748b', marginBottom: '40px' },
    btn: { background: '#6366f1', color: '#fff', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', fontSize: '16px', fontWeight: 600 },
  };
  return (
    <div style={s.page}>
      <div style={s.code}>404</div>
      <div style={s.title}>Pagina no encontrada</div>
      <div style={s.sub}>La pagina que buscas no existe o fue movida.</div>
      <Link href="/" style={s.btn}>Volver al inicio</Link>
    </div>
  );
}