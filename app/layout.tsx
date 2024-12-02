import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FirebaseProvider } from '@/components/firebase-provider'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Zoom My Life - Family Health Management',
    description: 'Manage your family\'s health information in one place',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <FirebaseProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <footer className="bg-[var(--primary)] text-white py-4">
                    <div className="container mx-auto text-center">
                        © 2023 Zoom My Life. All rights reserved.
                    </div>
                </footer>
            </div>
        </FirebaseProvider>
        </body>
        </html>
    )
}

