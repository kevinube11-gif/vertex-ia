'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiPlus, FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi'

interface Lead {
  id: string
  nombre: string
  email: string
  telefono?: string
  status: string
  origen: string
  fecha_creacion: string
  monto?: number
}

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    status: 'nuevo',
    origen: 'manual',
  })

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads(data)
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormData({ nombre: '', email: '', telefono: '', status: 'nuevo', origen: 'manual' })
        setShowForm(false)
        fetchLeads()
      }
    } catch (error) {
      console.error('Error creating lead:', error)
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'venta':
        return 'badge-success'
      case 'interesado':
        return 'badge-warning'
      case 'descartado':
        return 'badge-error'
      default:
        return 'badge'
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0704]">
      {/* Header */}
      <header className="border-b border-[#2B1B12] bg-[#140D05]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-[#C9A34A] hover:text-white transition">
            <FiArrowLeft /> Volver
          </Link>
          <h1 className="text-2xl font-bold text-[#C9A34A]">CRM de Leads</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus /> Nuevo Lead
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Form */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-lg font-bold text-[#C9A34A] mb-4">Agregar Nuevo Lead</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="input-field"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Teléfono (opcional)"
                  className="input-field"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
                <select
                  className="input-field"
                  value={formData.origen}
                  onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                >
                  <option value="manual">Manual</option>
                  <option value="ads">Ads</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary">
                  Guardar Lead
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla de Leads */}
        <div className="card">
          <h2 className="text-lg font-bold text-[#C9A34A] mb-4">
            Todos los Leads ({leads.length})
          </h2>

          {loading ? (
            <p className="text-[#BDB09A]">Cargando...</p>
          ) : leads.length === 0 ? (
            <p className="text-[#BDB09A]">No hay leads aún. Crea uno para empezar.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Status</th>
                    <th>Origen</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="font-semibold">{lead.nombre}</td>
                      <td className="text-sm">{lead.email}</td>
                      <td className="text-sm">{lead.telefono || '-'}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="text-sm">{lead.origen}</td>
                      <td className="text-sm text-[#BDB09A]">
                        {new Date(lead.fecha_creacion).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="text-[#C9A34A] hover:text-white transition">
                            <FiEdit2 />
                          </button>
                          <button className="text-red-600 hover:text-red-400 transition">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
