import React from "react";

import MasterLayout from '../components/layout/MasterLayout';
import { Routes, Route, Navigate } from "react-router-dom";

import { paths } from "../constants/paths";
import { routes } from "./routes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MasterLayout />}>
                <Route index element={<Navigate to={paths.allcv} replace />} />
                {routes.map((route, index) => {
                    const Component = route.component;

                    const relativePath = route.path.startsWith('/') //check xem route.path có bắt đầu bằng "/" k, nếu là "/AllTodo" => true || nếu bắt đầu bằng "AllTodo" => false, giữ nguyên path
                        ? route.path.substring(1) // sau đó lấy từ substring(1), bỏ ký tự đầu tiên => "AllTodo"
                        : route.path;

                    return (
                        <Route key={index} // có thể thay bằng key={route.path}
                            path={relativePath}
                            element={<Component />}
                        />
                    );
                })}
            </Route>
        </Routes>
    )
}

export default AppRoutes;