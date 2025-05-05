// src/App.tsx
import { useReducer, useState, useEffect, useMemo } from 'react';
import type { Filter, Priority, SortBy, SortDirection } from './types';
import { todoReducer } from './reducers/todoReducer';
import { sortTodos } from './utils/sortUtils';

import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import TodoList from './components/TodoList/TodoList';
import FilterControls from './components/FilterControls/FilterControls';
import SortControls from './components/SortControls/SortControls';

import styles from './App.module.css';

const LOCAL_STORAGE_KEY = 'todos_react_ts_advanced';

function App() {
  // Utilisation de useReducer pour gérer l'état complexe des todos
  const [todos, dispatch] = useReducer(todoReducer, [], (initial) => {
    // Fonction Initializer pour charger depuis localStorage UNE SEULE FOIS au montage
    try {
      const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : initial;
    } catch (error) {
      console.error("Erreur chargement localStorage:", error);
      return initial; // Retourner l'état initial en cas d'erreur
    }
  });

  // États locaux pour le filtre et le tri
  const [filter, setFilter] = useState<Filter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Sauvegarder dans localStorage à chaque modification des todos
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Erreur sauvegarde localStorage:", error);
    }
  }, [todos]);

  // --- Handlers pour les actions ---
  const handleAddTodo = (text: string, priority: Priority, dueDate: number | null) => {
    if (!text.trim()) return; // Éviter les tâches vides
    dispatch({ type: 'ADD_TODO', payload: { text, priority, dueDate } });
  };

  const handleToggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  const handleEditTodo = (id: string, text: string, priority: Priority, dueDate: number | null) => {
    if (!text.trim()) {
       console.warn("Tentative de sauvegarde d'une tâche vide, suppression implicite");
       handleDeleteTodo(id); // Ou annuler l'édition, comportement à choisir
       return;
    }
    dispatch({ type: 'EDIT_TODO', payload: { id, text, priority, dueDate } });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const handleSortChange = (newSortBy: SortBy, newDirection: SortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  // --- Calculs dérivés avec useMemo pour l'optimisation ---

  // Calculer le nombre de tâches actives
  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  // Filtrer ET trier la liste des tâches à afficher
  const filteredAndSortedTodos = useMemo(() => {
    // 1. Filtrage
    const filtered = todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true; // 'all'
    });

    // 2. Tri (en utilisant l'utilitaire)
    return sortTodos(filtered, sortBy, sortDirection);

  }, [todos, filter, sortBy, sortDirection]); // Recalculer si une de ces dépendances change

  // --- Rendu du composant ---
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1>Ma To-Do List Avancée</h1>
      </header>

      <main>
        <AddTodoForm onAddTodo={handleAddTodo} />

        {/* Conteneur pour les contrôles (filtre + tri) */}
        {todos.length > 0 && ( // N'afficher les contrôles que s'il y a des tâches
           <div className={styles.controlsContainer}>
             <FilterControls
              currentFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              onClearCompleted={handleClearCompleted}
              hasCompletedTodos={todos.some(todo => todo.completed)}
             />
             <SortControls
               sortBy={sortBy}
               sortDirection={sortDirection}
               onSortChange={handleSortChange}
             />
           </div>
        )}

        {/* Liste des tâches */}
        <TodoList
          todos={filteredAndSortedTodos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
        />
         {todos.length === 0 && ( // Message si aucune tâche
             <p className={styles.noTodosMessage}>Aucune tâche pour le moment !</p>
         )}
      </main>

       <footer className={styles.footer}>
            <p>Projet React + TypeScript - {new Date().getFullYear()}</p>
        </footer>
    </div>
  );
}

export default App;