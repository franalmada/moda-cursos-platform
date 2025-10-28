import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Video, Users, Star, ArrowRight, Scissors, Sparkles } from 'lucide-react';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === 'ADMIN') redirect('/admin');
    else redirect('/courses');
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO CON FONDO ELEGANTE */}
      <section className="relative">
<div className="absolute inset-0 bg-[url('/images/hero-background.png')] bg-cover bg-center opacity-20" />        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Diseña Tu Futuro en{' '}
            <span className="text-pink-600 drop-shadow-md">Moda</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mt-6 text-gray-700">
            La academia de alta costura online, creada para que tus ideas cobren vida.
          </p>

          {/* CTAs refinados */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/register"
              className="bg-pink-600 hover:bg-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md transition-all flex items-center justify-center"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/courses"
              className="bg-white/70 backdrop-blur-sm border border-gray-300 hover:border-gray-400 px-10 py-4 rounded-full text-lg font-semibold transition-all shadow-sm"
            >
              Ver Cursos
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN: ¿POR QUÉ ELEGIRNOS? */}
      <section className="bg-blue-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Descubre tu Potencial Creativo</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[{
              icon: <Video className="h-8 w-8 text-blue-700" />,
              title: 'Clases en Video',
              desc: 'Aprende paso a paso con clases claras y de alta calidad.'
            }, {
              icon: <Scissors className="h-8 w-8 text-green-700" />,
              title: 'Técnicas Profesionales',
              desc: 'Aprende costura, patronaje y confección, como en un atelier real.'
            }, {
              icon: <Sparkles className="h-8 w-8 text-yellow-600" />,
              title: 'Estilo que Define',
              desc: 'Crea tus propias prendas con identidad y personalidad.'
            }].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-all">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
