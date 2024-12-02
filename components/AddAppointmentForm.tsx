import { useState } from 'react'
import { addAppointment, Appointment } from '@/lib/firebase/firestore'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Timestamp } from 'firebase/firestore'

interface AddAppointmentFormProps {
    userId: string
    memberId: string
    onAdd: (appointment: Appointment) => void
}

export default function AddAppointmentForm({ userId, memberId, onAdd }: AddAppointmentFormProps) {
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const timestamp = Timestamp.fromDate(new Date(date))
        const newAppointment = await addAppointment(userId, memberId, { date: timestamp, description })
        onAdd({ id: newAppointment, date: timestamp, description })
        setDate('')
        setDescription('')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Add Appointment</Button>
        </form>
    )
}

