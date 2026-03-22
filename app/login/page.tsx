import Link from 'next/link';

export default function Home() {
  const s = {
    page: { minHeight: '100vh', background: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' as const },
    logo: { fontSize: '18px', fontWeight: 800, color: '#6366f1', marginBottom: '60px', letterSpacing: '-0.5px' },
    badge: { display: 'inline-block', background: '#312e81', color: '#a5b4fc', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, marginBottom: '24px' },
    h1: { fontSize: '52px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.15, marginBottom: '20px', maxWidth: '700px' },
    accent: { color: '#6366f1' },
    sub: { fontSize: '18px', color: '#94a3b8', maxWidth: '500px', marginBottom: '48px', lineHeight: 1.6 },
    btns: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' as const },
    btnPrimary: { background: '#6366f1', color: '#fff', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', fontSize: '16px', fontWeight: 600 },
    btnSecondary: { background: 'transparent', color: '#94a3b8', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', fontSize: '16px', border: '1px solid #334155' },
    features: { display: 'flex', gap: '24px', marginTop: '80px', flexWrap: 'wrap' as const, justifyContent: 'center' },
    feat: { background: '#1e293b', borderRadius: '12px', padding: '24px', maxWidth: '200px', border: '1px solid #334155' },
    featIcon: { fontSize: '28px', marginBottom: '10px' },
    featTitle: { fontSize: '15px', fontWeight: 600, color: '#f1f5f9', marginBottom: '6px' },
    featDesc: { fontSize: '13px', color: '#64748b' },
  };

  return (
    <div style={s.page}>
      <div style={s.logo}>⚡ Vantx</div>
      <div style={s.badge}>🚀 Plataforma SaaS lista para usar</div>
      <h1 style={s.h1}>
        Gestiona tus proyectos<br />
        <span style={s.accent}>de forma inteligente</span>
      </h1>
      <p style={s.sub}>
        Organiza equipos, proyectos y tareas en un solo lugar. Simple, rápido y escalable.
      </p>
      <div style={s.btns}>
        <Link href="/register" style={s.btnPrimary}>Empezar gratis →</Link>
        <Link href="/login" style={s.btnSecondary}>Iniciar sesión</Link>
      </div>
      <div style={s.features}>
        {[
          { icon: '🏢', title: 'Multi-empresa', desc: 'Cada empresa ve solo sus datos' },
          { icon: '🔐', title: 'Seguro', desc: 'JWT y cifrado bcrypt' },
          { icon: '⚡', title: 'Rápido', desc: 'Backend NestJS + PostgreSQL' },
          { icon: '📊', title: 'CRUD completo', desc: 'Crear, editar y eliminar' },
        ].map((f) => (
          <div key={f.title} style={s.feat}>
            <div style={s.featIcon}>{f.icon}</div>
            <div style={s.featTitle}>{f.title}</div>
            <div style={s.featDesc}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}