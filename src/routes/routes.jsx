import { paths } from '../constants/paths';

import AllTodo from '../containers/todo/AllTodo';
import TodoPending from '../containers/todo/TodoPending';
import TodoCompleted from '../containers/todo/TodoCompleted';

export const routes = [
    {
        path: paths.allcv,
        component: AllTodo
    },

    {
        path: paths.todo,
        component: TodoPending
    },

    {
        path: paths.completed,
        component: TodoCompleted
    },
];


