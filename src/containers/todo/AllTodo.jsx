import { List, Checkbox, Typography } from 'antd'; //dùng component có sẵn 
// List dùng để tạo danh sách
//Checkbox, dùng cho ô tick 
// component xử lý text/title
import './TodoShared.scss';
import { TodoContext } from './index';
import { useContext } from 'react';


const { Title } = Typography; //lấy title từ typography



const AllTodo = () => {
    const { tasks, toggleTask, togglePriority } = useContext(TodoContext);
    const unmarkTask = tasks.filter(task => task.completed === false && task.priority === false);

    return (
        <div className="todo-container">
            <Title level={2}> React Roadmap</Title>
            <List
                bordered
                dataSource={unmarkTask}

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