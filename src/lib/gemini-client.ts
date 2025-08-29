/*
 * Gemini client module
 *
 * This module encapsulates interaction with the Gemini API. In a real
 * application you would configure your API key, construct prompts
 * using the templates defined in `prompt-templates.ts` and send
 * requests to the Gemini service. To keep this repository self‑contained
 * and non‑functional, the functions below return mock data.
 */

// Generate a pseudo‑random identifier for new cases. In practice,
// you would delegate ID creation to your database or backend.
function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export async function generateCase(themes: string | string[]) {
  const id = generateId();
  const description = Array.isArray(themes)
    ? `Caso envolvendo ${themes.join(', ')}`
    : `Caso envolvendo ${themes}`;
  return { id, description };
}

interface ChatRequest {
  caseId: string;
  suspectId: string;
  message: string;
  history: { role: string; content: string }[];
}

/**
 * Returns a simple echo response for interrogations. Replace this
 * implementation with calls to a language model using your prompts.
 */
export async function chatWithSuspect(req: ChatRequest): Promise<string> {
  return `Resposta simulada ao suspeito ${req.suspectId}: você disse "${req.message}".`;
}

interface AccusationRequest {
  caseId: string;
  suspectId: string;
  theory: string;
}

/**
 * Evaluates a player's accusation. Currently always returns a
 * placeholder verdict. In the future it would compare the theory
 * against a ground‑truth answer stored for the case.
 */
export async function evaluateAccusation({ caseId, suspectId, theory }: AccusationRequest) {
  // Pretend the suspect is guilty if the theory contains their ID
  const isGuilty = theory.toLowerCase().includes(suspectId.toLowerCase());
  return isGuilty
    ? `Parabéns! Sua teoria convenceu o tribunal. O suspeito ${suspectId} será condenado.`
    : `A teoria não se sustenta. O suspeito ${suspectId} foi considerado inocente.`;
}
