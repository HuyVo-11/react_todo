
import React, { createContext, useState } from "react";


export const TodoContext = createContext();

const initialTasks = [
    {
        id: 1,
        title: 'Understand React Basics (JSX, Components, Props)',
        completed: false,
        priority: false
    },
    {
        id: 2,
        title: 'Master State and Lifecycle (useState, useEffect)',
        completed: false,
        priority: false
    },
    {
        id: 3,
        title: 'Learn React Router for Navigation',
        completed: false,
        priority: false
    },
    {
        id: 4,
        title: 'Manage Global State (Context API, Redux, Zustand)',
        completed: false,
        priority: false
    },
    {
        id: 5,
        title: 'Handle Forms and Validation (React Hook Form)',
        completed: false,
        priority: false
    },
    {
        id: 6,
        title: 'Fetch Data and Manage Caching (React Query, SWR)',
        completed: false,
        priority: false
    },
    {
        id: 7,
        title: 'Master Advanced Hooks (useMemo, useCallback, useRef)',
        completed: false,
        priority: false
    },
    {
        id: 8,
        title: 'Learn React Performance Optimization Techniques',
        completed: false,
        priority: false
    },
    {
        id: 9,
        title: 'Implement Authentication and Authorization',
        completed: false,
        priority: false
    },
    {
        id: 10,
        title: 'Test React Applications (Jest, React Testing Library)',
        completed: false,
        priority: false
    },
];


export const TodoProvider = ({ children }) => {
    const [tasks, setTasks] = useState(initialTasks);


    // xử lý nút tick - completed
    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // xử lý nút - priority
    const togglePriority = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, priority: !task.priority } : task
        ));
    };

    return (
        <TodoContext.Provider value={{ tasks, toggleTask, togglePriority }}>
            {children}
        </TodoContext.Provider>
    )
}