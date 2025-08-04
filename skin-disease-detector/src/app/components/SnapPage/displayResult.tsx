import React from 'react';

interface IGeminiResponseData {
  namaPenyakit: string;
  tingkatBahaya: string;
  penangananUmum: string;
  tingkatKepercayaan: number;
}

interface IDisplayResultProps {
  imagePreviewUrl: string | null;
  isLoading: boolean;
  predictionResult: IGeminiResponseData | null;
}

const DisplayResult: React.FC<IDisplayResultProps> = ({ imagePreviewUrl, isLoading, predictionResult }) => {
  // console.log("ResultDisplay - predictionResult:", predictionResult);
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

      {isLoading && (
        <div className="flex items-center space-x-2 text-[#83256e]">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#83256e]"></div>
          <span>Sedang menganalisis...</span>
        </div>
      )}

      {!isLoading && predictionResult && (
        <div className="w-full bg-[#83256e] p-4 rounded-md border border-[#ad2f91] text-white text-center">
          <h3 className="text-lg font-semibold mb-2">Hasil Prediksi AI:</h3>
          <p className="mb-2">
            Penyakit yang anda alami adalah : <span className="font-semibold">{predictionResult.namaPenyakit}</span>
          </p>
          <p className="mb-2">
            Tingkah Bahayanya yakni : <span className="font-semibold">{predictionResult.tingkatBahaya}</span>
          </p>
          <p className="mb-2">
             Penanganannya dapat berupa : {predictionResult.penangananUmum}
          </p>
          <p className="mb-2">
            Tingkat keakuratan : <span className="font-semibold">{predictionResult.tingkatKepercayaan}%</span>
          </p>
        </div>
      )}

      {!imagePreviewUrl && !isLoading && !predictionResult && (
        <p className="text-gray-500 text-center">Unggah atau ambil foto untuk memulai analisis.</p>
      )}
    </div>
  );
};

export default DisplayResult;