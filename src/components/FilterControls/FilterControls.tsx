// src/components/FilterControls/FilterControls.tsx
import React from 'react';
import type { Filter } from '../../types';
import styles from './FilterControls.module.css';

interface FilterControlsProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  activeCount: number;
  onClearCompleted: () => void;
  hasCompletedTodos: boolean; // Pour désactiver le bouton "Nettoyer" si pas de tâches terminées
}

const FilterControls: React.FC<FilterControlsProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  onClearCompleted,
  hasCompletedTodos // Recevoir cette information
}) => {
  return (
    <div className={styles.filterControls}>
      <span className={styles.activeCount} aria-live="polite">
        {activeCount} {activeCount <= 1 ? 'tâche restante' : 'tâches restantes'}
      </span>
      <div className={styles.filters} role="group" aria-label="Filtres des tâches">
        <button
          onClick={() => onFilterChange('all')}
          className={currentFilter === 'all' ? styles.active : ''}
          aria-pressed={currentFilter === 'all'} // Pour accessibilité
        >
          Toutes
        </button>
        <button
          onClick={() => onFilterChange('active')}
          className={currentFilter === 'active' ? styles.active : ''}
          aria-pressed={currentFilter === 'active'}
        >
          Actives
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={currentFilter === 'completed' ? styles.active : ''}
          aria-pressed={currentFilter === 'completed'}
        >
          Terminées
        </button>
      </div>
      <button
        onClick={onClearCompleted}
        className={styles.clearButton}
        disabled={!hasCompletedTodos} // Désactiver si pas de tâches terminées
        aria-disabled={!hasCompletedTodos}
      >
        Nettoyer terminées
      </button>
    </div>
  );
};

export default FilterControls;