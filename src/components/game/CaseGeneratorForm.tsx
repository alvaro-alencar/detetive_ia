import React, { useState } from 'react';

/**
 * Form component that collects a set of themes or ideas from the
 * player and submits them to the case‑generator API. On success it
 * displays a summary of the created case along with its ID. This
 * component is deliberately simple to demonstrate the flow between
 * client and server in the app router.
 */
export default function CaseGeneratorForm() {
  const [themes, setThemes] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ id?: string; description?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/api/case-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themes }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.case);
      } else {
        setError(data.error || 'Não foi possível gerar o caso.');
      }
    } catch (err) {
      setError('Erro na comunicação com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="themes" className="block font-medium mb-1">
            Tema(s) do caso
          </label>
          <input
            id="themes"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={themes}
            onChange={(e) => setThemes(e.target.value)}
            placeholder="Ex.: crime passional, roubo de banco..."
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Gerando...' : 'Gerar caso'}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-bold mb-2">Caso Gerado</h2>
          <p>
            <strong>ID:</strong> {result.id}
          </p>
          <p className="mt-2">
            <strong>Descrição:</strong> {result.description}
          </p>
        </div>
      )}
    </div>
  );
}