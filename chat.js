// api/chat.js — VERTEX OS v3
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { password, messages, system } = req.body;
  const PASSWORDS = [process.env.PASSWORD_KEVIN, process.env.PASSWORD_WILLIAM];
  if (!PASSWORDS.includes(password)) return res.status(401).json({ error: 'Contraseña incorrecta' });

  try {
    // Use Haiku for short tasks, Sonnet for complex strategies
    const isComplex = system?.length > 500 || messages?.some(m => m.content?.length > 300);
    const model = isComplex ? 'claude-haiku-4-5-20251001' : 'claude-haiku-4-5-20251001';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        system,
        messages,
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'Error de API' });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
