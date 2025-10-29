import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Rocket, Laptop, Globe, ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === 'ADMIN') redirect('/admin');
    else redirect('/courses');
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO PRINCIPAL */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Convertí tu <span className="text-pink-600">conocimiento</span> en oportunidades🚀
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mt-6 text-gray-700">
            Publicá tus cursos online y llega a más personas a través de tu propia plataforma web o app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/register"
              className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md transition-all flex items-center justify-center"
            >
              Empezar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/courses"
              className="bg-white/70 backdrop-blur-sm border border-gray-300 hover:border-gray-400 px-10 py-4 rounded-full text-lg font-semibold transition-all shadow-sm"
            >
              Explorar Cursos
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN BENEFICIOS */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10 text-center">
        <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
          <Rocket className="mx-auto text-pink-600 w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Publicá en minutos</h3>
          <p className="text-gray-600">Creá tu curso fácilmente y empezá a vender sin complicaciones.</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
          <Laptop className="mx-auto text-pink-600 w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Compatible con todos los dispositivos</h3>
          <p className="text-gray-600">Tu curso se verá increíble desde celulares, tablets o computadoras.</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
          <Globe className="mx-auto text-pink-600 w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Llega a todo el mundo</h3>
          <p className="text-gray-600">Expandí tu alcance con una plataforma que conecta alumnos globalmente.</p>
        </div>
      </section>
    </div>
  );
}
