// src/components/SortControls/SortControls.tsx
import React from 'react';
import type { SortBy, SortDirection } from '../../types';
import styles from './SortControls.module.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Icônes pour direction

interface SortControlsProps {
  sortBy: SortBy;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortBy, sortDirection: SortDirection) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortBy, sortDirection, onSortChange }) => {

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortBy, sortDirection);
  };

  // Inverse la direction actuelle
  const toggleDirection = () => {
    onSortChange(sortBy, sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={styles.sortControls} role="group" aria-label="Options de tri">
      <label htmlFor="sortBySelect" className={styles.label}>Trier par :</label>
      <select
        id="sortBySelect"
        value={sortBy}
        onChange={handleSortByChange}
        className={styles.select}
      >
        {/* Utiliser des textes plus clairs */}
        <option value="createdAt">Création</option>
        <option value="dueDate">Échéance</option>
        <option value="priority">Priorité</option>
      </select>
      <button
        onClick={toggleDirection}
        className={styles.directionButton}
        aria-label={`Changer la direction du tri, actuellement ${sortDirection === 'asc' ? 'ascendant' : 'descendant'}`}
        title={`Direction actuelle: ${sortDirection === 'asc' ? 'Ascendant' : 'Descendant'}`}
      >
        {/* Afficher l'icône correspondant à la direction actuelle */}
        {sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
      </button>
    </div>
  );
};

export default SortControls;