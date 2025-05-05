// src/utils/sortUtils.ts
// src/utils/sortUtils.ts

import type { SortBy, SortDirection, Priority, Todo } from '../types';

// Fonction pour obtenir la valeur numérique de la priorité pour le tri
const getPriorityValue = (priority: Priority): number => {
  switch (priority) {
    case 'High': return 3;
    case 'Medium': return 2;
    case 'Low': return 1;
    default: return 0; // Au cas où
  }
};

export const sortTodos = (todos: Todo[], sortBy: SortBy, sortDirection: SortDirection): Todo[] => {
  // Crée une copie pour ne pas muter le state original
  const sortedTodos = [...todos];

  sortedTodos.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'createdAt':
        // Tri par date de création (timestamp)
        comparison = a.createdAt - b.createdAt;
        break;
      case 'dueDate':
        // Tri par date d'échéance, en gérant les null et undefined
        if ((a.dueDate === null || a.dueDate === undefined) && (b.dueDate === null || b.dueDate === undefined)) {
          comparison = 0; // Les deux sont null ou undefined, égalité
        } else if (a.dueDate === null || a.dueDate === undefined) {
          comparison = 1; // null ou undefined est considéré comme "plus grand" (va à la fin en asc)
        } else if (b.dueDate === null || b.dueDate === undefined) {
          comparison = -1; // null ou undefined est considéré comme "plus grand" (a va avant en asc)
        } else {
          comparison = a.dueDate - b.dueDate; // Tri normal des timestamps
        }
        break;
      case 'priority':
        // Tri par priorité (basé sur la valeur numérique)
        comparison = getPriorityValue(a.priority) - getPriorityValue(b.priority);
        break;
      default:
        // Ne devrait pas arriver avec TypeScript, mais pour la robustesse
        comparison = 0;
    }

    // Applique la direction du tri
    // Si desc, on inverse la comparaison (sauf si c'est 0)
    return sortDirection === 'desc' ? comparison * -1 : comparison;
  });

  return sortedTodos;
};
