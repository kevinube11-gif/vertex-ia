// api/chat.js
// Este archivo corre en el servidor (Vercel) — tu API key nunca llega al navegador.

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Verificar contraseña de acceso
  const { password, messages, system } = req.body;

  const PASSWORDS = [
    process.env.PASSWORD_KEVIN,
    process.env.PASSWORD_WILLIAM,
  ];

  if (!PASSWORDS.includes(password)) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  // Llamar a la API de Anthropic con tu API key (guardada como variable de entorno segura)
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: system,
        messages: messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Error de API' });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
