/*
 * API endpoint for lodging a final accusation against a suspect.
 *
 * Receives a POST request with `caseId`, `suspectId` and the
 * player's `theory`, representing the explanation of how the crime
 * occurred. In a production environment this route would call a
 * Gemini model to determine the plausibility of the theory, compare
 * it against the hidden truth stored in the case, and return a
 * verdict. Here we return a dummy response for demonstration.
 */
import { NextResponse } from 'next/server';
import { evaluateAccusation } from '@/lib/gemini-client';
import { concludeCase } from '@/lib/memory-manager';

export async function POST(request: Request) {
  try {
    const { caseId, suspectId, theory } = await request.json();
    // Ask the AI to evaluate the player's theory. In a real game
    // implementation this would compare against the canonical answer.
    const verdict = await evaluateAccusation({ caseId, suspectId, theory });
    // Mark the case as concluded and store the outcome
    await concludeCase(caseId, verdict);
    return NextResponse.json({ verdict });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao processar acusação' }, { status: 500 });
  }
}