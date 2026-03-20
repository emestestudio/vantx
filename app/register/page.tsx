import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">VANTX</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-300 hover:text-white">Iniciar sesión</Link>
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold">
            Empezar gratis
          </Link>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center text-center px-4 py-32">
        <h2 className="text-5xl font-bold mb-6">Gestiona tus proyectos<br/>
          <span className="text-blue-400">de forma inteligente</span>
        </h2>
        <p className="text-gray-400 text-xl mb-10 max-w-xl">
          VANTX es la plataforma SaaS que centraliza tus proyectos y equipos en un solo lugar. Rápido, seguro y escalable.
        </p>
        <div className="space-x-4">
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg">
            Crear cuenta gratis
          </Link>
          <Link href="/login" className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-xl font-bold text-lg">
            Iniciar sesión
          </Link>
        </div>
      </main>

      <footer className="text-center text-gray-600 pb-8">
        © 2026 VANTX · Todos los derechos reservados
      </footer>
    </div>
  );
}