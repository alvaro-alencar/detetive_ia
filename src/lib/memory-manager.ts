/*
 * In‑memory conversation and state manager.
 *
 * This module would ordinarily interface with a database such as
 * Firestore to persist conversation history and case outcomes. To keep
 * this starter project self‑contained, we use a simple Map to store
 * information in memory. Note that this storage will reset when the
 * server restarts.
 */

type Message = { role: string; content: string };

// Map keyed by `caseId:suspectId` storing conversation history
const conversations: Map<string, Message[]> = new Map();

// Map keyed by caseId storing final verdicts
const caseOutcomes: Map<string, string> = new Map();

function key(caseId: string, suspectId: string) {
  return `${caseId}:${suspectId}`;
}

/**
 * Returns the conversation history between the player and a suspect.
 */
export async function fetchHistory(caseId: string, suspectId: string): Promise<Message[]> {
  return conversations.get(key(caseId, suspectId)) ?? [];
}

/**
 * Appends a message to the conversation history. Messages should
 * specify a `role` (e.g., "user" or "ai") and textual `content`.
 */
export async function appendMessage(caseId: string, suspectId: string, message: Message): Promise<void> {
  const k = key(caseId, suspectId);
  const history = conversations.get(k) ?? [];
  history.push(message);
  conversations.set(k, history);
}

/**
 * Stores the outcome of a concluded case. A real implementation would
 * write this to a database and perhaps trigger side‑effects such as
 * awarding points to the player.
 */
export async function concludeCase(caseId: string, verdict: string): Promise<void> {
  caseOutcomes.set(caseId, verdict);
}

/**
 * Retrieves the stored verdict for a given case, if any.
 */
export async function getCaseOutcome(caseId: string): Promise<string | undefined> {
  return caseOutcomes.get(caseId);
}
