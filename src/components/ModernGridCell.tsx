import React from 'react';
import { GridCell, Worker } from '../../../types/game';
import { ModernWorker } from './ModernWorker';
import { Lock } from 'lucide-react';

interface ModernGridCellProps {
  cell: GridCell;
  worker?: Worker;
  onClick: () => void;
  balance: number;
  isSelected?: boolean;
  canMerge?: boolean;
  isValidMove?: boolean;
  isLocked: boolean;
  onUnlock: () => void;
  unlockCost: number;
}

export function ModernGridCell({
  cell,
  worker,
  onClick,
  balance,
  isSelected,
  canMerge,
  isValidMove,
  isLocked,
  onUnlock,
  unlockCost,
}: ModernGridCellProps) {
  if (isLocked) {
    return (
      <div
        onClick={balance >= unlockCost ? onUnlock : undefined}
        className={`
          aspect-square rounded-2xl border border-white/10
          flex flex-col items-center justify-center gap-2
          ${balance >= unlockCost 
            ? 'bg-purple-500/10 hover:bg-purple-500/20 cursor-pointer' 
            : 'bg-white/5 cursor-not-allowed opacity-50'}
          transition-all duration-200
        `}
      >
        <Lock className="w-6 h-6 text-purple-400" />
        <span className="text-sm text-purple-300">{unlockCost} EMSX</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`
        aspect-square rounded-2xl border
        transition-all duration-200
        ${worker 
          ? 'bg-white/5 border-white/10' 
          : isValidMove
            ? 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20'
            : 'bg-white/5 border-white/10 hover:bg-white/10'}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${canMerge ? 'ring-2 ring-green-500' : ''}
        cursor-pointer
        overflow-hidden
      `}
    >
      {worker ? (
        <ModernWorker
          worker={worker}
          onClick={onClick}
          balance={balance}
          isSelected={isSelected}
          canMerge={canMerge}
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          {isValidMove ? (
            <div className="text-blue-400 animate-pulse">
              <div className="text-2xl">⟶</div>
            </div>
          ) : (
            <span className="text-white/20 text-2xl">+</span>
          )}
        </div>
      )}
    </div>
  );
}