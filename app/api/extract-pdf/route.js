import { NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse.js";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo fornecido" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text from PDF
    const data = await pdf(buffer);
    
    return NextResponse.json({ 
      text: data.text,
      pages: data.numpages 
    });
  } catch (error) {
    console.error("Erro ao extrair texto do PDF:", error);
    return NextResponse.json(
      { error: "Erro ao processar PDF: " + error.message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
