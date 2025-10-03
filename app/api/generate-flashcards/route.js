import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Texto não fornecido" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um assistente educacional que cria flashcards de estudo. 
Analise o texto fornecido e crie flashcards úteis para estudo.
Cada flashcard deve ter:
- front: Uma pergunta clara ou conceito
- back: A resposta ou explicação detalhada

Retorne APENAS um JSON válido no formato:
{
  "flashcards": [
    {"id": 1, "front": "pergunta", "back": "resposta"},
    {"id": 2, "front": "pergunta", "back": "resposta"}
  ]
}

Crie entre 8 e 12 flashcards baseados no conteúdo fornecido.`,
        },
        {
          role: "user",
          content: `Crie flashcards a partir deste texto:\n\n${text}`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao gerar flashcards:", error);
    return NextResponse.json(
      { error: "Erro ao gerar flashcards: " + error.message },
      { status: 500 }
    );
  }
}
