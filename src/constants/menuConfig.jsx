//import React from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { paths } from './paths';

export const navMenuConfig = [
    {
        key: paths.allcv,
        icon: <UserOutlined />,
        label: 'Tất cả cv',
        path: paths.allcv,
    },
    {
        key: paths.todo,
        icon: <VideoCameraOutlined />,
        label: 'Cv cần làm',
        path: paths.todo,
    },
    {
        key: paths.completed,
        icon: <UploadOutlined />,
        label: 'Cv đã hoàn thành',
        path: paths.completed,
    },
];
