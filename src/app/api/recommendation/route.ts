import { NextResponse } from 'next/server';
import { getGeminiModel } from "../../../lib/gemini";

interface IWeatherInput {
  current: {
    temp_c: number;
    condition: { text: string };
    humidity: number;
    uv: number;
  };
}

interface IOutfitRecommendation {
  uvProtection: string;
  eyewear: string;
  clothing: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { weatherData }: { weatherData: IWeatherInput } = body;

    if (!weatherData) {
      return NextResponse.json({ error: 'Weather data is required.' }, { status: 400 });
    }

    const model = getGeminiModel();

    const promptText = `
        Anda adalah seorang penasihat fashion dan perawatan kulit. Berdasarkan data cuaca berikut:
        - Suhu: ${weatherData.current.temp_c}°C
        - Kondisi: ${weatherData.current.condition.text}
        - UV Index: ${weatherData.current.uv}
        - Kelembapan: ${weatherData.current.humidity}%

        Berikan rekomendasi pakaian dan perlindungan dalam format JSON untuk ditampilkan di aplikasi.
        Pastikan rekomendasi singkat, jelas, dan dalam Bahasa Indonesia.
        
        Struktur JSON HARUS seperti ini:
        {
          "uvProtection": "string",
          "eyewear": "string",
          "clothing": "string"
        }

        untuk "uvProtection", berikan juga informasi tambahan mengenai index uv nya. contoh : Tidak perlu karena UV 0

        sama halnya dengan "eyewear", berikan tambahan info apakah pengguna membutuhkan kacamata atau tidak, hindari memberikan 
        perintah "tidak perlu", harusnya "kacamata tidak diperlukan, karena (berikan alasan)" atau "kacamata diperlukan karena (berikan alasan)

        Berikan jawaban HANYA dalam format JSON yang bersih, tanpa tambahan teks atau format markdown seperti \`\`\`json.
    `;

    const result = await model.generateContent(promptText);
    const response = result.response;
    let text = response.text();

    text = text.replace(/```json\n/g, '').replace(/\n```/g, '').trim();

    let parsedResult: IOutfitRecommendation;

    try {
      parsedResult = JSON.parse(text);
    } catch (jsonError) {
      console.error("Failed to parse Gemini response as JSON:", jsonError);
      parsedResult = {
        uvProtection: "Gagal mendapatkan rekomendasi UV.",
        eyewear: "Gagal mendapatkan rekomendasi kacamata.",
        clothing: "Gagal mendapatkan rekomendasi pakaian."
      };
    }

    return NextResponse.json(parsedResult);

  } catch (error: unknown) {
    console.error('Error processing recommendation with Gemini:', error);
    const errorMessage = (error instanceof Error) ? error.message : String(error);

    return NextResponse.json(
      { error: `Terjadi kesalahan di server: ${errorMessage}` },
      { status: 500 }
    );
  }
}
