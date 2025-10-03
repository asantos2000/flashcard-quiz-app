import './globals.css'

export const metadata = {
  title: 'Gerador de Flashcards e Quiz com IA',
  description: 'Aplicação de estudo com IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
