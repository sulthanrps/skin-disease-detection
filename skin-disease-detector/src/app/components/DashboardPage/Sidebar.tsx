import React from "react";
import Link from "next/link";
import { Home, Focus, Map } from "lucide-react"

interface ISideBarProps {
    activeBar: 'Dashboard' | 'Snap' | 'Map';
    onTabChange: (tab: 'Dashboard' | 'Snap' | 'Map') => void;
}

const Sidebar: React.FC<ISideBarProps> = ({activeBar, onTabChange}) => {
    return (
        <div className="flex flex-col w-[20%] bg-gradient-to-br from-pink-400 to-rose-500 min-h-screen p-4">
            <div className="flex justify-center items-center md:-ml-8">
                <img src="/logo.png" alt="logo" className="w-20 md:w-24"/>
                <h1 className="text-4xl font-bold -ml-4 hidden md:block">SkinSnap</h1>
            </div>
            <div className="p-4 flex flex-col gap-8 mt-8">
                <div className={`flex gap-3 items-center font-semibold text-xl p-2 hover:cursor-pointer hover:text-white transition duration-200 easeInOut md:p-4 md:pl-6 rounded-lg backdrop-blur-sm ${activeBar === "Dashboard" ? "bg-white/40 text-white border-2 border-grey" : "bg-white/20"}`} onClick={() => onTabChange('Dashboard')}>
                    <Home />
                    <Link href="" className="hidden md:block">Dashboard</Link>
                </div>

                <div className={`flex gap-3 items-center font-semibold text-xl p-2 hover:cursor-pointer hover:text-white transition duration-200 easeInOut md:p-4 md:pl-6 rounded-lg backdrop-blur-sm ${activeBar === "Snap" ? "bg-white/40 text-white border-2 border-grey" : "bg-white/20"}`} onClick={() => onTabChange('Snap')}>
                    <Focus />
                    <Link href="" className="hidden md:block">Snap</Link>
                </div>

                <div className={`flex gap-3 items-center font-semibold text-xl p-2 hover:cursor-pointer hover:text-white transition duration-200 easeInOut md:p-4 md:pl-6 rounded-lg backdrop-blur-sm ${activeBar === "Map" ? "bg-white/40 text-white border-2 border-grey" : "bg-white/20"}`} onClick={() => onTabChange('Map')}>
                    <Map />
                    <Link href="" className="hidden md:block">Map</Link>
                </div>
            </div>
            
        </div>
    )
}

export default Sidebar;