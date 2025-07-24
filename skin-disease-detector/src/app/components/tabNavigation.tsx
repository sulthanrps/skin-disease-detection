import React from "react";

interface ITabNavProps {
    activeTab: 'upload' | 'scan';
    onTabChange: (tab: 'upload' | 'scan') => void;
    className: String;
}

const TabNavigation: React.FC<ITabNavProps> = ({activeTab, onTabChange, className}) => {
    return (
        <div className={`p-1 rounded-full flex gap-0 bg-[#83256e] text-white font-bold ${className}`}>
            <div className={`rounded-tl-full p-3 rounded-bl-full hover:bg-[#ef3b93] ${activeTab === "upload" ? "bg-[#ef3b93]" : "bg-[#83256e]"} hover:cursor-pointer`} onClick={() => onTabChange('upload')}>
                Upload
            </div>

            <div className={`rounded-tr-full p-3 rounded-br-full hover:bg-[#ef3b93] ${activeTab === "scan" ? "bg-[#ef3b93]" : "bg-[#83256e]"} hover:cursor-pointer`} onClick={() => onTabChange('scan')}>
                Snap
            </div>
        </div>
    )
}

export default TabNavigation