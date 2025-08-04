"use client"

import React from "react";
import { useCallback, useState } from "react";
import CameraScanner from "../components/SnapPage/cameraScanner";
import ImageUploader from "../components/SnapPage/imageUploader";
import TabNavigation from "../components/SnapPage/tabNavigation";
import DisplayResult from "../components/SnapPage/displayResult";

interface IGeminiResponseData {
  namaPenyakit: string;
  tingkatBahaya: string;
  penangananUmum: string;
  tingkatKepercayaan: number;
}

const SnapLayout = () => {
    const [tabActive, setTabActive] = useState<'upload' | 'scan'>('scan');
    const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [predictionResult, setPredictionResult] = useState<IGeminiResponseData | null>(null);

    const handleImageSelected = useCallback((file: File) => {
        setSelectedFile(file);
        setImagePreviewURL(URL.createObjectURL(file));
    }, [])

    const handleTabChange = useCallback((tab: 'upload' | 'scan') => {
        setTabActive(tab);
        setImagePreviewURL(null);
        setSelectedFile(null);
        setPredictionResult(null);
    }, [])

    const handleAnalyzeImage = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setPredictionResult(null);
        setImagePreviewURL(null);

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
            const base64Image = reader.result as string;
            const cleanBase64 = base64Image.split(',')[1];

            try {
                const response = await fetch('/api/analyze-lesion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: cleanBase64, filename: selectedFile.name }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: IGeminiResponseData = await response.json();
                // console.log(data, "<< data dari be di fe");
                setPredictionResult(data || 'Tidak dapat menganalisis gambar.');
            } catch (error) {
                console.error('Error analyzing image:', error);
                setPredictionResult({
                    namaPenyakit: "Gagal Analisis",
                    tingkatBahaya: "Tidak diketahui",
                    penangananUmum: `Terjadi kesalahan saat menganalisis`,
                    tingkatKepercayaan: 0
                });
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            console.error("Error reading file");
            setIsLoading(false);
            setPredictionResult({
                namaPenyakit: "Gagal Membaca File",
                tingkatBahaya: "Tidak diketahui",
                penangananUmum: "Gagal membaca file gambar.",
                tingkatKepercayaan: 0
            });
        };
    };
    return (
        <div className={`flex flex-col w-[80%] ${tabActive == "upload" ? "min-h-screen h-fit" : "h-full"} my-4 p-8 justify-center items-center`}>
            <TabNavigation activeTab={tabActive} onTabChange={handleTabChange} className="mb-4" />

            {
                tabActive === "upload" && (
                    <ImageUploader onImageSelected={handleImageSelected} key="img-upload-tab" />
                )
            }

            {
                tabActive === "scan" && (
                    <CameraScanner key="img-scan-tab" onImageCaptured={handleImageSelected} />
                )
            }

            {imagePreviewURL && (
                <button
                    onClick={handleAnalyzeImage}
                    disabled={isLoading}
                    className={`my-4 px-4 py-2 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform ${
                        isLoading
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#83256e] to-[#ef3b93] text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300'
                    }`}
                >
                    {isLoading ? 'Menganalisis...' : 'Analisis Foto Sekarang!'}
                </button>
            )}

            <DisplayResult imagePreviewUrl={imagePreviewURL} isLoading={isLoading} predictionResult={predictionResult}>

            </DisplayResult>
        </div>       
    )
}

export default SnapLayout;