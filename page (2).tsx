'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiTrendingUp, FiDownload } from 'react-icons/fi'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AnalyticsData {
  fecha: string
  leads: number
  conversiones: number
  gasto: number
  ingresos: number
  cpl: number
  roi: number
}

interface ResumenStats {
  totalLeads: number
  totalConversiones: number
  totalGasto: string
  roiPromedio: string
  cplPromedio: string
  tasaConversion: string
  dias: string
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [resumen, setResumen] = useState<ResumenStats | null>(null)
  const [dias, setDias] = useState('30')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [dias])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/analytics?dias=${dias}`)
      const data = await res.json()
      setAnalytics(data.datos)
      setResumen(data.resumen)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (!analytics.length) return

    const headers = ['Fecha', 'Leads', 'Conversiones', 'Gasto', 'Ingresos', 'CPL', 'ROI']
    const csvContent = [
      headers.join(','),
      ...analytics.map(a =>
        `${a.fecha},${a.leads},${a.conversiones},${a.gasto},${a.ingresos},${a.cpl},${a.roi}`
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${dias}dias.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-[#0A0704]">
      {/* Header */}
      <header className="border-b border-[#2B1B12] bg-[#140D05] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-[#C9A34A] hover:text-white transition">
            <FiArrowLeft /> Volver
          </Link>
          <h1 className="text-2xl font-bold text-[#C9A34A] flex items-center gap-2">
            <FiTrendingUp /> Analytics Dashboard
          </h1>
          <button
            onClick={exportToCSV}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <FiDownload /> Exportar CSV
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="card mb-8">
          <label className="text-sm font-semibold text-[#BDB09A] mr-4">
            Período:
          </label>
          <select
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            className="input-field inline-block w-32"
          >
            <option value="7">Últimos 7 días</option>
            <option value="30">Últimos 30 días</option>
            <option value="90">Últimos 90 días</option>
            <option value="365">Este año</option>
          </select>
        </div>

        {/* Resumen de KPIs */}
        {resumen && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#C9A34A]">
              Resumen de últimos {resumen.dias} días
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  label: 'Leads Generados',
                  value: resumen.totalLeads,
                  color: 'blue',
                  icon: '📊',
                },
                {
                  label: 'Conversiones',
                  value: resumen.totalConversiones,
                  color: 'green',
                  icon: '✅',
                },
                {
                  label: 'Gasto Total',
                  value: `$${resumen.totalGasto}`,
                  color: 'yellow',
                  icon: '💰',
                },
                {
                  label: 'ROI Promedio',
                  value: resumen.roiPromedio,
                  color: 'purple',
                  icon: '📈',
                },
              ].map((stat, i) => (
                <div key={i} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#BDB09A] text-sm mb-2">{stat.label}</p>
                      <p
                        className={`text-2xl font-bold ${
                          stat.color === 'blue'
                            ? 'text-blue-400'
                            : stat.color === 'green'
                            ? 'text-green-400'
                            : stat.color === 'yellow'
                            ? 'text-yellow-400'
                            : 'text-purple-400'
                        }`}
                      >
                        {stat.value}
                      </p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Métricas adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {[
                {
                  label: 'CPL Promedio',
                  value: `$${resumen.cplPromedio}`,
                  benchmark: '$0.50–$0.80',
                },
                {
                  label: 'Tasa de Conversión',
                  value: resumen.tasaConversion,
                  benchmark: '5–10% es bueno',
                },
                {
                  label: 'Tasa de Conversión/Lead',
                  value: (
                    (resumen.totalConversiones / resumen.totalLeads * 100).toFixed(1)
                  ) + '%',
                  benchmark: 'Target: 8%',
                },
              ].map((metric, i) => (
                <div key={i} className="card border-2 border-[#2B1B12]">
                  <p className="text-[#BDB09A] text-sm mb-2">{metric.label}</p>
                  <p className="text-xl font-bold text-[#C9A34A]">{metric.value}</p>
                  <p className="text-xs text-[#7A6A4A] mt-2">{metric.benchmark}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gráficos */}
        {!loading && analytics.length > 0 && (
          <section className="space-y-8">
            {/* Leads vs Conversiones */}
            <div className="card">
              <h3 className="text-lg font-bold text-[#C9A34A] mb-6">
                Leads vs Conversiones
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2B1B12" />
                  <XAxis dataKey="fecha" stroke="#7A6A4A" />
                  <YAxis stroke="#7A6A4A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#140D05',
                      border: '1px solid #C9A34A',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Leads"
                  />
                  <Line
                    type="monotone"
                    dataKey="conversiones"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Conversiones"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Gasto vs Ingresos */}
            <div className="card">
              <h3 className="text-lg font-bold text-[#C9A34A] mb-6">
                Gasto vs Ingresos
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2B1B12" />
                  <XAxis dataKey="fecha" stroke="#7A6A4A" />
                  <YAxis stroke="#7A6A4A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#140D05',
                      border: '1px solid #C9A34A',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="gasto" fill="#FBBF24" name="Gasto" />
                  <Bar dataKey="ingresos" fill="#10B981" name="Ingresos" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* CPL Tendencia */}
            <div className="card">
              <h3 className="text-lg font-bold text-[#C9A34A] mb-6">
                CPL Tendencia (Costo por Lead)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2B1B12" />
                  <XAxis dataKey="fecha" stroke="#7A6A4A" />
                  <YAxis stroke="#7A6A4A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#140D05',
                      border: '1px solid #C9A34A',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="cpl"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    name="CPL"
                    dot={{ fill: '#F59E0B' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* ROI Tendencia */}
            <div className="card">
              <h3 className="text-lg font-bold text-[#C9A34A] mb-6">
                ROI Tendencia
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2B1B12" />
                  <XAxis dataKey="fecha" stroke="#7A6A4A" />
                  <YAxis stroke="#7A6A4A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#140D05',
                      border: '1px solid #C9A34A',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${value.toFixed(2)}%`}
                  />
                  <Line
                    type="monotone"
                    dataKey="roi"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    name="ROI %"
                    dot={{ fill: '#8B5CF6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {loading && <p className="text-[#BDB09A]">Cargando datos...</p>}
        {!loading && analytics.length === 0 && (
          <p className="text-[#BDB09A]">No hay datos para este período.</p>
        )}
      </main>
    </div>
  )
}
