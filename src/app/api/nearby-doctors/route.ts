import { NextResponse } from 'next/server';
import { getGeminiModel } from "@/lib/gemini";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  address: string;
  position: [number, number];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { latitude, longitude } = body;

    if (!latitude || !longitude) {
      return NextResponse.json({ error: 'Latitude and longitude are required.' }, { status: 400 });
    }

    const model = getGeminiModel();

    // Prompt yang dirancang untuk memberikan instruksi jelas ke Gemini
    const promptText = `
        Anda adalah asisten pencari lokasi yang ahli. Berdasarkan koordinat berikut:
        - Latitude: ${latitude}
        - Longitude: ${longitude}

        Temukan maksimal 5 dokter kulit, klinik kecantikan, atau spesialis kulit (dermatologist) dalam radius 15km.
        
        Berikan respons Anda HANYA dalam format array JSON yang valid.
        Jangan sertakan teks atau penjelasan lain sebelum atau sesudah array JSON.
        Jangan gunakan format markdown seperti \`\`\`json.

        Setiap objek dalam array HARUS memiliki struktur dan tipe data berikut:
        {
          "id": number,
          "name": "string",
          "specialty": "string",
          "address": "string",
          "position": [number, number] // [latitude, longitude]
        }

        Jika tidak ada hasil yang ditemukan, kembalikan array kosong [].
        pastikan position sesuai dengan titik koordinat klinik / dokter tersebut !
    `;

    const result = await model.generateContent(promptText);
    const response = result.response;
    const text = response.text();

    console.log(text);

    let parsedResult: Doctor[];

    try {
      parsedResult = JSON.parse(text);
    } catch (jsonError) {
      console.error("Failed to parse Gemini response as JSON:", jsonError);
      // Fallback jika respons Gemini tidak valid, kembalikan array kosong
      parsedResult = [];
    }

    return NextResponse.json(parsedResult);

  } catch (error: unknown) {
    console.error('Error processing request with Gemini:', error);
    const errorMessage = (error instanceof Error) ? error.message : String(error);

    return NextResponse.json(
      { error: `Terjadi kesalahan di server: ${errorMessage}` },
      { status: 500 }
    );
  }
}