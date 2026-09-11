'use client';

import React, { useState } from 'react';
import { TargetProfile, QuantecSession } from '../src/types/quantec';
import { generateQuantecReport } from '../src/utils/quantecEngine';
import { AnamnesisForm } from '../src/components/AnamnesisForm';
import { ReportView } from '../src/components/ReportView';
import { EmissionPlayer } from '../src/components/EmissionPlayer';
import { HistoryPanel } from '../src/components/HistoryPanel';

export default function Home() {
  const [viewMode, setViewMode] = useState<'FORM' | 'REPORT' | 'HISTORY'>('FORM');
  const [currentSession, setCurrentSession] = useState<QuantecSession | null>(null);
  const [isEmitting, setIsEmitting] = useState(false);

  const handleFormSubmit = (target: TargetProfile) => {
    const newSession = generateQuantecReport(target);
    setCurrentSession(newSession);
    setViewMode('REPORT');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white relative flex flex-col items-center justify-center p-4">
      {/* Menu Superior */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => setViewMode('FORM')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            viewMode === 'FORM'
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Nova Anamnese
        </button>
        <button
          onClick={() => setViewMode('HISTORY')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            viewMode === 'HISTORY'
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Histórico
        </button>
      </div>

      {/* Renderização das Telas */}
      {viewMode === 'FORM' && (
        <AnamnesisForm onSubmit={handleFormSubmit} />
      )}

      {viewMode === 'REPORT' && currentSession && (
        <ReportView
          session={currentSession}
          onStartEmission={() => setIsEmitting(true)}
          onBack={() => setViewMode('FORM')}
        />
      )}

      {viewMode === 'HISTORY' && (
        <HistoryPanel
          onSelectSession={(session) => {
            setCurrentSession(session);
            setViewMode('REPORT');
          }}
        />
      )}

      {isEmitting && currentSession && (
        <EmissionPlayer
          session={currentSession}
          onClose={() => setIsEmitting(false)}
        />
      )}
    </main>
  );
}