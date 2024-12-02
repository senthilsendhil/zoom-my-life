'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/firebase/auth'
import { getFamilyMembers, FamilyMember } from '@/lib/firebase/firestore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import FamilyMemberDetails from '@/components/FamilyMemberDetails'

export default function Dashboard() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        } else if (user) {
            getFamilyMembers(user.uid).then(setFamilyMembers)
        }
    }, [user, loading, router])

    if (loading) return <div>Loading...</div>
    if (!user) return null

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Family Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyMembers.map((member) => (
                    <Card key={member.id}>
                        <CardHeader>
                            <CardTitle>{member.name}</CardTitle>
                            <CardDescription>{member.relation}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Appointments: {member.appointments}</p>
                            <p>Lab Reports: {member.labReports}</p>
                            <p>Medications: {member.medications}</p>
                            <Button className="mt-2" onClick={() => setSelectedMemberId(member.id)}>
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Link href="/family/add">
                <Button className="mt-4">Add Family Member</Button>
            </Link>
            {selectedMemberId && (
                <FamilyMemberDetails id={selectedMemberId} onClose={() => setSelectedMemberId(null)} />
            )}
        </div>
    )
}

