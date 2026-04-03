-- VERTEX OS v4 DATABASE SCHEMA
-- Ejecuta esto en Supabase SQL Editor

-- Table: leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  origen VARCHAR(50) NOT NULL CHECK (origen IN ('whatsapp', 'ads', 'manual', 'email')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('nuevo', 'contactado', 'interesado', 'venta', 'descartado')),
  monto DECIMAL(10, 2),
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  anotaciones TEXT,
  campana_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  presupuesto DECIMAL(10, 2) NOT NULL,
  canal VARCHAR(50) NOT NULL CHECK (canal IN ('meta', 'email', 'whatsapp', 'manual')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('borrador', 'activo', 'pausado', 'finalizado')),
  fecha_inicio TIMESTAMP DEFAULT NOW(),
  fecha_fin TIMESTAMP,
  leads_generados INT DEFAULT 0,
  conversiones INT DEFAULT 0,
  gasto_real DECIMAL(10, 2) DEFAULT 0,
  cpl DECIMAL(10, 2),
  roi DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: analytics
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha DATE NOT NULL,
  leads INT DEFAULT 0,
  conversiones INT DEFAULT 0,
  gasto DECIMAL(10, 2) DEFAULT 0,
  ingresos DECIMAL(10, 2) DEFAULT 0,
  cpl DECIMAL(10, 2),
  roi DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: creativos
CREATE TABLE creativos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('imagen', 'video', 'carrusel', 'texto')),
  url_preview TEXT,
  prompt_generado TEXT,
  performance_impressiones INT DEFAULT 0,
  performance_clicks INT DEFAULT 0,
  performance_ctr DECIMAL(10, 2),
  performance_conversiones INT DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: meta_ads_drafts
CREATE TABLE meta_ads_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  headline VARCHAR(255),
  body_text TEXT,
  call_to_action VARCHAR(100),
  creative_id UUID REFERENCES creativos(id) ON DELETE SET NULL,
  campana_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  meta_ad_id VARCHAR(255),
  meta_response JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_origen ON leads(origen);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_analytics_fecha ON analytics(fecha);
CREATE INDEX idx_creativos_tipo ON creativos(tipo);

-- Row Level Security (opcional pero recomendado)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE creativos ENABLE ROW LEVEL SECURITY;
ALTER TABLE meta_ads_drafts ENABLE ROW LEVEL SECURITY;

-- Básicamente: cualquier usuario autenticado puede ver/editar todo
-- Para producción, crea políticas más granulares

CREATE POLICY "Leads are accessible to authenticated users" 
  ON leads FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Campaigns are accessible to authenticated users" 
  ON campaigns FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Analytics are accessible to authenticated users" 
  ON analytics FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Creativos are accessible to authenticated users" 
  ON creativos FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Meta ads drafts are accessible to authenticated users" 
  ON meta_ads_drafts FOR ALL 
  USING (auth.role() = 'authenticated');
