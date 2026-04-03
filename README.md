# VERTEX OS v4 - SaaS Intelligence Platform

**CRM + Analytics + IA + Automatización Meta Ads en una sola plataforma.**

---

## 🚀 Features

✅ **CRM Completo** - Gestiona leads en tiempo real
✅ **Analytics Dashboard** - KPIs, ROI, CPL con gráficos
✅ **AI Ad Generator** - VERTEX OS genera ad copy automáticamente
✅ **Meta Ads Integration** - Crea y gestiona ads directamente
✅ **Biblioteca Visual** - Plantillas probadas + copy templates
✅ **n8n Automation** - Automatiza workflows de Meta Ads
✅ **Supabase DB** - PostgreSQL en la nube, gratis hasta 500K filas
✅ **Mobile Responsive** - Funciona en cualquier dispositivo

---

## 📋 Requirements

- Node.js 18+
- npm o yarn
- Cuenta de Supabase (gratis)
- API key de Anthropic (gratis $5 crédito)
- Token de Meta Business Account
- (Opcional) Instancia de n8n

---

## 🛠️ Setup en 5 minutos

### 1. Clona o descarga este proyecto

```bash
git clone <repo> vertex-os-v4
cd vertex-os-v4
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Configura Supabase

a) Ve a https://supabase.com y crea un proyecto (gratis)

b) En el SQL Editor, ejecuta el contenido de `supabase-migrations.sql`

c) Copia tu **Project URL** y **Anon Key** de Settings → API

### 4. Configura variables de entorno

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXA...
ANTHROPIC_API_KEY=sk-ant-v0...
META_BUSINESS_ACCOUNT_TOKEN=your-meta-token
```

### 5. Inicia el servidor

```bash
npm run dev
```

Abre http://localhost:3000 🎉

---

## 📖 Guía de Uso

### Dashboard Principal

- **Resumen de últimos 30 días** - Leads, conversiones, gasto, ROI
- **4 módulos principales** - CRM, Analytics, Ad Generator, Library

### CRM de Leads

```
1. Haz clic en "CRM de Leads"
2. Clic en "+ Nuevo Lead"
3. Completa: Nombre, Email, Origen (ads/manual/whatsapp)
4. Guarda
5. Ve la tabla con todos tus leads
```

Cada lead tiene:
- Status: nuevo → contactado → interesado → venta
- Origen: Manual, Ads, WhatsApp, Email
- Historial completo

### Generador de Ads (VERTEX OS)

```
1. Ve a "Generador de Ads"
2. Completa:
   - Producto: "Bioquímica Clínica Pro"
   - Público: "Estudiantes nutrición 18-25, Quito"
   - Objetivo: "Lead generation"
3. Clic "Generar Ad Draft"
4. VERTEX OS genera automáticamente:
   - Headline
   - Body copy
   - Call-to-action
   - Creative prompt para Midjourney
5. Copia cada parte y úsala
```

**Flujo completo:**
- Genera ad copy aquí
- Copia creative prompt a Midjourney
- Genera 2-3 imágenes
- Copia copy + imagen a Meta Ads Manager

### Analytics Dashboard

```
1. Ve a "Analytics"
2. Selecciona período: 7/30/90/365 días
3. Ve métricas:
   - Total Leads
   - Conversiones
   - Gasto total
   - ROI promedio
   - CPL promedio
4. Gráficos:
   - Leads vs Conversiones (línea)
   - Gasto vs Ingresos (barras)
   - CPL Tendencia (línea)
   - ROI Tendencia (línea)
5. Exporta a CSV
```

**Métricas automáticas:**
- CPL = Gasto / Leads
- ROI = ((Ingresos - Gasto) / Gasto) * 100
- Tasa conversión = (Conversiones / Leads) * 100

### Biblioteca Visual

3 tabs:

1. **Biblioteca (Tus creativos)**
   - Sube tus creativos
   - Ve performance (CTR, conversiones)
   - Reutiliza los mejores

2. **Plantillas (Ready-to-use)**
   - 4 plantillas probadas
   - CTR y conversión real
   - Copy el prompt a Midjourney/Flux

3. **Copy (Textos probados)**
   - 3 templates de copy
   - Copia y adapta
   - Mejora con VERTEX OS

---

## 🔌 Integración con Meta Ads API

### Setup

```bash
# En .env.local
META_BUSINESS_ACCOUNT_TOKEN=your-token
META_CAMPAIGN_ID=your-campaign
META_PAGE_ID=your-page
```

### Crear ad directamente desde VERTEX OS

```javascript
// POST /api/meta/draft-ads
{
  "page_id": "123456789",
  "headline": "Tu mejor marca personal",
  "body_text": "Aprende nutrición clínica con certificación...",
  "call_to_action_type": "LEARN_MORE",
  "destination_url": "https://vertexacademy.ec/curso",
  "image_url": "image-hash-from-meta",
  "daily_budget": "500",
  "targeting": { "age_min": 18, "age_max": 35, "geo_locations": {...} }
}
```

El API responde con:
- `ad_id` - ID del ad en Meta
- `adset_id` - ID del adset
- `creative_id` - ID del creativo
- Status: `PAUSED` (para revisar antes de activar)

---

## 🤖 Automatización con n8n

### Setup

1. Crea instancia de n8n (gratis en https://n8n.cloud)

2. Importa el workflow de `n8n-workflow.json`

3. Configura credenciales:
   - Supabase
   - Meta Ads API
   - Slack (opcional, para notificaciones)

4. El workflow automatiza:
   ```
   Webhook (recibe campaña) →
   Guardar en BD →
   Enviar a VERTEX OS →
   Crear AdSet en Meta →
   Notificar en Slack
   ```

---

## 📊 Estructura de Base de Datos

### Tablas

**leads**
- id, email, nombre, telefono
- origen, status, monto
- fecha_creacion, anotaciones
- campana_id (FK a campaigns)

**campaigns**
- id, nombre, presupuesto
- canal (meta/email/whatsapp/manual)
- status (borrador/activo/pausado/finalizado)
- leads_generados, conversiones
- gasto_real, cpl, roi

**analytics**
- fecha, leads, conversiones
- gasto, ingresos
- cpl, roi (calculados automáticamente)

**creativos**
- id, nombre, tipo (imagen/video/carrusel/texto)
- url_preview, prompt_generado
- performance_ctr, performance_conversiones

**meta_ads_drafts**
- id, nombre, headline, body_text
- campana_id, creative_id
- meta_ad_id (ID en Meta después de publicar)
- status (draft/published/archived)

---

## 🔐 Seguridad

### En Producción

1. **Supabase Auth**
   - Implementa login (Google/Email)
   - Row-level security por usuario

2. **API Keys**
   - Usa variables de entorno
   - Nunca comittees `.env.local`
   - Rota tokens regularmente

3. **HTTPS**
   - Vercel usa HTTPS automáticamente
   - Meta Ads API requiere HTTPS

---

## 💰 Costos Estimados (Mes 1)

| Servicio | Precio | Notas |
|----------|--------|-------|
| Vercel | $0 | Gratis para <100GB/mes |
| Supabase | $0 | Gratis para <500K filas |
| Anthropic Claude | $5-15 | $0.01 por request aprox |
| Meta Ads | $180+ | Presupuesto de marketing (no infra) |
| n8n | $0 o $10 | Gratis o Plan Cloud |
| **TOTAL** | **$5-25** | Solo infraestructura |

Meta Ads budget va aparte (es inversión de marketing).

---

## 🚀 Deployment a Producción

### En Vercel

```bash
# 1. Sube a GitHub
git push origin main

# 2. En Vercel.com:
# - New Project
# - Selecciona repo
# - Add Environment Variables
# - Deploy
```

### Variables en Vercel

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ANTHROPIC_API_KEY=...
META_BUSINESS_ACCOUNT_TOKEN=...
```

---

## 📚 API Endpoints

### Leads
- `GET /api/leads` - Obtener todos
- `POST /api/leads` - Crear nuevo
- `PATCH /api/leads/:id` - Actualizar
- `DELETE /api/leads/:id` - Eliminar

### Campaigns
- `GET /api/campaigns` - Obtener todos
- `POST /api/campaigns` - Crear nueva

### Analytics
- `GET /api/analytics?dias=30` - Obtener KPIs
- `POST /api/analytics` - Registrar dato

### IA
- `POST /api/ai/generate-ad` - Generar ad con VERTEX OS

### Meta Ads
- `POST /api/meta/draft-ads` - Crear ad draft
- `GET /api/meta/draft-ads?campaign_id=...` - Ver drafts

---

## 🐛 Troubleshooting

**"Error de conexión a Supabase"**
- Verifica NEXT_PUBLIC_SUPABASE_URL y ANON_KEY en .env.local
- Confirma que el proyecto está activo en Supabase

**"No aparecen los leads"**
- Ejecutaste `supabase-migrations.sql`?
- La tabla `leads` existe en Supabase?

**"VERTEX OS no genera copy"**
- Verifica ANTHROPIC_API_KEY
- Tienes crédito en tu cuenta (gratis $5)?

**"Meta Ads API falla"**
- Valida META_BUSINESS_ACCOUNT_TOKEN
- El token tiene permisos de ADS?

---

## 📞 Soporte

**Documentación:**
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Anthropic: https://docs.anthropic.com
- Meta Ads API: https://developers.facebook.com/docs/marketing-api

**Comunidad:**
- Preguntas en Discord/Slack de cada servicio

---

## 📄 Licencia

VERTEX OS v4 - Creado por Kevin Adrián Clavijo para Vertex Academy

---

**¿Listo? Inicia con `npm run dev` y accede a http://localhost:3000**

🚀 **Tu SaaS operativo sin pagar software enterprise.**
