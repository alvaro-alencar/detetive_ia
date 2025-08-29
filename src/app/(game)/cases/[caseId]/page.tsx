import React from 'react';

/**
 * Dynamic page to display an investigation in progress.
 *
 * The `caseId` parameter is extracted from the URL. This page can
 * fetch case details client‑side or server‑side and render them.
 * For now, it displays the identifier as a placeholder. In a full
 * implementation, this page would orchestrate the evidence board,
 * interrogation interface and the accusation modal.
 */
interface CasePageProps {
  params: { caseId: string };
}

export default function CasePage({ params }: CasePageProps) {
  const { caseId } = params;
  return (
    <main className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Investigação</h1>
      <p className="mb-2">
        Você está investigando o caso com ID:
        <span className="font-mono ml-2">{caseId}</span>
      </p>
      <p>
        Esta página ainda é um esqueleto. Aqui serão exibidos o quadro de
        evidências, o histórico das interrogatórias e o botão para fazer a
        acusação final.
      </p>
    </main>
  );
}