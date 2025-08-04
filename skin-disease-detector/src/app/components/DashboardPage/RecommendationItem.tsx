const RecommendationItem = ({ icon, text }: { icon: React.ReactNode, text: any }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-full">
            {icon}
        </div>
        <p className="text-gray-600 mt-1">{text}</p>
    </div>
);

export default RecommendationItem;