'use client'

import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000'

type Project = {
  id: string
  name: string
  description?: string
  createdAt: string
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { window.location.href = '/login'; return }
    loadProjects(token)
  }, [])

  const loadProjects = async (token: string) => {
    try {
      const res = await fetch(`${API}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addProject = async () => {
    const token = localStorage.getItem('token')
    if (!name.trim() || !token) return
    setCreating(true)
    try {
      await fetch(`${API}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, description }),
      })
      setName('')
      setDescription('')
      loadProjects(token)
    } finally {
      setCreating(false)
    }
  }

  const deleteProject = async (id: string) => {
    const token = localStorage.getItem('token')
    if (!token) return
    await fetch(`${API}/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    loadProjects(token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <p className="text-xl animate-pulse">Cargando...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-400">⚡ VANTX</h1>
            <p className="text-gray-400 text-sm">Dashboard de Proyectos</p>
          </div>
          <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition">
            Cerrar sesión
          </button>
        </div>

        {/* Crear proyecto */}
        <div className="bg-gray-900 rounded-xl p-5 mb-8 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Nuevo Proyecto</h2>
          <div className="flex flex-col gap-3">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nombre del proyecto *"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descripción (opcional)"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={addProject}
              disabled={creating || !name.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition self-start"
            >
              {creating ? 'Creando...' : '+ Crear Proyecto'}
            </button>
          </div>
        </div>

        {/* Lista de proyectos */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            Proyectos <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full ml-2">{projects.length}</span>
          </h2>
          {projects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-4xl mb-3">📁</p>
              <p>No hay proyectos todavía. ¡Crea el primero!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start justify-between hover:border-indigo-800 transition">
                  <div>
                    <h3 className="font-semibold text-white">{p.name}</h3>
                    {p.description && <p className="text-gray-400 text-sm mt-1">{p.description}</p>}
                    <p className="text-gray-600 text-xs mt-2">{new Date(p.createdAt).toLocaleDateString('es-ES')}</p>
                  </div>
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-950 px-3 py-1 rounded-lg text-sm transition ml-4 flex-shrink-0"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}