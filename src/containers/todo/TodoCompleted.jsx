import { useContext } from 'react';
import { List, Typography } from 'antd';
import { TodoContext } from './index';
import './TodoShared.scss';

const { Title } = Typography;

const TodoCompleted = () => {
    const { tasks } = useContext(TodoContext);
    const completedTasks = tasks.filter(task => task.completed === true);

    return (
        <div className='todo-container'>
            <Title level={2}>Priority Tasks</Title>
            <List
                bordered
                dataSource={completedTasks}


                renderItem={(item) => (
                    <List.Item className="list-item-container">
                        <span className="list-item-title">
                            {item.title}
                        </span>
                    </List.Item>
                )}

            />
        </div>
    );
};

export default TodoCompleted;