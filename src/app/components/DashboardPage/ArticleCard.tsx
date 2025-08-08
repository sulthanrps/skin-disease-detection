const articles = [
  {
    category: "Sunscreen",
    title: "Pentingnya SPF: Melindungi Kulit dari Bahaya Matahari",
    author: "Dr. Aisyah",
    date: "2 Agu 2025",
    imageUrl: "https://placehold.co/600x400/FBCFE8/86198F?text=Kulit+Sehat",
  },
];

const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
        <div className="overflow-hidden">
            <img 
                src={article.imageUrl} 
                alt={article.title} 
                width={400} 
                height={200} 
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="p-5">
            <p className="text-sm font-semibold text-indigo-600">{article.category}</p>
            <h3 className="mt-2 text-lg font-bold text-gray-800 leading-tight group-hover:text-indigo-700">
                {article.title}
            </h3>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Oleh {article.author}</span>
                <span>{article.date}</span>
            </div>
        </div>
    </div>
);

export default ArticleCard;