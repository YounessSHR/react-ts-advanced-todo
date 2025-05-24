# React TS Advanced To-Do List

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![CSS Modules](https://img.shields.io/badge/CSS%20Modules-grey?style=for-the-badge)

A feature-rich To-Do List application built with React, TypeScript, and Vite, focusing on modern frontend practices and a clean user experience. This project was developed as part of the 1st Year Computer Engineering Cycle at ENSA Berrechid.

## Features ✨

*   **CRUD Operations:** Create, Read, Update (Toggle Complete, Edit Text/Priority/Date), and Delete tasks.
*   **Persistence:** Tasks are saved to the browser's Local Storage, so they aren't lost on refresh.
*   **Filtering:** Filter tasks by status (All / Active / Completed).
*   **Sorting:** Sort tasks by Creation Date, Due Date, or Priority (Ascending/Descending).
*   **Priorities:** Assign Low, Medium, or High priority to tasks with visual indicators.
*   **Due Dates:** Set optional due dates for tasks, with visual indication for overdue items.
*   **Task Count:** Displays the number of active tasks remaining.
*   **Clear Completed:** Button to easily remove all finished tasks.
*   **Responsive Design:** Adapts to different screen sizes (Desktop, Tablet, Mobile).
*   **TypeScript:** Strongly typed codebase for better maintainability and fewer runtime errors.
*   **CSS Modules:** Scoped CSS for component styling without class name conflicts.

## Tech Stack 🛠️

*   **Framework/Library:** React 18+
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** CSS Modules
*   **State Management:** React Hooks (`useReducer`, `useState`, `useMemo`)
*   **Unique IDs:** `uuid`
*   **Date Handling:** `date-fns`
*   **Icons:** `react-icons`

## Project Setup & Installation ⚙️

Follow these steps to get the project running locally:

**Prerequisites:**

*   Node.js (v18 or later recommended)
*   npm (usually comes with Node.js) or yarn
*   Git

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YounessSHR/react-ts-advanced-todo.git
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd react-ts-advanced-todo
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or if you prefer yarn:
    # yarn install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```

5.  **Open your browser:**
    Navigate to the local URL provided by Vite (usually `http://localhost:5173` or similar).

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode with hot reloading.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the codebase using ESLint (if configured).
*   `npm run preview`: Serves the production build locally for testing.

## Project Structure 📂

```plaintext
react-ts-advanced-todo/
├── public/                   # Static assets (served directly)
│   └── vite.svg             # Example public asset
├── src/                     # Main source code folder
│   ├── App.module.css       # CSS Modules for App component
│   ├── App.tsx              # Main application component (layout, state logic)
│   ├── main.tsx             # Application entry point (renders App)
│   ├── components/          # Reusable React UI components
│   │   ├── AddTodoForm/
│   │   │   ├── AddTodoForm.module.css
│   │   │   └── AddTodoForm.tsx
│   │   ├── FilterControls/
│   │   │   ├── FilterControls.module.css
│   │   │   └── FilterControls.tsx
│   │   ├── SortControls/
│   │   │   ├── SortControls.module.css
│   │   │   └── SortControls.tsx
│   │   ├── TodoItem/
│   │   │   ├── TodoItem.module.css
│   │   │   └── TodoItem.tsx
│   │   └── TodoList/
│   │       ├── TodoList.module.css
│   │       └── TodoList.tsx
│   ├── reducers/            # useReducer logic
│   │   └── todoReducer.ts
│   ├── types/               # TypeScript types/interfaces
│   │   └── index.ts
│   └── utils/               # Utility functions
│       ├── dateUtils.ts
│       └── sortUtils.ts
```

## Future Enhancements (Possible Evolutions) 🚀

*   Backend Integration (Node.js, etc.) for database storage and user accounts.
*   User Authentication.
*   Real-time updates (WebSockets).
*   Drag and Drop reordering.
*   Subtasks.
*   Tags/Categories.
*   Reminders/Notifications.
*   Unit and Integration Testing (Jest, React Testing Library).

## Authors ✒️

*   **SAHRAOUI Youness** - [YounessSHR](https://github.com/YounessSHR)
*   **TOUMI Sif Eddine** - [sifeddineftoumi](https://github.com/sifeddineftoumi)

## Acknowledgements 🙏

*   **Pr. AITBACHIR Ilhame** - Pedagogical Supervisor

---