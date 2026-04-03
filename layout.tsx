import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/analytics - Obtener KPIs
export async function GET(request: NextRequest) {
  try {
    const dias = request.nextUrl.searchParams.get('dias') || '30'
    const fecha_inicio = new Date()
    fecha_inicio.setDate(fecha_inicio.getDate() - parseInt(dias))

    // Obtener analytics
    const { data: analytics, error } = await supabase
      .from('analytics')
      .select('*')
      .gte('fecha', fecha_inicio.toISOString())
      .order('fecha', { ascending: true })

    if (error) throw error

    // Calcular resúmenes
    const totalLeads = analytics.reduce((sum, a) => sum + (a.leads || 0), 0)
    const totalConversiones = analytics.reduce((sum, a) => sum + (a.conversiones || 0), 0)
    const totalGasto = analytics.reduce((sum, a) => sum + (a.gasto || 0), 0)
    const totalIngresos = analytics.reduce((sum, a) => sum + (a.ingresos || 0), 0)
    const cplPromedio = totalLeads > 0 ? (totalGasto / totalLeads).toFixed(2) : '0'
    const roiPromedio =
      totalGasto > 0 ? (((totalIngresos - totalGasto) / totalGasto) * 100).toFixed(2) : '0'
    const tasaConversion =
      totalLeads > 0 ? ((totalConversiones / totalLeads) * 100).toFixed(2) : '0'

    return NextResponse.json({
      resumen: {
        totalLeads,
        totalConversiones,
        totalGasto: totalGasto.toFixed(2),
        totalIngresos: totalIngresos.toFixed(2),
        cplPromedio,
        roiPromedio: `${roiPromedio}%`,
        tasaConversion: `${tasaConversion}%`,
        dias,
      },
      datos: analytics,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/analytics - Registrar nuevo punto de datos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const record = {
      fecha: body.fecha || new Date().toISOString(),
      leads: body.leads || 0,
      conversiones: body.conversiones || 0,
      gasto: body.gasto || 0,
      ingresos: body.ingresos || 0,
      cpl: body.gasto && body.leads ? (body.gasto / body.leads).toFixed(2) : null,
      roi:
        body.gasto > 0
          ? (((body.ingresos - body.gasto) / body.gasto) * 100).toFixed(2)
          : null,
    }

    const { data, error } = await supabase.from('analytics').insert([record]).select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
