'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://vantx.onrender.com';

interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);

  function getToken() {
    return localStorage.getItem('token');
  }

  async function fetchProjects() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/projects`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 401) { router.push('/login'); return; }
      const data = await res.json();
      setProjects(data);
    } catch {
      setError('Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    fetchProjects();
  }, []);

  function openCreate() {
    setEditingProject(null);
    setForm({ name: '', description: '' });
    setShowModal(true);
  }

  function openEdit(p: Project) {
    setEditingProject(p);
    setForm({ name: p.name, description: p.description });
    setShowModal(true);
  }

  async function saveProject() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const url = editingProject ? `${API}/projects/${editingProject.id}` : `${API}/projects`;
      const method = editingProject ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setShowModal(false);
      fetchProjects();
    } catch {
      alert('Error al guardar el proyecto');
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: number) {
    if (!confirm('¿Eliminar este proyecto?')) return;
    try {
      await fetch(`${API}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchProjects();
    } catch {
      alert('Error al eliminar');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  const s = {
    page: { minHeight: '100vh', background: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' } as React.CSSProperties,
    nav: { background: '#1e293b', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' } as React.CSSProperties,
    logo: { fontSize: '22px', fontWeight: 700, color: '#6366f1', letterSpacing: '-0.5px' } as React.CSSProperties,
    logoutBtn: { background: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' } as React.CSSProperties,
    main: { padding: '32px', maxWidth: '1200px', margin: '0 auto' } as React.CSSProperties,
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' } as React.CSSProperties,
    title: { fontSize: '28px', fontWeight: 700, color: '#f1f5f9' } as React.CSSProperties,
    newBtn: { background: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: 600 } as React.CSSProperties,
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' } as React.CSSProperties,
    card: { background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' } as React.CSSProperties,
    cardTitle: { fontSize: '18px', fontWeight: 600, color: '#f1f5f9', marginBottom: '8px' } as React.CSSProperties,
    cardDesc: { fontSize: '14px', color: '#94a3b8', marginBottom: '20px', minHeight: '40px' } as React.CSSProperties,
    cardDate: { fontSize: '12px', color: '#64748b', marginBottom: '16px' } as React.CSSProperties,
    cardActions: { display: 'flex', gap: '8px' } as React.CSSProperties,
    editBtn: { flex: 1, background: 'transparent', border: '1px solid #6366f1', color: '#6366f1', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' } as React.CSSProperties,
    delBtn: { flex: 1, background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' } as React.CSSProperties,
    emptyBox: { textAlign: 'center' as const, padding: '80px 20px', color: '#64748b' },
    emptyTitle: { fontSize: '20px', marginBottom: '8px', color: '#94a3b8' },
    overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 },
    modal: { background: '#1e293b', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', border: '1px solid #334155' } as React.CSSProperties,
    modalTitle: { fontSize: '20px', fontWeight: 700, color: '#f1f5f9', marginBottom: '24px' } as React.CSSProperties,
    label: { display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px', fontWeight: 500 } as React.CSSProperties,
    input: { width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box' as const } as React.CSSProperties,
    textarea: { width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', fontSize: '15px', marginBottom: '24px', boxSizing: 'border-box' as const, minHeight: '100px', resize: 'vertical' as const } as React.CSSProperties,
    modalActions: { display: 'flex', gap: '12px', justifyContent: 'flex-end' } as React.CSSProperties,
    cancelBtn: { background: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' } as React.CSSProperties,
    saveBtn: { background: '#6366f1', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 } as React.CSSProperties,
  };

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <span style={s.logo}>⚡ Vantx</span>
        <button style={s.logoutBtn} onClick={logout}>Cerrar sesión</button>
      </nav>

      <main style={s.main}>
        <div style={s.header}>
          <h1 style={s.title}>Mis Proyectos</h1>
          <button style={s.newBtn} onClick={openCreate}>+ Nuevo proyecto</button>
        </div>

        {loading && <p style={{ color: '#64748b', textAlign: 'center', padding: '60px' }}>Cargando proyectos...</p>}
        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

        {!loading && !error && projects.length === 0 && (
          <div style={s.emptyBox}>
            <p style={s.emptyTitle}>Aún no tienes proyectos</p>
            <p>Haz clic en "Nuevo proyecto" para crear el primero</p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div style={s.grid}>
            {projects.map((p) => (
              <div key={p.id} style={s.card}>
                <div style={s.cardTitle}>{p.name}</div>
                <div style={s.cardDesc}>{p.description || 'Sin descripción'}</div>
                <div style={s.cardDate}>📅 {new Date(p.createdAt).toLocaleDateString('es')}</