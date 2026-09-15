import { useContext } from 'react';
import { List, Typography, Button } from 'antd';
import { TodoContext } from './index';
import './TodoShared.scss';

const { Title } = Typography;

const TodoPending = () => {
    const { tasks, togglePriority } = useContext(TodoContext);
    const pendingTasks = tasks.filter(task => task.priority === true); // lọc task prio

    return (
        <div className='todo-container'>
            <Title level={2}>Priority Tasks</Title>
            <List
                bordered
                dataSource={pendingTasks}


                renderItem={(item) => (
                    <List.Item className="list-item-container">
                        <span className="list-item-title">
                            {item.title}
                        </span>

                        <Button
                            type="primary"
                            danger
                            onClick={() => togglePriority(item.id)}>
                            undo
                        </Button>
                    </List.Item>
                )}

            />
        </div>
    );
};

export default TodoPending;