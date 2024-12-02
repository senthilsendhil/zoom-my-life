"use client"

import { useAuth } from '@/lib/firebase/auth'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
    const { signInWithGoogle } = useAuth()
    const router = useRouter()

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
            router.push('/dashboard')
        } catch (error) {
            console.error('Login error:', error)
            // Handle login error (e.g., show error message)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login to Zoom My Life</CardTitle>
                    <CardDescription>Manage your family's health information securely</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleGoogleSignIn} className="w-full">
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                        </svg>
                        Sign in with Google
                    </Button>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground text-center">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

