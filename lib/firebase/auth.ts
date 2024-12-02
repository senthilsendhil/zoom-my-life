import { useState } from 'react'
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, googleProvider } from './firebaseConfig'
import { useFirebase } from '@/components/firebase-provider'

export function useAuth() {
    const { user, loading } = useFirebase()
    const [error, setError] = useState<string | null>(null)

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setError('Failed to sign in')
            throw error
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setError('Failed to create an account')
            throw error
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            setError('Failed to sign in with Google')
            throw error
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            setError('Failed to log out')
            throw error
        }
    }

    return { user, loading, error, signIn, signUp, signInWithGoogle, logOut }
}

