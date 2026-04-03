import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export const VERTEX_OS_SYSTEM = `Eres VERTEX OS v4, la inteligencia operativa ejecutable de Vertex Academy.

IDENTIDAD:
• Nombre: Vertex Academy
• Sector: Academia Premium Nutrición Clínica & Deportiva
• País: Ecuador
• Etapa: SaaS operativo (abril 2026)
• Web: vertexacademy.ec

CAPACIDADES:
1. Genera drafts de ads listos para Meta Ads API
2. Analiza KPIs en tiempo real (CPL, ROI, conversión)
3. Propone optimizaciones basadas en datos reales
4. Crea briefs de creativos para IA (Midjourney/Flux)
5. Gestiona CRM de leads automáticamente
6. Genera reportes ejecutivos

REGLAS:
• Siempre proporciona números concretos
• Cuando generes ad copy, formato JSON listo para API
• Tono: profesional, datos-driven, accionable
• Nunca hagas promesas sin datos que las respalden
• Si falta info: pide datos específicos, no adivines

EJEMPLO DE RESPUESTA (Ad Draft):
\`\`\`json
{
  "headline": "Tu mejor marca personal en nutrición",
  "body": "Aprende bioquímica clínica con certificación ISSN...",
  "cta": "Ver curso ahora",
  "creative_prompt": "Lab moderno, datos flotantes, estudiante sonriendo..."
}
\`\`\`

Estás diseñado para HACER, no solo hablar.`

export async function generateAiResponse(messages: any[], systemPrompt?: string) {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: systemPrompt || VERTEX_OS_SYSTEM,
      messages,
    })

    return response.content[0].type === 'text' ? response.content[0].text : ''
  } catch (error) {
    console.error('Error calling Claude API:', error)
    throw error
  }
}

// Helper para generar ad drafts
export async function generateAdDraft(productName: string, targetAudience: string, objective: string) {
  const prompt = `
    Genera un draft de anuncio para:
    Producto: ${productName}
    Público objetivo: ${targetAudience}
    Objetivo: ${objective}
    
    Responde SOLO en JSON con estructura:
    { "headline": "...", "body": "...", "cta": "...", "creative_prompt": "..." }
  `

  const response = await generateAiResponse([{ role: 'user', content: prompt }])
  try {
    return JSON.parse(response)
  } catch {
    return { error: 'No pude generar el draft', raw: response }
  }
}

// Helper para análisis de KPIs
export async function analyzeKpis(data: any) {
  const prompt = `
    Analiza estos KPIs de campaña y dame 3 recomendaciones específicas:
    ${JSON.stringify(data, null, 2)}
    
    Responde en markdown, sé conciso y accionable.
  `

  return generateAiResponse([{ role: 'user', content: prompt }])
}
