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
          content: `Você é um assistente educacional que cria quizzes de múltipla escolha.
Analise o texto fornecido e crie questões desafiadoras mas justas.
Cada questão deve ter:
- question: A pergunta clara
- options: Array com exatamente 4 opções de resposta
- correctAnswer: Índice (0-3) da resposta correta

Retorne APENAS um JSON válido no formato:
{
  "questions": [
    {
      "id": 1,
      "question": "Qual é...?",
      "options": ["opção 1", "opção 2", "opção 3", "opção 4"],
      "correctAnswer": 0
    }
  ]
}

Crie entre 5 e 8 questões baseadas no conteúdo fornecido.`,
        },
        {
          role: "user",
          content: `Crie um quiz de múltipla escolha a partir deste texto:\n\n${text}`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao gerar quiz:", error);
    return NextResponse.json(
      { error: "Erro ao gerar quiz: " + error.message },
      { status: 500 }
    );
  }
}
