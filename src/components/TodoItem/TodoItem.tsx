// src/components/TodoItem/TodoItem.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { Todo, Priority } from '../../types';
import styles from './TodoItem.module.css';
import { FaTrash, FaEdit, FaSave, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa'; // Ajouter icônes
import { format, isPast, isValid } from 'date-fns';
import { fr } from 'date-fns/locale'; // Pour format français

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void; // Handler pour cocher/décocher
  onDelete: (id: string) => void; // Handler pour supprimer
  onEdit: (id: string, text: string, priority: Priority, dueDate: number | null) => void; // Handler pour sauvegarder l'édition
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  // États locaux pour les valeurs pendant l'édition
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  // Gérer la date comme string 'yyyy-MM-dd' pour l'input type="date"
  const [editDueDate, setEditDueDate] = useState<string>(() => {
      try {
          return todo.dueDate && isValid(new Date(todo.dueDate))
                 ? format(new Date(todo.dueDate), 'yyyy-MM-dd')
                 : '';
      } catch { return ''; } // Gestion d'erreur si la date n'est pas valide
  });

  const editInputRef = useRef<HTMLInputElement>(null); // Référence pour focus sur l'input d'édition

  // Met le focus sur l'input texte quand on entre en mode édition
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select(); // Sélectionne le texte pour modification facile
    }
  }, [isEditing]);

  // --- Handlers pour le mode édition ---
  const handleSave = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      // Si le texte est vide après trim, on supprime la tâche
      // (Comportement choisi, pourrait aussi annuler ou alerter)
      console.warn(`Tâche "${todo.text}" supprimée car le texte édité est vide.`);
      onDelete(todo.id);
      // Pas besoin de setIsEditing(false) car le composant va disparaître
      return;
    }
    // Convertir la string 'yyyy-MM-dd' en timestamp ou null
    const dueDateTimestamp = editDueDate ? new Date(editDueDate).getTime() : null;
    onEdit(todo.id, trimmedText, editPriority, dueDateTimestamp);
    setIsEditing(false); // Sortir du mode édition
  };

  const handleCancelEdit = () => {
    // Restaurer les valeurs initiales
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate && isValid(new Date(todo.dueDate)) ? format(new Date(todo.dueDate), 'yyyy-MM-dd') : '');
    setIsEditing(false); // Sortir du mode édition
  };

  // Gérer les touches Enter (sauvegarder) et Escape (annuler) dans les champs d'édition
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // --- Calculs pour l'affichage ---
  const isOverdue = !todo.completed && todo.dueDate && isValid(new Date(todo.dueDate)) && isPast(new Date(todo.dueDate));

  // Construction des classes CSS conditionnelles pour le <li>
  const itemClasses = [
    styles.todoItem,
    todo.completed ? styles.completed : '',
    styles[`priority${todo.priority}`], // Classe basée sur la priorité (ex: priorityHigh)
    isOverdue ? styles.overdue : '', // Classe si en retard
    isEditing ? styles.editing : '' // Classe si en mode édition
  ].filter(Boolean).join(' '); // filter(Boolean) enlève les chaînes vides

  // --- Rendu ---
  return (
    <li className={itemClasses}>
      {isEditing ? (
        // --- Mode Édition ---
        <>
          {/* Input Text */}
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
            aria-label="Modifier le texte de la tâche"
          />
          {/* Select Priorité */}
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            onKeyDown={handleKeyDown} // Permet aussi Echap/Enter ici
            className={styles.editSelect}
            aria-label="Modifier la priorité"
          >
            <option value="Low">Faible</option>
            <option value="Medium">Moyenne</option>
            <option value="High">Haute</option>
          </select>
          {/* Input Date */}
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.editDate}
            aria-label="Modifier la date d'échéance"
          />
          {/* Boutons Sauver/Annuler */}
          <button onClick={handleSave} className={styles.actionButton + ' ' + styles.saveButton} aria-label="Sauvegarder les modifications">
            <FaSave />
          </button>
          <button onClick={handleCancelEdit} className={styles.actionButton + ' ' + styles.cancelButton} aria-label="Annuler les modifications">
            X
          </button>
        </>
      ) : (
        // --- Mode Lecture ---
        <>
          {/* Checkbox */}
          <input
            type="checkbox"
            id={`todo-${todo.id}`} // ID unique pour le label
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className={styles.checkbox}
            aria-labelledby={`text-${todo.id}`} // Lie au texte pour accessibilité
          />
          {/* Texte de la tâche */}
          <label htmlFor={`todo-${todo.id}`} id={`text-${todo.id}`} className={styles.text}>
            {todo.text}
          </label>
          {/* Badge Priorité */}
          <span className={styles.priorityBadge} title={`Priorité ${todo.priority}`}>{todo.priority.charAt(0)}</span> {/* Juste initiale */}

          {/* Date d'échéance */}
          {todo.dueDate && isValid(new Date(todo.dueDate)) && (
            <span className={styles.dueDate} title={`Échéance: ${format(new Date(todo.dueDate), 'PPPP', { locale: fr })}`}>
              <FaCalendarAlt /> {format(new Date(todo.dueDate), 'dd/MM/yy', { locale: fr })}
              {isOverdue && <FaExclamationCircle className={styles.overdueIcon} title="En retard!" />}
            </span>
          )}
          {/* Boutons Modifier/Supprimer */}
          <button onClick={() => setIsEditing(true)} className={styles.actionButton + ' ' + styles.editButton} aria-label={`Modifier la tâche ${todo.text}`}>
            <FaEdit />
          </button>
          <button onClick={() => onDelete(todo.id)} className={styles.actionButton + ' ' + styles.deleteButton} aria-label={`Supprimer la tâche ${todo.text}`}>
            <FaTrash />
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;