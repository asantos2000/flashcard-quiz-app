"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import FlashcardApp from './components/FlashcardApp';

export default function Home() {
  return (
    <CopilotKit 
      runtimeUrl="/api/copilotkit"
      showDevConsole={false}
    >
      <main>
        <FlashcardApp />
      </main>
      <CopilotPopup
        instructions="Você é um assistente de estudo que ajuda a criar flashcards e quizzes a partir de documentos. Analise o conteúdo e gere perguntas relevantes e educativas."
        labels={{
          title: "Assistente de Estudo",
          initial: "Olá! Posso ajudar a criar flashcards e quizzes do seu documento.",
        }}
      />
    </CopilotKit>
  );
}
