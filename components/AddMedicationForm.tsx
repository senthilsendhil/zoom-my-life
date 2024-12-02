import { useState } from 'react'
import { addMedication, Medication } from '@/lib/firebase/firestore'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddMedicationFormProps {
    userId: string
    memberId: string
    onAdd: (medication: Medication) => void
}

export default function AddMedicationForm({ userId, memberId, onAdd }: AddMedicationFormProps) {
    const [name, setName] = useState('')
    const [dosage, setDosage] = useState('')
    const [frequency, setFrequency] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newMedication = await addMedication(userId, memberId, { name, dosage, frequency })
        onAdd({ id: newMedication, name, dosage, frequency })
        setName('')
        setDosage('')
        setFrequency('')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
                <Label htmlFor="name">Medication Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                    id="dosage"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Add Medication</Button>
        </form>
    )
}

