'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ companyName: '', name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al registrar');
      localStorage.setItem('token', data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">VANTX</h1>
        <p className="text-gray-400 text-center mb-6">Crea tu cuenta gratis</p>
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nombre de tu empresa" required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />
          <input type="text" placeholder="Tu nombre" required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input type="email" placeholder="Email" required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input type="password" placeholder="Contrasena" required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          <button type="submit" disabled={loading}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Ya tienes cuenta? <a href="/login" className="text-blue-400 hover:underline">Inicia sesion</a>
        </p>
      </div>
    </div>
  );
}