"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import FlashcardApp from './components/FlashcardApp';
import { useState } from 'react';

export default function Home() {
  const [documentName, setDocumentName] = useState(null);

  return (
    <CopilotKit 
      runtimeUrl="/api/copilotkit"
      showDevConsole={false}
    >
      <main>
        <FlashcardApp onDocumentChange={setDocumentName} />
      </main>
      <CopilotPopup
        instructions="Você é um assistente de estudo que ajuda a criar flashcards e quizzes a partir de documentos. Analise o conteúdo e gere perguntas relevantes e educativas."
        labels={{
          title: "Assistente de Estudo",
          initial: documentName 
            ? `Olá, me pergunte qualquer coisa sobre o documento "${documentName}".`
            : "Faça upload do seu documento e comece a perguntar.",
        }}
      />
    </CopilotKit>
  );
}
