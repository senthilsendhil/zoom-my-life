'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/firebase/auth'
import { getFamilyMember, getAppointments, getLabReports, getMedications, FamilyMember, Appointment, LabReport, Medication } from '@/lib/firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import AddAppointmentForm from '@/components/AddAppointmentForm'
import AddLabReportForm from '@/components/AddLabReportForm'
import AddMedicationForm from '@/components/AddMedicationForm'

interface FamilyMemberDetailsProps {
    id: string
    onClose: () => void
}

export default function FamilyMemberDetails({ id, onClose }: FamilyMemberDetailsProps) {
    const { user } = useAuth()
    const [member, setMember] = useState<FamilyMember | null>(null)
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [labReports, setLabReports] = useState<LabReport[]>([])
    const [medications, setMedications] = useState<Medication[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            if (!user) {
                setError('User not authenticated')
                setLoading(false)
                return
            }

            try {
                const memberData = await getFamilyMember(user.uid, id)
                if (!memberData) {
                    setError('Family member not found')
                    return
                }
                setMember(memberData)

                const [appointmentsData, labReportsData, medicationsData] = await Promise.all([
                    getAppointments(user.uid, id),
                    getLabReports(user.uid, id),
                    getMedications(user.uid, id)
                ])

                setAppointments(appointmentsData)
                setLabReports(labReportsData)
                setMedications(medicationsData)
            } catch (err) {
                console.error('Error fetching data:', err)
                setError('An error occurred while fetching data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user, id])

    if (loading) return <div className="mt-4">Loading...</div>
    if (error) return <div className="mt-4">Error: {error}</div>
    if (!user) return <div className="mt-4">Please log in to view family member details</div>
    if (!member) return <div className="mt-4">Family member not found</div>

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{member.name}&apos;s Details</h2>
                <Button onClick={onClose}>Close</Button>
            </div>
            <Tabs defaultValue="appointments">
                <TabsList>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="labReports">Lab Reports</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                </TabsList>
                <TabsContent value="appointments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {appointments.map((appointment) => (
                                <div key={appointment.id} className="mb-2">
                                    <p><strong>Date:</strong> {appointment.date.toDate().toLocaleDateString()}</p>
                                    <p><strong>Description:</strong> {appointment.description}</p>
                                </div>
                            ))}
                            <AddAppointmentForm userId={user?.uid} memberId={id} onAdd={(newAppointment) => setAppointments([...appointments, newAppointment])} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="labReports">
                    <Card>
                        <CardHeader>
                            <CardTitle>Lab Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {labReports.map((report) => (
                                <div key={report.id} className="mb-2">
                                    <p><strong>Date:</strong> {report.date.toDate().toLocaleDateString()}</p>
                                    <p><strong>Test Name:</strong> {report.testName}</p>
                                    <p><strong>Result:</strong> {report.result}</p>
                                </div>
                            ))}
                            <AddLabReportForm userId={user?.uid} memberId={id} onAdd={(newReport) => setLabReports([...labReports, newReport])} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="medications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Medications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {medications.map((medication) => (
                                <div key={medication.id} className="mb-2">
                                    <p><strong>Name:</strong> {medication.name}</p>
                                    <p><strong>Dosage:</strong> {medication.dosage}</p>
                                    <p><strong>Frequency:</strong> {medication.frequency}</p>
                                </div>
                            ))}
                            <AddMedicationForm userId={user?.uid} memberId={id} onAdd={(newMedication) => setMedications([...medications, newMedication])} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

