import React from 'react';
import CaseGeneratorForm from '@/components/game/CaseGeneratorForm';

/**
 * Page for generating a brand‑new procedural case.
 *
 * This component renders a heading and a form that allows the
 * player to provide seeds or themes for a new detective case.
 * The form component is responsible for collecting user input
 * and invoking the case‑generator API endpoint.
 */
export default function NewCasePage() {
  return (
    <main className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Gerar novo caso</h1>
      <p className="mb-6">
        Descreva um tema ou cenário para o crime e deixe a IA criar um
        mistério único para você desvendar.
      </p>
      <CaseGeneratorForm />
    </main>
  );
}