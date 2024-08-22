import MainLayout from "../component/MainLayout";
import Dashboard from "../pages/Dashboard";
import DataSensor from "../pages/DataSensor";
import ActionHistory from "../pages/ActionHistory";
import Profile from "../pages/Profile";
import { Navigate } from "react-router-dom";

export const routes = [
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: "data-sensor",
                element: <DataSensor/>
            },
            {
                path: "action-history",
                element: <ActionHistory/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]