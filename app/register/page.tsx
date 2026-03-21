"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ companyName: "", name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al registrar");
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{minHeight:"100vh",background:"#111827",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#1f2937",padding:"2rem",borderRadius:"12px",width:"100%",maxWidth:"400px"}}>
        <h1 style={{color:"white",fontSize:"2rem",fontWeight:"bold",textAlign:"center",marginBottom:"0.5rem"}}>VANTX</h1>
        <p style={{color:"#9ca3af",textAlign:"center",marginBottom:"1.5rem"}}>Crea tu cuenta gratis</p>
        {error && <p style={{background:"rgba(239,68,68,0.2)",color:"#f87171",padding:"0.75rem",borderRadius:"6px",marginBottom:"1rem"}}>{error}</p>}
        <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <input type="text" placeholder="Nombre de tu empresa" required value={form.companyName}
            onChange={e=>setForm({...form,companyName:e.target.value})}
            style={{padding:"0.75rem",borderRadius:"8px",background:"#374151",color:"white",border:"1px solid #4b5563",outline:"none"}}/>
          <input type="text" placeholder="Tu nombre" required value={form.name}
            onChange={e=>setForm({...form,name:e.target.value})}
            style={{padding:"0.75rem",borderRadius:"8px",background:"#374151",color:"white",border:"1px solid #4b5563",outline:"none"}}/>
          <input type="email" placeholder="Email" required value={form.email}
            onChange={e=>setForm({...form,email:e.target.value})}
            style={{padding:"0.75rem",borderRadius:"8px",background:"#374151",color:"white",border:"1px solid #4b5563",outline:"none"}}/>
          <input type="password" placeholder="Contraseña" required value={form.password}
            onChange={e=>setForm({...form,password:e.target.value})}
            style={{padding:"0.75rem",borderRadius:"8px",background:"#374151",color:"white",border:"1px solid #4b5563",outline:"none"}}/>
          <button type="submit" disabled={loading}
            style={{padding:"0.75rem",background:"#2563eb",color:"white",borderRadius:"8px",fontWeight:"600",border:"none",cursor:"pointer"}}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
        <p style={{color:"#9ca3af",textAlign:"center",marginTop:"1rem"}}>
          ¿Ya tienes cuenta? <a href="/login" style={{color:"#60a5fa"}}>Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
