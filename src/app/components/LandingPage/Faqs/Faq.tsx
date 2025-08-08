import FaqItem from "./FaqItem";

const faqData = [
    {
        question: "Seberapa akurat diagnosis dari AI?",
        answer: "Diagnosis AI kami dirancang sebagai alat skrining awal dan bukan pengganti konsultasi medis profesional. Akurasinya terus ditingkatkan, namun kami sangat menyarankan Anda untuk tetap berkonsultasi dengan dokter kulit untuk diagnosis dan penanganan yang pasti."
    },
    {
        question: "Apakah data foto dan pribadi saya aman?",
        answer: "Tentu saja. Kami menggunakan enkripsi standar industri untuk melindungi semua data Anda. Privasi dan keamanan pengguna adalah prioritas utama kami. Foto Anda hanya digunakan untuk analisis dan tidak akan dibagikan tanpa persetujuan Anda."
    },
    {
        question: "Apakah aplikasi ini gratis digunakan?",
        answer: "Fitur-fitur utama SkinSnap, seperti deteksi AI (dengan batasan harian), info cuaca kulit, dan artikel, dapat digunakan secara gratis."
    }
];

const Faq = () => (
    <section id="faq" className="py-20 bg-[#FEF6F8]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0B134A]">Ada Pertanyaan?</h2>
                <p className="text-[#4A5568] mt-4 max-w-2xl mx-auto">Kami telah merangkum beberapa pertanyaan yang paling sering diajukan tentang SkinSnap.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqData.map((faq, index) => (
                    <FaqItem key={index} {...faq} />
                ))}
            </div>
        </div>
    </section>
);

export default Faq