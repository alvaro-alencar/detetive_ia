import React, { useState } from 'react';

/**
 * Modal dialog prompting the player to commit to their final theory.
 *
 * The parent component controls its visibility via the `isOpen` prop
 * and handles submission through the `onSubmit` callback. It collects
 * the suspect identifier and a free‑form text description of the
 * player's reasoning. In a real application you might use a modal
 * library; here we implement a simple overlay for demonstration.
 */
interface AccusationModalProps {
  isOpen: boolean;
  suspects: { id: string; name: string }[];
  onCancel: () => void;
  onSubmit: (suspectId: string, theory: string) => Promise<void> | void;
}

export default function AccusationModal({ isOpen, suspects, onCancel, onSubmit }: AccusationModalProps) {
  const [suspectId, setSuspectId] = useState('');
  const [theory, setTheory] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await onSubmit(suspectId, theory);
    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Apresentar Acusação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="suspect" className="block font-medium mb-1">
              Suspeito
            </label>
            <select
              id="suspect"
              className="w-full border rounded px-3 py-2"
              value={suspectId}
              onChange={(e) => setSuspectId(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione um suspeito
              </option>
              {suspects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="theory" className="block font-medium mb-1">
              Sua teoria do crime
            </label>
            <textarea
              id="theory"
              className="w-full border rounded px-3 py-2"
              value={theory}
              onChange={(e) => setTheory(e.target.value)}
              rows={4}
              placeholder="Descreva como o crime ocorreu e por quê este suspeito é o culpado"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Acusar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}