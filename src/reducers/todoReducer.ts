// src/reducers/todoReducer.ts
import { v4 as uuidv4 } from 'uuid';
import type { Todo, Action } from '../types';

export function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'SET_TODOS':
      // Utilisé pour charger l'état initial depuis localStorage
      return action.payload;

    case 'ADD_TODO':
      { const newTodo: Todo = {
        id: uuidv4(),
        text: action.payload.text,
        completed: false,
        createdAt: Date.now(),
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
      };
      return [...state, newTodo]; }

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);

    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              priority: action.payload.priority,
              dueDate: action.payload.dueDate,
            }
          : todo
      );

    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);

    default:
      // Pour les actions non reconnues, retourne l'état inchangé
      // Cela est utile si le type Action devient une union plus large
      // ou pour la robustesse générale.
      return state;
  }
}
