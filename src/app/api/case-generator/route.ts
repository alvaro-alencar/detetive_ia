/*
 * API endpoint responsible for creating procedural detective cases.
 *
 * Receives a JSON body with a `themes` field (an array or string) and
 * produces a skeleton case description. In a real implementation this
 * function would call the Gemini model via `gemini-client.ts` and
 * persist the result to a database. Here, it returns a simple
 * placeholder case with a randomly generated identifier.
 */
import { NextResponse } from 'next/server';
import { generateCase } from '@/lib/gemini-client';

export async function POST(request: Request) {
  try {
    const { themes } = await request.json();
    // Generate a fake case id and description using the gemini client
    const caseData = await generateCase(themes);
    return NextResponse.json({ success: true, case: caseData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Falha ao gerar o caso' }, { status: 500 });
  }
}