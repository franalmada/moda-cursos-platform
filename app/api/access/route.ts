// app/api/access/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// POST - Habilitar acceso
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId, courseId } = body

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'Usuario y curso son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si ya existe un acceso
    const existingAccess = await prisma.userCourseAccess.findFirst({
      where: {
        userId,
        courseId
      }
    })

    let access
    if (existingAccess) {
      // Si existe, reactivar
      access = await prisma.userCourseAccess.update({
        where: {
          id: existingAccess.id
        },
        data: {
          isActive: true
        }
      })
    } else {
      // Si no existe, crear nuevo acceso
      access = await prisma.userCourseAccess.create({
        data: {
          userId,
          courseId,
          isActive: true
        }
      })
    }

    return NextResponse.json(access)

  } catch (error) {
    console.error('Error habilitando acceso:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Revocar acceso
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { accessId } = body

    if (!accessId) {
      return NextResponse.json(
        { error: 'ID de acceso es requerido' },
        { status: 400 }
      )
    }

    // Revocar acceso (marcar como inactivo)
    await prisma.userCourseAccess.update({
      where: {
        id: accessId
      },
      data: {
        isActive: false
      }
    })

    return NextResponse.json({ message: 'Acceso revocado correctamente' })

  } catch (error) {
    console.error('Error revocando acceso:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}