// components/Header.tsx - REDISEÑADO
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, LogOut, Home, PlayCircle, Settings, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  if (!mounted) {
    return (
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-pink-600" />
              <span className="text-xl font-bold text-gray-900">TUS CURSOS</span>
            </div>
            <div className="animate-pulse bg-gray-200 rounded-full h-8 w-8"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Navegación */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <Rocket className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-gray-900">TUS CURSOS</span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link
                href="/courses"
                className={`flex items-center space-x-1 transition-colors ${
                  isActive('/courses')
                    ? 'text-pink-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <PlayCircle className="h-4 w-4" />
                <span>Cursos</span>
              </Link>

              {session?.user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className={`flex items-center space-x-1 transition-colors ${
                    isActive('/admin')
                      ? 'text-pink-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Panel</span>
                </Link>
              )}
            </nav>
          </div>

          {/* Usuario */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="flex items-center space-x-3">
                <div className="animate-pulse bg-gray-200 rounded-full h-8 w-8"></div>
                <div className="hidden sm:block">
                  <div className="animate-pulse bg-gray-200 h-4 w-20 rounded mb-1"></div>
                  <div className="animate-pulse bg-gray-200 h-3 w-16 rounded"></div>
                </div>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-pink-600" />
                  </div>
                  <div className="hidden sm:block text-sm">
                    <p className="font-medium text-gray-900">
                      {session.user.name || session.user.email}
                    </p>
                    <p className="text-gray-500 capitalize">
                      {session.user.role.toLowerCase()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 font-medium transition"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
