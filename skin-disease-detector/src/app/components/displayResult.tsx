import React from 'react';

interface IDisplayResultProps {
  imagePreviewUrl: string | null;
  isLoading: boolean;
  predictionResult: string | null;
}

const DisplayResult: React.FC<IDisplayResultProps> = ({ imagePreviewUrl, isLoading, predictionResult }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-lg mt-4 mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Hasil Analisis</h2>

      {/* Tampilan Pratinjau Gambar */}
      {imagePreviewUrl && (
        <div className="mb-6 w-full flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Gambar yang Dipilih:</h3>
          <img
            src={imagePreviewUrl}
            alt="Pratinjau Lesi"
            className="max-w-full h-auto rounded-md border border-gray-200 shadow-sm"
          />
        </div>
      )}

      {/* Indikator Loading */}
      {isLoading && (
        <div className="flex items-center space-x-2 text-[#83256e]">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#83256e]"></div>
          <span>Sedang menganalisis...</span>
        </div>
      )}

      {/* Tampilan Hasil Prediksi AI */}
      {!isLoading && predictionResult && (
        <div className="w-full bg-[#83256e] p-4 rounded-md border border-[#ad2f91] text-white text-center">
          <h3 className="text-lg font-semibold mb-2">Hasil Prediksi AI:</h3>
          {/* whitespace-pre-wrap agar newline dari hasil Gemini bisa ditampilkan */}
          <p className="whitespace-pre-wrap text-left">{predictionResult}</p>
        </div>
      )}

      {/* Pesan default jika belum ada gambar/analisis */}
      {!imagePreviewUrl && !isLoading && !predictionResult && (
        <p className="text-gray-500 text-center">Unggah atau ambil foto untuk memulai analisis.</p>
      )}

      {/* Disclaimer Penting
      <p className="mt-6 text-sm text-gray-600 text-center">
        *Disclaimer: Analisis ini hanya untuk tujuan informasi dan bukan pengganti diagnosis medis profesional.
        Selalu konsultasikan dengan dokter kulit untuk kondisi medis.
      </p> */}
    </div>
  );
};

export default DisplayResult;