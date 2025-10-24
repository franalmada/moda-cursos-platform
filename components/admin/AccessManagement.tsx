// components/admin/AccessManagement.tsx - VERSIÓN OPTIMIZADA
'use client'

import { useState } from 'react'
import SearchableUserSelect from '@/components/SearchableUserSelect'
import SearchableCourseSelect from '@/components/SearchableCourseSelect'

interface User {
  id: string
  name: string | null
  email: string
  coursesAccessed: {
    id: string
    isActive: boolean
    course: {
      id: string
      title: string
      price: number
    }
  }[]
}

interface AccessManagementProps {
  users: User[]
}

export default function AccessManagement({ users }: AccessManagementProps) {
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const selectedUser = users.find(user => user.id === selectedUserId)

  const handleGrantAccess = async () => {
    if (!selectedUserId || !selectedCourseId) {
      setMessage({ type: 'error', text: 'Selecciona un usuario y un curso' })
      return
    }

    setIsLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUserId,
          courseId: selectedCourseId
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al habilitar acceso')
      }

      setMessage({ type: 'success', text: 'Acceso habilitado correctamente' })
      setSelectedCourseId('')
      
      // ✅ Optimizado: Recargar solo después de éxito
      setTimeout(() => window.location.reload(), 1500)
      
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Error al habilitar acceso' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevokeAccess = async (accessId: string) => {
    if (!confirm('¿Estás segura de que quieres revocar el acceso a este curso?')) {
      return
    }

    setIsLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/access', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessId
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al revocar acceso')
      }

      setMessage({ type: 'success', text: 'Acceso revocado correctamente' })
      
      // ✅ Optimizado: Recargar solo después de éxito
      setTimeout(() => window.location.reload(), 1500)
      
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Error al revocar acceso' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Mensajes */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 
          'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Sección: Habilitar nuevo acceso */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Habilitar Nuevo Acceso
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* ✅ NUEVO: SearchableUserSelect */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Cliente
            </label>
            <SearchableUserSelect
              value={selectedUserId}
              onChange={setSelectedUserId}
              placeholder="Buscar cliente por nombre o email..."
            />
          </div>

          {/* ✅ NUEVO: SearchableCourseSelect */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Curso
            </label>
            <SearchableCourseSelect
              value={selectedCourseId}
              onChange={setSelectedCourseId}
              placeholder="Buscar curso por título..."
              disabled={!selectedUserId}
            />
          </div>
        </div>

        <button
          onClick={handleGrantAccess}
          disabled={isLoading || !selectedUserId || !selectedCourseId}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Habilitando acceso...' : 'Habilitar Acceso'}
        </button>
      </div>

      {/* Sección: Gestión de accesos existentes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Accesos Actuales
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay clientes registrados</p>
        ) : (
          <div className="space-y-6">
            {users.map(user => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {user.coursesAccessed.filter(access => access.isActive).length} cursos activos
                  </span>
                </div>

                {user.coursesAccessed.length === 0 ? (
                  <p className="text-gray-500 text-sm">Sin acceso a cursos</p>
                ) : (
                  <div className="space-y-2">
                    {user.coursesAccessed.map(access => (
                      <div key={access.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{access.course.title}</span>
                          <span className="text-sm text-gray-600 ml-2">(${access.course.price})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            access.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {access.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                          {access.isActive && (
                            <button
                              onClick={() => handleRevokeAccess(access.id)}
                              disabled={isLoading}
                              className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                            >
                              Revocar
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Instrucciones de Uso
        </h3>
        <ul className="text-blue-700 list-disc list-inside space-y-1 text-sm">
          <li>Selecciona un cliente y un curso para habilitar acceso</li>
          <li>Los clientes verán los cursos habilitados en su área "Mis Cursos"</li>
          <li>Puedes revocar el acceso en cualquier momento</li>
          <li>Este proceso reemplaza el sistema automático de pagos</li>
        </ul>
      </div>
    </div>
  )
}