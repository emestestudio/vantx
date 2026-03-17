'use client'

import { useEffect, useState } from 'react'

type Project = {
  id: number
  name: string
  status: string
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [name, setName] = useState('')
  const [checked, setChecked] = useState(false)

  const API = 'http://localhost:3001'

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      window.location.href = '/login'
      return
    }

    loadProjects(token)
  }, [])

  const loadProjects = async (token: string) => {
    try {
      const res = await fetch(API + '/projects', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      const data = await res.json()

      setProjects(data)
    } catch (err) {
      console.log('ERROR:', err)
    } finally {
      setChecked(true) // 🔥 CLAVE: corta el "cargando infinito"
    }
  }

  const addProject = async () => {
    const token = localStorage.getItem('token')
    if (!name || !token) return

    await fetch(API + '/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ name }),
    })

    setName('')
    loadProjects(token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  // 🔥 evita loop infinito
  if (!checked) {
    return <p style={{ padding: 40 }}>Cargando...</p>
  }

  return (
    <div style={{
      padding: 40,
      fontFamily: 'Arial',
      background: '#0f0f0f',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>🚀 VANTX SaaS</h1>

      <p>Proyectos: {projects.length}</p>

      <div style={{ marginBottom: 20 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nuevo proyecto"
          style={{ padding: 10, marginRight: 10 }}
        />
        <button onClick={addProject} style={{ padding: 10 }}>
          Crear
        </button>
      </div>

      {projects.map((p) => (
        <div key={p.id} style={{
          padding: 10,
          background: '#1a1a1a',
          marginBottom: 10,
          borderRadius: 6
        }}>
          <strong>{p.name}</strong> — {p.status}
        </div>
      ))}

      <button
        onClick={logout}
        style={{
          marginTop: 30,
          padding: 10,
          background: '#ff5252',
          border: 'none',
          color: 'white'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}