import React from 'react';

/**
 * Displays a network of clues and relationships between pieces of
 * evidence. In a complete game this component would render an
 * interactive graph, allowing the player to drag and connect notes
 * representing suspects, alibis and clues. For now it acts as a
 * placeholder illustrating where such a board would appear.
 */
export interface Evidence {
  id: string;
  title: string;
  description: string;
}

interface EvidenceBoardProps {
  evidence: Evidence[];
}

export default function EvidenceBoard({ evidence }: EvidenceBoardProps) {
  return (
    <section className="mt-8 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">Quadro de evidências</h2>
      {evidence.length === 0 ? (
        <p className="text-gray-500">Nenhuma evidência registrada ainda.</p>
      ) : (
        <ul className="space-y-2">
          {evidence.map((item) => (
            <li key={item.id} className="p-2 border rounded">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}