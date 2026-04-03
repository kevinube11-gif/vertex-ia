'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiImage, FiPlus, FiCopy, FiStar } from 'react-icons/fi'

interface Creativo {
  id: string
  nombre: string
  tipo: string
  url_preview?: string
  prompt_generado?: string
  performance?: {
    impressiones: number
    clicks: number
    ctr: number
    conversiones: number
  }
  fecha_creacion: string
}

const PLANTILLAS_PREDEFINIDAS = [
  {
    id: 'template-1',
    nombre: 'Clinical Education',
    tipo: 'imagen',
    descripcion: 'Lab moderno con datos científicos',
    prompt:
      'Modern medical laboratory, DNA helix, clinical data visualization, professional lighting, scientific aesthetic, 4K',
    performance: { ctr: 2.8, conversiones: 18 },
  },
  {
    id: 'template-2',
    nombre: 'Athletic Performance',
    tipo: 'imagen',
    descripcion: 'Atleta en acción con métricas',
    prompt:
      'Professional athlete, nutrition data overlay, sports science, performance metrics, dynamic lighting, 4K',
    performance: { ctr: 3.2, conversiones: 22 },
  },
  {
    id: 'template-3',
    nombre: 'Student Success',
    tipo: 'imagen',
    descripcion: 'Estudiante en aula moderna',
    prompt:
      'Young student in modern classroom, ISSN certification, learning environment, achievement vibes, 4K',
    performance: { ctr: 2.5, conversiones: 15 },
  },
  {
    id: 'template-4',
    nombre: 'Before-After Transformation',
    tipo: 'carrusel',
    descripcion: 'Antes-Después de transformación',
    prompt: 'Split screen: before state on left, after state on right, transformation story, metrics, professional',
    performance: { ctr: 4.1, conversiones: 31 },
  },
]

const COPY_TEMPLATES = [
  {
    titulo: 'Lead Generation - Clinical',
    copy: `¿Internado de nutrición? 

La bioquímica clínica no es imposible.

Aprende a interpretar exámenes de laboratorio en 48 horas. Con protocolo ISSN y casos reales.

Solo 15 cupos disponibles. Precio preventa: $20.

[Ver curso]`,
  },
  {
    titulo: 'Performance - Athletes',
    copy: `Runners, CrossFitters, Halterofilia.

Tu mejor marca depende de lo que comas.

Nutrición científica avalada por FELP. Basada en tus métricas reales.

Precio: $45 | Flash: $35 por 48h.

[Inscribirse]`,
  },
  {
    titulo: 'Bundle Offer - Double Value',
    copy: `Certificación dual: Clinical + Performance.

Lo mejor para profesionales que quieren ambas especialidades.

$55 total | Válido 48 horas.

Avales ISSN + FELP + FEUCSG.

[Comprar ahora]`,
  },
]

export default function LibraryPage() {
  const [creativos, setCreativos] = useState<Creativo[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'biblioteca' | 'plantillas' | 'copy'>('biblioteca')
  const [copiedPrompt, setCopiedPrompt] = useState('')

  useEffect(() => {
    fetchCreativos()
  }, [])

  const fetchCreativos = async () => {
    try {
      // En producción, esto vendría de la BD
      setCreativos([])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(''), 2000)
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
            <FiImage /> Biblioteca Visual & Copy
          </h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#2B1B12]">
          {['biblioteca', 'plantillas', 'copy'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-2 border-b-2 transition ${
                activeTab === tab
                  ? 'border-[#C9A34A] text-[#C9A34A]'
                  : 'border-transparent text-[#BDB09A] hover:text-[#C9A34A]'
              }`}
            >
              {tab === 'biblioteca'
                ? 'Biblioteca (Tus creativos)'
                : tab === 'plantillas'
                ? 'Plantillas (Ready-to-use)'
                : 'Copy (Textos probados)'}
            </button>
          ))}
        </div>

        {/* BIBLIOTECA TAB */}
        {activeTab === 'biblioteca' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#C9A34A]">Tus Creativos Guardados</h2>
                <button className="btn-primary flex items-center gap-2 text-sm">
                  <FiPlus /> Subir Creativo
                </button>
              </div>

              {creativos.length === 0 ? (
                <div className="text-center py-12">
                  <FiImage className="text-4xl text-[#7A6A4A] mx-auto mb-4" />
                  <p className="text-[#BDB09A]">
                    No hay creativos aún. Genera uno con el Ad Generator o carga tus propios.
                  </p>
                  <Link href="/ad-generator" className="text-[#C9A34A] hover:text-white mt-4 inline-block">
                    Ir a Ad Generator →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creativos.map((creativo) => (
                    <div key={creativo.id} className="border border-[#2B1B12] rounded-lg overflow-hidden hover:border-[#C9A34A] transition">
                      {creativo.url_preview && (
                        <img
                          src={creativo.url_preview}
                          alt={creativo.nombre}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-[#C9A34A] mb-2">{creativo.nombre}</h3>
                        <p className="text-xs text-[#BDB09A] mb-3">{creativo.tipo}</p>
                        {creativo.performance && (
                          <div className="bg-[#1C1409] p-3 rounded mb-3 text-xs space-y-1">
                            <p>CTR: {creativo.performance.ctr}%</p>
                            <p>Conversiones: {creativo.performance.conversiones}</p>
                          </div>
                        )}
                        <button className="text-[#C9A34A] hover:text-white text-sm flex items-center gap-2">
                          <FiCopy /> Usar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PLANTILLAS TAB */}
        {activeTab === 'plantillas' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-bold text-[#C9A34A] mb-6">
                Plantillas Probadas (High-Performance)
              </h2>
              <p className="text-[#BDB09A] text-sm mb-6">
                Estas plantillas han sido testeadas y tienen CTR y conversión comprobadas. Copia el
                prompt y úsalo en Midjourney/Flux.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {PLANTILLAS_PREDEFINIDAS.map((plantilla) => (
                  <div key={plantilla.id} className="card border-2 border-[#2B1B12]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-[#C9A34A] text-lg">{plantilla.nombre}</h3>
                        <p className="text-[#BDB09A] text-sm mt-1">{plantilla.descripcion}</p>
                      </div>
                      <FiStar className="text-yellow-400 text-xl" />
                    </div>

                    {plantilla.performance && (
                      <div className="bg-[#1C1409] p-3 rounded mb-4 text-sm space-y-1">
                        <p className="text-green-400">
                          CTR Promedio: <strong>{plantilla.performance.ctr}%</strong>
                        </p>
                        <p className="text-green-400">
                          Conversiones: <strong>{plantilla.performance.conversiones}</strong>
                        </p>
                      </div>
                    )}

                    <div className="bg-black p-4 rounded mb-4 border border-[#2B1B12]">
                      <p className="text-xs text-gray-400 font-mono leading-relaxed">
                        {plantilla.prompt}
                      </p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(plantilla.prompt, plantilla.id)}
                      className="text-[#C9A34A] hover:text-white transition flex items-center gap-2 text-sm"
                    >
                      {copiedPrompt === plantilla.id ? (
                        <>✓ Copiado</>
                      ) : (
                        <>
                          <FiCopy /> Copiar Prompt
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COPY TAB */}
        {activeTab === 'copy' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-bold text-[#C9A34A] mb-6">Ad Copy Probados</h2>
              <p className="text-[#BDB09A] text-sm mb-6">
                Copy que ha generado conversiones en campañas anteriores. Personaliza con tus datos
                y usa.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {COPY_TEMPLATES.map((template, i) => (
                  <div key={i} className="card border-2 border-[#2B1B12]">
                    <h3 className="font-bold text-[#C9A34A] mb-4">{template.titulo}</h3>

                    <div className="bg-black p-4 rounded mb-4 border border-[#2B1B12] whitespace-pre-wrap text-sm text-[#BDB09A] font-mono">
                      {template.copy}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => copyToClipboard(template.copy, `copy-${i}`)}
                        className="btn-secondary text-sm flex items-center gap-2"
                      >
                        {copiedPrompt === `copy-${i}` ? (
                          <>✓ Copiado</>
                        ) : (
                          <>
                            <FiCopy /> Copiar
                          </>
                        )}
                      </button>
                      <Link href="/ad-generator" className="btn-primary text-sm">
                        Mejorar con IA
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
