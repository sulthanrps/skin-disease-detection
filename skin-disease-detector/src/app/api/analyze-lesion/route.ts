import { NextResponse } from 'next/server';
import { getGeminiModel, fileToGenerativePart } from "../../../lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, filename } = body;

    if (!image) {
      return NextResponse.json({ error: 'Image data is required.' }, { status: 400 });
    }

    let mimeType = 'image/png'; 
    if (filename && filename.toLowerCase().endsWith('.jpg')) {
      mimeType = 'image/jpeg';
    } else if (filename && filename.toLowerCase().endsWith('.jpeg')) {
      mimeType = 'image/jpeg';
    } else if (filename && filename.toLowerCase().endsWith('.webp')) {
      mimeType = 'image/webp';
    }

    const model = getGeminiModel();

    const promptText = `
        Analisis gambar lesi kulit ini. Berikan respons Anda dalam format JSON.
        JSON HARUS memiliki properti berikut:
        {
          "namaPenyakit": "string", // Nama penyakit kulit yang diidentifikasi (misal: "Kutil", "Ruam", "Tahi Lalat", atau "Tidak Teridentifikasi")
          "tingkatBahaya": "string", // "berbahaya", "tidak berbahaya", "jinak", "mencurigakan", "tidak diketahui"
          "penangananUmum": "string", // Informasi singkat tentang penanganan umum (jika berlaku), atau "Konsultasi dokter."
          "tingkatKepercayaan": "number" // Estimasi tingkat kepercayaan dalam persentase (misal: 85, 90). Jika tidak yakin, berikan 0.
        }

        Jika tidak dapat mengidentifikasi, set "namaPenyakit" menjadi "Tidak Teridentifikasi" dan "tingkatKepercayaan" menjadi 0.
        berikan respon anda hanya format JSON nya saja, tidak perlu ada kata - kata lainnya
        hilangkan juga format jsonnya, jadi berikan saja data menyerupai object, seperti berikut: 

        {
          "namaPenyakit": "Keratosis Seborrheic",
          "tingkatBahaya": "jinak",
          "penangananUmum": "Pengangkatan jika mengganggu secara kosmetik atau menimbulkan gejala.  Konsultasi dokter untuk diagnosis pasti dan rencana perawatan.",
          "tingkatKepercayaan": 85
        }

        PASTIKAN OUTPUT YANG DIBERIKAN HANYA SEPERTI OBJECT DIATAS !, tidak perlu embel - embel '''json diawal dan ''' diakhir
        `;

        const parts = [
          fileToGenerativePart(image, mimeType),
          { text: promptText },
        ];

        // Lakukan request ke Gemini API
        const result = await model.generateContent({ contents: [{ role: "user", parts }] });
        const response = result.response;
        let text = response.text();

        text = text.replace(/```json\n/g, '').replace(/\n```/g, '').trim();

        // Coba parse teks sebagai JSON
        let parsedResult: {
          namaPenyakit: string;
          tingkatBahaya: string;
          penangananUmum: string;
          tingkatKepercayaan: number;
        } | null = null;

        try {
          parsedResult = JSON.parse(text);
        } catch (jsonError) {
          console.error("Failed to parse Gemini response as JSON:", jsonError);
          // Fallback jika Gemini tidak memberikan JSON yang valid
          parsedResult = {
            namaPenyakit: "Analisis Gagal",
            tingkatBahaya: "Tidak diketahui",
            penangananUmum: "Respon AI tidak dalam format yang diharapkan. Coba lagi atau konsultasi dokter.",
            tingkatKepercayaan: 0
          };
        }

        // Sekarang kita bisa memformat ulang untuk frontend
        // const formattedPrediction = `
        //   Penyakit kulit yang Anda alami adalah ${parsedResult.namaPenyakit}.
        //   Penyakit ini ${parsedResult.tingkatBahaya} dan umumnya dapat ditangani dengan ${parsedResult.penangananUmum}.
        //   Tingkat kepercayaan: ${parsedResult.tingkatKepercayaan}%.
        // `;

        // Mengembalikan hasil analisis yang sudah diformat ke frontend
        console.log(parsedResult)
        return NextResponse.json(parsedResult);

  } catch (error: any) {
    console.error('Error processing image with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image.', details: error.message },
      { status: 500 }
    );
  }
}