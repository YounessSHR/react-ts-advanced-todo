// src/types/index.ts

// Types pour la gestion des tâches
export type Priority = 'Low' | 'Medium' | 'High';
export type Filter = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number; // Timestamp (Date.now())
  dueDate?: number | null; // Timestamp ou null
  priority: Priority;
}

// Types pour le tri
export type SortBy = 'createdAt' | 'dueDate' | 'priority';
export type SortDirection = 'asc' | 'desc';

// Types pour les actions du reducer (bonne pratique de les centraliser)
export type Action =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: { text: string; priority: Priority; dueDate: number | null } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string; priority: Priority; dueDate: number | null } }
  | { type: 'CLEAR_COMPLETED' };