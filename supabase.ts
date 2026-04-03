import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TIPOS
export interface Lead {
  id: string
  email: string
  nombre: string
  telefono?: string
  origen: 'whatsapp' | 'ads' | 'manual' | 'email'
  status: 'nuevo' | 'contactado' | 'interesado' | 'venta' | 'descartado'
  monto?: number
  fecha_creacion: string
  anotaciones?: string
  campana_id?: string
}

export interface Campaign {
  id: string
  nombre: string
  presupuesto: number
  canal: 'meta' | 'email' | 'whatsapp' | 'manual'
  status: 'borrador' | 'activo' | 'pausado' | 'finalizado'
  fecha_inicio: string
  fecha_fin?: string
  leads_generados: number
  conversiones: number
  gasto_real: number
  cpl?: number
  roi?: number
}

export interface Creativo {
  id: string
  nombre: string
  tipo: 'imagen' | 'video' | 'carrusel' | 'texto'
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

export interface Analytics {
  fecha: string
  leads: number
  conversiones: number
  gasto: number
  ingresos: number
  cpl: number
  roi: number
}

// Funciones CRUD para Leads
export async function getLeads() {
  return supabase.from('leads').select('*').order('fecha_creacion', { ascending: false })
}

export async function addLead(lead: Omit<Lead, 'id'>) {
  return supabase.from('leads').insert([lead]).select()
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  return supabase.from('leads').update(updates).eq('id', id).select()
}

export async function deleteLead(id: string) {
  return supabase.from('leads').delete().eq('id', id)
}

// Funciones para Campañas
export async function getCampaigns() {
  return supabase.from('campaigns').select('*').order('fecha_inicio', { ascending: false })
}

export async function addCampaign(campaign: Omit<Campaign, 'id'>) {
  return supabase.from('campaigns').insert([campaign]).select()
}

export async function updateCampaign(id: string, updates: Partial<Campaign>) {
  return supabase.from('campaigns').update(updates).eq('id', id).select()
}

// Funciones para Analytics
export async function getAnalytics(dias: number = 30) {
  const fecha_inicio = new Date()
  fecha_inicio.setDate(fecha_inicio.getDate() - dias)
  
  return supabase
    .from('analytics')
    .select('*')
    .gte('fecha', fecha_inicio.toISOString())
    .order('fecha', { ascending: true })
}

export async function addAnalyticsRecord(record: Analytics) {
  return supabase.from('analytics').insert([record]).select()
}

// Funciones para Creativos
export async function getCreativos() {
  return supabase.from('creativos').select('*').order('fecha_creacion', { ascending: false })
}

export async function addCreativo(creativo: Omit<Creativo, 'id'>) {
  return supabase.from('creativos').insert([creativo]).select()
}
