/*
 * API endpoint for conducting interrogations with suspects.
 *
 * This endpoint accepts a POST request containing a `caseId`,
 * `suspectId` and the player's `message`. It retrieves the existing
 * conversation history from the memory manager, forwards the query
 * along with context to the Gemini client, stores the exchange and
 * returns the AI‑generated reply. The memory manager abstracts away
 * Firestore or whatever persistence layer you choose.
 */
import { NextResponse } from 'next/server';
import { chatWithSuspect } from '@/lib/gemini-client';
import { fetchHistory, appendMessage } from '@/lib/memory-manager';

export async function POST(request: Request) {
  try {
    const { caseId, suspectId, message } = await request.json();
    // Retrieve the existing conversation for this suspect in this case
    const history = await fetchHistory(caseId, suspectId);
    // Get a response from the AI using the provided history and message
    const aiReply = await chatWithSuspect({ caseId, suspectId, message, history });
    // Persist both the player's message and the AI reply
    await appendMessage(caseId, suspectId, { role: 'user', content: message });
    await appendMessage(caseId, suspectId, { role: 'ai', content: aiReply });
    return NextResponse.json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro na interrogatória' }, { status: 500 });
  }
}