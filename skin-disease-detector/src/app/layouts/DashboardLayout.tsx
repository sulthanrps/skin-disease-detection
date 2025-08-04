"use client"

import { Sun, Wind, Droplets, Shield, Glasses, Shirt } from 'lucide-react';
import React, {useState, useEffect} from 'react';
import { getLocation } from '@/lib/getLocation';
import translateWeatherCondition from '@/lib/translateWeatherCondition';
import ArticleCard from '../components/DashboardPage/ArticleCard';
import WeatherStat from '../components/DashboardPage/WeatherStat';
import RecommendationItem from '../components/DashboardPage/RecommendationItem';

const articles = [
  {
    category: "Sunscreen",
    title: "Pentingnya SPF: Melindungi Kulit dari Bahaya Matahari",
    author: "Dr. Aisyah",
    date: "2 Agu 2025",
    imageUrl: "https://placehold.co/600x400/FBCFE8/86198F?text=Kulit+Sehat",
  },
  {
    category: "Tips Harian",
    title: "5 Langkah Mudah Membersihkan Wajah di Malam Hari",
    author: "SkinSnap Team",
    date: "1 Agu 2025",
    imageUrl: "https://placehold.co/600x400/E0E7FF/4F46E5?text=Tips+Kulit",
  },
    {
    category: "Mitos & Fakta",
    title: "Benarkah Cokelat Menyebabkan Jerawat? Ini Faktanya",
    author: "Dr. Budi",
    date: "31 Jul 2025",
    imageUrl: "https://placehold.co/600x400/D1FAE5/047857?text=Info+Kulit",
  },
];

interface IWeatherData {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    uv: number;
  };
}

interface IOutfitRecommendation {
  uvProtection: string;
  eyewear: string;
  clothing: string;
}

export default function DashboardLayout() {
    const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
    const [recommendation, setRecommendation] = useState<IOutfitRecommendation | null>(null);
    const [loading, setIsLoading] = useState(true);
    const [recLoading, setRecLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOutfitRecommendation = async (weather: IWeatherData) => {
            setRecLoading(true);
            try {
                const response = await fetch('/api/recommendation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ weatherData: weather }),
                });
                if (!response.ok) throw new Error("Gagal memuat rekomendasi.");
                const data: IOutfitRecommendation = await response.json();
                setRecommendation(data);
                setRecLoading(false);
            } catch (err: any) {
                console.error("Recommendation fetch error:", err);
                setRecommendation({
                    uvProtection: "Tidak dapat memuat rekomendasi UV.",
                    eyewear: "Tidak dapat memuat rekomendasi kacamata.",
                    clothing: "Tidak dapat memuat rekomendasi pakaian.",
                });
            } finally {
                setRecLoading(false);
            }
        };

        const fetchWeatherData = async (latitude: number, longitude: number) => {
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            if (!apiKey) {
                setError("API Key tidak ditemukan. Pastikan sudah ada di file .env.local");
                setIsLoading(false);
                return;
            }

            const query = `${latitude},${longitude}`;

            try {
                const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`);
                if (!response.ok) {
                throw new Error('Gagal mengambil data cuaca');
                }
                const data: IWeatherData = await response.json();
                setWeatherData(data);
                await fetchOutfitRecommendation(data);
                setIsLoading(false)
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getLocation()
            .then(coords => {
                fetchWeatherData(coords.latitude, coords.longitude)
            })
            .catch((err) => setError(err));
        
        
    }, [])    
    
    return (
        <div className="flex-1 p-6 lg:p-8 bg-gray-50/70 w-[80%]">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-gray-600">Selamat datang kembali! Berikut kondisi cuaca hari ini.</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg">
                        {error && (
                            <p>❌ Error: {error}</p>
                        )}

                        {loading && (
                            <div className="flex items-center space-x-2 text-white">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                <span>Mendapatkan Data Cuaca...</span>
                            </div>
                        )}

                        {weatherData && (
                            <>
                                <div className="flex flex-col md:flex-row justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{weatherData.location.name}</p>
                                        <p className="text-6xl font-bold mt-2">{weatherData.current.temp_c}°C</p>
                                        <p className="text-xl font-medium mt-1">{translateWeatherCondition(weatherData.current.condition.text)}</p>
                                    </div>
                                    <div className="mt-4 md:mt-0 bg-white/30 backdrop-blur-sm rounded-full p-3">
                                        <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/30 grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <WeatherStat icon={<Sun size={20} />} value={`${weatherData.current.uv}`} label="UV Index" />
                                    <WeatherStat icon={<Droplets size={20} />} value={`${weatherData.current.humidity}%`} label="Kelembapan" />
                                    <WeatherStat icon={<Wind size={20} />} value={`${weatherData.current.wind_kph} km/j`} label="Angin" />
                                </div>
                            </>
                        )}
                        
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md">
                        <h2 className="text-xl font-bold text-gray-800">Rekomendasi Pakaian & Perlindungan Hari Ini</h2>
                        {recLoading && (
                            <div className="flex items-center space-x-2 text-[#83256e]">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#83256e]"></div>
                                <span>Sedang Memikirkan Rekomendasi Outfit anda ...</span>
                            </div>
                        )}

                        {recommendation && (
                            <div className="mt-6 space-y-5">
                                <RecommendationItem icon={<Shield size={20} className="text-indigo-600" />} text={recommendation?.uvProtection} />
                                <RecommendationItem icon={<Glasses size={20} className="text-indigo-600" />} text={recommendation?.eyewear} />
                                <RecommendationItem icon={<Shirt size={20} className="text-indigo-600" />} text={recommendation?.clothing} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Artikel Pilihan Untukmu</h2>
                    <div className="space-y-6">
                        {articles.map((article, index) => (
                            <ArticleCard key={index} article={article} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
