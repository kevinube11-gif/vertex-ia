# VERTEX OS v4 — Guía de Deployment (5 pasos)

**Tus 5 pasos para tener un SaaS operativo en producción. Gratis o muy barato.**

---

## 🎯 Lo que vas a lograr

Después de esto tendrás:

✅ Dashboard operativo en tu dominio propio
✅ Base de datos en la nube (Supabase)
✅ IA generando ads automáticamente (Anthropic)
✅ CRM, Analytics, Meta Ads integration
✅ Auto-scaling, sin costos de servidor

**Tiempo total: 20-30 minutos**
**Costo: $0 por infraestructura (mes 1)**

---

## Paso 1: Crea cuenta en Supabase (5 min)

### 1.1 Abre https://supabase.com

### 1.2 Click "Start your project"

### 1.3 Crea proyecto:
- **Name**: vertex-os-v4
- **Database Password**: (guarda esto!)
- **Region**: América del Sur (São Paulo si quieres latencia baja)

### 1.4 Espera a que se cree (2-3 minutos)

### 1.5 Ve a SQL Editor y copia-pega TODO de `supabase-migrations.sql`

```bash
# Copy el contenido completo de supabase-migrations.sql
# Pégalo en Supabase SQL Editor
# Clic "Run"
# Listo!
```

### 1.6 Obtén tus credenciales:
- Ve a **Settings → API**
- Copia:
  - `Project URL` → va en `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Paso 2: Obtén API keys (5 min)

### 2.1 Anthropic (VERTEX OS IA)

1. Ve a https://console.anthropic.com
2. Sign up o Login
3. Ve a **API Keys**
4. Click **Create Key**
5. Copia: `sk-ant-...` → va en `ANTHROPIC_API_KEY`
6. Te dan $5 gratis de crédito

### 2.2 Meta Business Account (opcional, si quieres Meta Ads)

1. Ve a https://business.facebook.com
2. Crear Business Account (gratis)
3. Conectar página de Facebook
4. Ve a **Settings → Access Tokens**
5. Generar token → `META_BUSINESS_ACCOUNT_TOKEN`

---

## Paso 3: Configura proyecto localmente (5 min)

### 3.1 Clona o descarga el proyecto

```bash
git clone <repo> vertex-os-v4
cd vertex-os-v4
npm install
```

### 3.2 Crea `.env.local`

```bash
cp .env.local.example .env.local
```

### 3.3 Edita `.env.local` con tus credenciales:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXA...
ANTHROPIC_API_KEY=sk-ant-v0...
META_BUSINESS_ACCOUNT_TOKEN=your-token (si tienes)
NEXT_PUBLIC_APP_URL=http://localhost:3000 (por ahora)
```

### 3.4 Prueba localmente

```bash
npm run dev
# Abre http://localhost:3000
# Debe funcionar perfecto ✅
```

---

## Paso 4: Deploy a Vercel (5 min)

**Vercel es el lugar donde viven las aplicaciones Next.js. Gratis.**

### 4.1 Sube a GitHub

```bash
git init
git add .
git commit -m "VERTEX OS v4 inicial"
git branch -M main
git remote add origin https://github.com/tu-usuario/vertex-os-v4.git
git push -u origin main
```

(Si no tienes Git: sube el ZIP a GitHub directamente)

### 4.2 Importa en Vercel

1. Ve a https://vercel.com
2. Sign up con GitHub
3. Click **New Project**
4. Selecciona el repo `vertex-os-v4`
5. Click **Deploy**

### 4.3 Configura Environment Variables

En Vercel:
1. Ve a **Settings → Environment Variables**
2. Agrega cada variable de `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL = https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ0eX...
ANTHROPIC_API_KEY = sk-ant...
META_BUSINESS_ACCOUNT_TOKEN = ... (si tienes)
NEXT_PUBLIC_APP_URL = https://vertex-os-v4.vercel.app
```

3. Click **Save**

### 4.4 Re-deploy

Vercel redeploy automáticamente. Espera 1-2 minutos.

Tu app estará en:
```
https://vertex-os-v4.vercel.app
```

🎉 **¡Listo! Tu SaaS está en producción!**

---

## Paso 5: Dominio propio (opcional, 5 min)

### 5.1 Si tienes dominio

1. En Vercel → **Settings → Domains**
2. Click **Add Domain**
3. Escribe tu dominio: `vertex.edu.ec`
4. Vercel te dará instrucciones de DNS
5. Apunta el dominio a Vercel en tu registrador
6. Listo en 5-10 minutos

### 5.2 Si NO tienes dominio

Usa el dominio de Vercel por ahora:
```
vertex-os-v4.vercel.app
```

(Puedes agregar dominio luego, es gratis en Vercel)

---

## ✅ Checklist Post-Deploy

- [ ] Supabase proyecto creado y SQL ejecutado
- [ ] Anthropic API key obtenida
- [ ] `.env.local` completado localmente
- [ ] `npm run dev` funciona en http://localhost:3000
- [ ] GitHub repo creado y pusheado
- [ ] Vercel project importado
- [ ] Environment variables en Vercel configuradas
- [ ] App deployada en https://vertex-os-v4.vercel.app
- [ ] Dashboard carga sin errores
- [ ] Puedes crear un lead en CRM
- [ ] Ad Generator genera copy

---

## 🧪 Test después de Deploy

### Test 1: Dashboard carga

```
Accede a https://vertex-os-v4.vercel.app
Deberías ver el dashboard con 4 tarjetas de funcionalidades
```

### Test 2: CRM funciona

```
1. Click "CRM de Leads"
2. Click "+ Nuevo Lead"
3. Completa nombre, email
4. Click "Guardar Lead"
5. Debe aparecer en la tabla
```

### Test 3: Ad Generator funciona

```
1. Click "Generador de Ads"
2. Completa:
   - Producto: "Bioquímica Clínica"
   - Público: "Estudiantes Quito"
   - Objetivo: "Lead generation"
3. Click "Generar Ad Draft"
4. Debe generar copy en 2-3 segundos
```

### Test 4: Analytics carga

```
1. Click "Analytics"
2. Deberías ver 4 tarjetas con "0" (porque no hay datos aún)
3. Los gráficos deben cargar
```

---

## 🔧 Si algo falla

### "Error de conexión a Supabase"

```
1. Verifica NEXT_PUBLIC_SUPABASE_URL en .env.local
2. Verifica NEXT_PUBLIC_SUPABASE_ANON_KEY
3. ¿Las variables están en Vercel? Settings → Environment Variables
4. Re-deploy: Vercel dashboard → Re-deploy
```

### "VERTEX OS no genera copy"

```
1. Verifica ANTHROPIC_API_KEY en .env.local
2. ¿Tienes crédito? https://console.anthropic.com
3. (Deberías tener $5 gratis)
4. Si no funciona: test en terminal:
   curl -X POST https://api.anthropic.com/v1/messages \
     -H "x-api-key: sk-ant-..." \
     -H "Content-Type: application/json" \
     -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":100,"messages":[{"role":"user","content":"Hola"}]}'
```

### "No aparecen los leads"

```
1. ¿Ejecutaste supabase-migrations.sql completamente?
2. Ve a Supabase → Table Editor
3. ¿La tabla "leads" existe?
4. Si no: re-ejecuta el SQL
```

### "Meta Ads API falla"

```
Si no tienes Meta Business Account, esto es normal.
Funciona sin Meta (solo genera copy).
Meta es opcional para automatización.
```

---

## 📈 Próximos pasos (después de deploy)

1. **Agrega dominio propio**
   - Vercel → Settings → Domains
   - Apunta tu dominio

2. **Activa login**
   - Supabase Auth (Google, Email)
   - Solo acceso autenticado

3. **Integra n8n**
   - Crea instancia en https://n8n.cloud
   - Importa `n8n-workflow.json`
   - Automatiza Meta Ads

4. **Configura webhooks de Meta**
   - Recibe datos de performance
   - Actualiza analytics automáticamente

5. **Agrega más páginas**
   - Campaigns dashboard
   - Reports automáticos
   - Integraciones con Stripe (pagos)

---

## 🚨 Seguridad en Producción

1. **Nunca commities `.env.local`**
   - Ya está en `.gitignore` ✅

2. **Variables de entorno en Vercel**
   - No en código ✅

3. **HTTPS automático**
   - Vercel maneja certificados ✅

4. **Supabase Row Level Security**
   - Implementar después de MVP
   - Políticas por usuario

5. **API rate limiting**
   - Anthropic tiene límites
   - Supabase tiene límites
   - Perfecto para MVPs

---

## 💰 Costos Reales (Después del mes 1)

| Servicio | Mes 1 | Mes 2+ | Límites |
|----------|-------|--------|---------|
| Vercel | $0 | $0-20 | <100GB/mes gratis |
| Supabase | $0 | $0-25 | <500K filas + auth gratis |
| Anthropic | $5-15 | $10-50 | Pagas por uso |
| Meta Ads | $180+ | $180+ | Budget de marketing |
| n8n | $0 | $10+ | Si usas |
| Dominio | $0 | $12-15/año | registrador |

**Total infra: $0-50/mes**
**Meta Ads: Aparte (tu inversión marketing)**

---

## 📚 Recursos útiles

**Documentación:**
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Anthropic: https://docs.anthropic.com
- Next.js: https://nextjs.org/docs

**Comunidades:**
- Vercel Discord: https://discord.gg/vercel
- Supabase Discord: https://discord.supabase.com

---

## ✨ Una vez deployado

Tu VERTEX OS v4 está:

✅ Escalando automáticamente
✅ Disponible 24/7 en tu dominio
✅ Con BD en la nube
✅ Generando ads con IA
✅ Manejando leads en tiempo real
✅ Sin costos fijos de servidor
✅ Lista para agregar más features

---

**🎉 Felicidades! Tienes un SaaS operativo.**

Ahora:
1. Agrega leads
2. Genera ads
3. Analiza KPIs
4. Automatiza con n8n
5. Escala el negocio

---

*VERTEX OS v4 - Creado por Kevin Adrián Clavijo*
*Vertex Academy · Ecuador · 2026*
