interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-[#FEF6F8] p-6 rounded-xl border border-gray-200 hover:shadow-xl hover:scale-105 transition-all">
        <div className="bg-[#FF3E99]/10 text-[#FF3E99] p-3 rounded-lg w-12 h-12 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-[#0B134A] mb-2">{title}</h3>
        <p className="text-[#4A5568]">{description}</p>
    </div>
);

export default FeatureCard;