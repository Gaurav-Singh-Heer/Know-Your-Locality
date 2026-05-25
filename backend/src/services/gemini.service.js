// Minimal Gemini REST client. No SDK to keep deps small.
const SYSTEM_PROMPT = `You are KYK's friendly companion AI. You help users discover places to meet
new people based on their interests, travel mode, and distance limits.
Be warm, concise, and human. Suggest concrete next steps.`;

async function generateReply(history, userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const contents = [];
  for (const m of history.slice(-12)) {
    contents.push({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    });
  }
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { role: 'system', parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const reply =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
    "Sorry, I couldn't think of a reply.";
  return reply.trim();
}

module.exports = { generateReply };
