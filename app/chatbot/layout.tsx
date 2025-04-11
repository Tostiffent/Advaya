import { ReactNode } from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import ChatbotPage from "./page.tsx"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chatbot App',
  description: 'A secure chatbot application with Clerk authentication',
};

export default function Layout() {
  return (
    <>
          <SignedIn>
            <ChatbotPage/>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
    </>
  );
}