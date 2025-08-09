"use client";
import dynamic from "next/dynamic";
import Sidebar from "../components/DashboardPage/Sidebar";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useCallback } from "react";
import SnapLayout from "../layouts/SnapLayout";
import { withAuth } from "@/lib/withAuth";

const NearbyDoctor = dynamic(() => import("../map/page"), {
  ssr: false,
});

const Dashboard = () => {
  const [tabActive, setTabActive] = useState<"Dashboard" | "Snap" | "Map">("Dashboard");
  const handleTabChange = useCallback((tab: "Dashboard" | "Snap" | "Map") => {
    setTabActive(tab);
  }, []);
  return (
    <div className="flex w-[100%]">
      <Sidebar activeBar={tabActive} onTabChange={handleTabChange}></Sidebar>
      {tabActive === "Dashboard" && <DashboardLayout></DashboardLayout>}

      {tabActive === "Snap" && <SnapLayout></SnapLayout>}

      {tabActive === "Map" && <NearbyDoctor></NearbyDoctor>}
    </div>
  );
};

export default withAuth(Dashboard);
