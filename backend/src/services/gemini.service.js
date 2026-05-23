// Minimal Gemini REST client. No SDK to keep deps small.
const BASE_PROMPT = `You are KYK's friendly companion AI. You help users discover places to meet
new people based on their interests, travel mode, and distance limits.
Be warm, concise, and human. Suggest concrete next steps.
When you know the user's location and nearby places, reference them by name to give specific, actionable suggestions.`;

function buildSystemPrompt(userContext) {
  if (!userContext) return BASE_PROMPT;

  let prompt = BASE_PROMPT + '\n\n--- USER CONTEXT ---';
  if (userContext.name) prompt += `\nUser's name: ${userContext.name}`;
  if (userContext.location) prompt += `\nUser's location: ${userContext.location}`;
  if (userContext.interests && userContext.interests.length) {
    prompt += `\nUser's interests: ${userContext.interests.join(', ')}`;
  }
  if (userContext.travelMode) prompt += `\nTravel mode: ${userContext.travelMode}`;
  if (userContext.maxDistance) prompt += `\nMax travel distance: ${userContext.maxDistance}km`;

  if (userContext.nearbyPlaces && userContext.nearbyPlaces.length) {
    prompt += '\n\nNearby places the user can visit:';
    for (const p of userContext.nearbyPlaces.slice(0, 10)) {
      prompt += `\n- ${p.name} (${p.category}, ${p.distance}km away`;
      if (p.travelTime) prompt += `, ~${p.travelTime}min`;
      prompt += ')';
    }
  }

  if (userContext.matches && userContext.matches.length) {
    prompt += '\n\nPeople the user is matched with:';
    for (const m of userContext.matches.slice(0, 5)) {
      prompt += `\n- ${m.name} (${m.compatibility}% compatible`;
      if (m.mutualInterests && m.mutualInterests.length) {
        prompt += `, shared interests: ${m.mutualInterests.join(', ')}`;
      }
      prompt += ')';
    }
  }

  prompt += '\n--- END CONTEXT ---';
  prompt += '\n\nUse this context to give personalized, specific suggestions. Reference actual places and people by name when relevant.';
  return prompt;
}

async function generateReply(history, userMessage, userContext = null) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const contents = [];
  for (const m of history.slice(-12)) {
    contents.push({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    });
  }
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const systemPrompt = buildSystemPrompt(userContext);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
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
