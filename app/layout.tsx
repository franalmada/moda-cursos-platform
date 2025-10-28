import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/Header'
import Providers from '@/components/Providers'
import SWRegister from '@/components/SWRegister' // CAMBIAR A COMPONENTE SEPARADO

<head>
  <link rel="icon" href="/icon-192x192.png" />
</head>

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})



// METADATA - QUITAR themeColor y viewport de aquí
export const metadata: Metadata = {
  title: 'Plataforma de Cursos de Moda',
  description: 'Cursos exclusivos de diseño de ropa por diseñadoras profesionales',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cursos de Moda',
  },
}

// AGREGAR ESTA NUEVA FUNCIÓN VIEWPORT
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        <Providers>
          {/* AGREGAR COMPONENTE SW */}
          <SWRegister />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}