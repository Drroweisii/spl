import React from 'react';
import { GameState } from '../../../types/game';
import { ModernGameBoard } from './ModernGameBoard';
import { ModernGameStats } from './ModernGameStats';
import { ModernControls } from './ModernControls';
import { useGameState } from '../../../hooks/useGameState';

interface ModernGameLayoutProps {
  gameState: GameState;
}

export function ModernGameLayout({ gameState }: ModernGameLayoutProps) {
  const { 
    hireWorker, 
    handleWorkerClick,
    removeWorker,
    unlockSlot,
    canHireWorker,
    selectedWorkerId,
    canMergeWorkers,
  } = useGameState();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ModernGameBoard
          gridState={gameState.gridState}
          workers={gameState.workers}
          onCellClick={(pos) => {
            const worker = gameState.workers.find(w => w.position === pos);
            handleWorkerClick(worker?.id || '', pos);
          }}
          onRemoveWorker={removeWorker}
          onUnlockSlot={unlockSlot}
          balance={gameState.balances.emsx}
          selectedWorkerId={selectedWorkerId}
          canMergeWorkers={canMergeWorkers}
          unlockedSlots={gameState.unlockedSlots}
        />
      </div>
      <div className="space-y-6">
        <ModernGameStats gameState={gameState} />
        <ModernControls
          gameState={gameState}
          onHire={hireWorker}
          canHireWorker={canHireWorker}
        />
      </div>
    </div>
  );
}