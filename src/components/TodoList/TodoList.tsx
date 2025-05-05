// src/components/TodoList/TodoList.tsx
import React from 'react';
import type { Todo, Priority } from '../../types';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

// Les props nécessaires pour interagir avec les TodoItems
interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, text: string, priority: Priority, dueDate: number | null) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    // Optionnel: Afficher un message spécifique si la liste filtrée est vide
    // return <p className={styles.emptyListMessage}>Aucune tâche à afficher avec ces filtres.</p>;
    // Pour l'instant, on laisse App.tsx gérer le message global "Aucune tâche"
    return null;
  }

  return (
    <ul className={styles.todoList} aria-label="Liste des tâches">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // Key est essentielle pour React lors du mapping
          todo={todo}
          onToggle={onToggleTodo} // Passer les handlers en props
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;