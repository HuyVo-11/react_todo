import React, { useState } from 'react'; // nhớ phải import để tạo statement
import { List, Checkbox, Typography } from 'antd'; //dùng component có sẵn 
// List dùng để tạo danh sách
//Checkbox, dùng cho ô tick 
// component xử lý text/title
import './TodoShared.scss';

const { Title } = Typography; //lấy title từ typography

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



const AllTodo = () => {
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
    }

    return (
        <div className="todo-container">
            <Title level={2}> React Roadmap</Title>
            <List
                bordered
                dataSource={tasks}

                header={
                    <div className="list-header-container">
                        <span className="list-header-title">TaskName</span>
                        <div className="list-header-labels">
                            <span>Completed</span>
                            <span>Priority</span>
                        </div>
                    </div>
                }

                //render item
                renderItem={(item) => (
                    <List.Item className="list-item-container">

                        <span className={`list-item-title ${item.completed ? 'todo-item-completed' : 'todo-item-active'}`}>
                            {item.title}
                        </span>

                        <div className="list-item-actions">
                            <Checkbox
                                checked={item.completed}
                                onChange={() => toggleTask(item.id)}
                            //className={item.completed ? 'todo-item-completed' : 'todo-item-active'}
                            >

                            </Checkbox>

                            <Checkbox
                                checked={item.priority}
                                onChange={() => togglePriority(item.id)}
                            >
                            </Checkbox>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default AllTodo;