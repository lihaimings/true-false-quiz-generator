import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'True or False Quiz Generator',
  description: 'Create printable true or false quizzes instantly by entering your statements and answers.',
  keywords: ['quiz', 'true or false', 'education', 'quiz generator', 'printable quiz'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
