import Link from "next/link";

const Header = () => (
    <header className="container mx-auto px-6 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0B134A] leading-tight mb-6">
                Kesehatan Kulit di Ujung Jari Anda.
            </h1>
            <p className="text-lg md:text-xl text-[#4A5568] mb-10">
                Deteksi dini kondisi kulit dengan AI, temukan dokter terdekat, dan dapatkan tips harian yang dipersonalisasi untuk menjaga kulit Anda tetap sehat dan bercahaya.
            </p>
            <div className="flex justify-center items-center space-x-4">
                <Link href="/dashboard" className="bg-[#FF3E99] text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">
                    Coba Sekarang
                </Link>
                <a href="#fitur" className="border-2 border-[#0B134A] text-[#0B134A] font-bold py-3 px-8 rounded-lg hover:bg-[#0B134A] hover:text-[#FEF6F8] transition-colors">
                    Lihat Fitur
                </a>
            </div>
        </div>
    </header>
);

export default Header;