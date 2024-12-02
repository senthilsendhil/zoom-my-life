'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/firebase/auth'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
    const { user, loading } = useAuth()

    return (
        <header className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Zoom My Life
                </Link>
                <nav>
                    <ul className="flex space-x-4 items-center">
                        {!loading && (
                            <>
                                {user ? (
                                    <>
                                        <li>
                                            <Link href="/dashboard">
                                                <Button variant="ghost">Dashboard</Button>
                                            </Link>
                                        </li>
                                        <li>
                                            <UserNav />
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link href="/login">
                                            <Button variant="secondary">Login</Button>
                                        </Link>
                                    </li>
                                )}
                            </>
                        )}
                        <li>
                            <ThemeToggle />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
