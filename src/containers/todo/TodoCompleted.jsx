import { useContext } from 'react';
import { List, Typography, Button } from 'antd';
import { TodoContext } from './index';
import './TodoShared.scss';

const { Title } = Typography;

const TodoCompleted = () => {
    const { tasks, toggleTask } = useContext(TodoContext);
    const completedTasks = tasks.filter(task => task.completed === true); // lọc task đã complete 

    return (
        <div className='todo-container'>
            <Title level={2}>Completed Tasks</Title>
            <List
                bordered
                dataSource={completedTasks}


                renderItem={(item) => (
                    <List.Item className="list-item-container">
                        <span className="list-item-title">
                            {item.title}
                        </span>

                        <Button
                            type="primary"
                            danger
                            onClick={() => toggleTask(item.id)}>
                            Undo
                        </Button>
                    </List.Item>
                )}

            />
        </div>
    );
};

export default TodoCompleted;