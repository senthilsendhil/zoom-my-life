import { useState } from 'react'
import { addLabReport, LabReport } from '@/lib/firebase/firestore'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Timestamp } from 'firebase/firestore'

interface AddLabReportFormProps {
    userId: string
    memberId: string
    onAdd: (labReport: LabReport) => void
}

export default function AddLabReportForm({ userId, memberId, onAdd }: AddLabReportFormProps) {
    const [date, setDate] = useState('')
    const [testName, setTestName] = useState('')
    const [result, setResult] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const timestamp = Timestamp.fromDate(new Date(date))
        const newLabReport = await addLabReport(userId, memberId, { date: timestamp, testName, result })
        onAdd({ id: newLabReport, date: timestamp, testName, result })
        setDate('')
        setTestName('')
        setResult('')
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
                <Label htmlFor="testName">Test Name</Label>
                <Input
                    id="testName"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="result">Result</Label>
                <Input
                    id="result"
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Add Lab Report</Button>
        </form>
    )
}
