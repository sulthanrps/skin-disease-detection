"use client"

import Sidebar from "../components/DashboardPage/Sidebar";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useCallback } from "react";
import SnapLayout from "../layouts/SnapLayout";
import NearbyDoctor from "../map/page";

const Dashboard = () => {
    const [tabActive, setTabActive] = useState<'Dashboard' | 'Snap' | 'Map'>('Dashboard');
    const handleTabChange = useCallback((tab: 'Dashboard' | 'Snap' | 'Map') => {
        setTabActive(tab);
    }, [])
    return (
        <div className="flex w-[100%]">
            <Sidebar activeBar={tabActive} onTabChange={handleTabChange}></Sidebar>
            {
                tabActive === "Dashboard" && (
                    <DashboardLayout></DashboardLayout>
                )
            }

            {
                tabActive === "Snap" && (
                    <SnapLayout></SnapLayout>
                )
            }

            {
                tabActive === "Map" && (
                    <NearbyDoctor></NearbyDoctor>
                )
            }
        </div>
    )
}   

export default Dashboard;