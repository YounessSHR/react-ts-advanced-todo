// src/components/AddTodoForm/AddTodoForm.tsx
import React, { useState } from 'react';
import type { Priority } from '../../types';
import styles from './AddTodoForm.module.css';

interface AddTodoFormProps {
  onAddTodo: (text: string, priority: Priority, dueDate: number | null) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium'); // Défaut
  const [dueDate, setDueDate] = useState<string>(''); // Input date renvoie string yyyy-MM-dd

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
       alert("Veuillez entrer le texte de la tâche."); // Simple validation
       return;
    };

    // Convertir la date string en timestamp ou null avant d'envoyer
    const dueDateTimestamp = dueDate ? new Date(dueDate).getTime() : null;

    onAddTodo(text, priority, dueDateTimestamp);

    // Réinitialiser le formulaire
    setText('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addForm} aria-label="Formulaire d'ajout de tâche">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter une nouvelle tâche..."
        className={styles.input}
        required // Validation HTML simple
        aria-label="Texte de la nouvelle tâche"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className={styles.select}
        aria-label="Priorité de la tâche"
      >
        <option value="Low">Faible</option>
        <option value="Medium">Moyenne</option>
        <option value="High">Haute</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={styles.inputDate}
        aria-label="Date d'échéance"
      />
      <button type="submit" className={styles.button}>Ajouter</button>
    </form>
  );
};

export default AddTodoForm;