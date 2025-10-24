// app/page.tsx - NUEVO
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Video, Users, Star, ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Redirección inteligente según autenticación y rol
  if (session) {
    if (session.user.role === 'ADMIN') {
      redirect('/admin');
    } else {
      redirect('/courses');
    }
  }

  // Página de landing para usuarios no autenticados
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Aprende Diseño de Moda con{' '}
            <span className="text-blue-600">DeLuatelier</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubre cursos exclusivos impartidos por una diseñadora profesional. 
            Domina las técnicas más demandadas de la industria de la moda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/courses"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              Ver Cursos
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Clases en Video</h3>
            <p className="text-gray-600">
              Accede a contenido en video de alta calidad disponible las 24 horas.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instructora Experta</h3>
            <p className="text-gray-600">
              Aprende de una diseñadoras de experiencia.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-yellow-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Contenido Exclusivo</h3>
            <p className="text-gray-600">
              Cursos únicos que no encontrarás en otras plataformas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}