import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Types defining the shape of a detective case. This context
 * centralises state so that components such as the evidence board or
 * interrogation interface can access and update the current case.
 */
export interface Suspect {
  id: string;
  name: string;
  description: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
}

export interface Case {
  id: string;
  description: string;
  suspects: Suspect[];
  evidence: EvidenceItem[];
}

interface CaseContextValue {
  currentCase: Case | null;
  setCurrentCase: (c: Case | null) => void;
}

const CaseContext = createContext<CaseContextValue | undefined>(undefined);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  return (
    <CaseContext.Provider value={{ currentCase, setCurrentCase }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
}
