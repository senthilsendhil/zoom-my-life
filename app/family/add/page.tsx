'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/firebase/auth'
import { useRouter } from 'next/navigation'
import { addFamilyMember } from '@/lib/firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddFamilyMember() {
    const { user } = useAuth()
    const router = useRouter()
    const [name, setName] = useState('')
    const [relation, setRelation] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (user) {
            await addFamilyMember(user.uid, {
                name,
                relation,
                appointments: 0,
                labReports: 0,
                medications: 0
            })
            router.push('/dashboard')
        }
    }

    if (!user) {
        router.push('/login')
        return null
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Add Family Member</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="relation">Relation</Label>
                            <Input
                                id="relation"
                                value={relation}
                                onChange={(e) => setRelation(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit">Add Family Member</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}


