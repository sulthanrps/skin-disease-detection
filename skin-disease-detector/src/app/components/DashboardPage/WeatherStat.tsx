const WeatherStat = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
    <div className="flex items-center space-x-3">
        <div className="p-2 bg-white/20 rounded-full">
            {icon}
        </div>
        <div>
            <p className="font-bold text-lg">{value}</p>
            <p className="text-xs opacity-80">{label}</p>
        </div>
    </div>
);

export default WeatherStat;