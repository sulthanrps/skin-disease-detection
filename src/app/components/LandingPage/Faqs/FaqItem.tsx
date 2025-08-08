interface FaqItemProps {
    question: string;
    answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => (
    <details className="bg-white p-6 rounded-lg cursor-pointer border border-gray-200">
        <summary className="flex justify-between items-center font-semibold text-[#0B134A] text-lg">
            {question}
            <span className="arrow-down transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-[#FF3E99]"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
            </span>
        </summary>
        <p className="text-[#4A5568] mt-4">{answer}</p>
    </details>
);

export default FaqItem;