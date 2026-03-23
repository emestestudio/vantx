'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: type === 'success' ? '#22c55e' : '#ef4444',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: 600,
        fontSize: '14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      {message}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const token = () => localStorage.getItem('token') || '';

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/login');
      return;
    }

    fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setName(data?.name || '');
      });
  }, []);

  const updateName = async () => {
    const res = await fetch(`${API}/auth/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      showToast('Nombre actualizado', 'success');
    } else {
      showToast('Error al actualizar', 'error');
    }
  };

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error');
      return;
    }

    const res = await fetch(`${API}/auth/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      showToast('Contraseña actualizada', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast('Error al cambiar contraseña', 'error');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Perfil</h1>

      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={updateName}>Guardar nombre</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="password"
          placeholder="Actual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={updatePassword}>Cambiar contraseña</button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}