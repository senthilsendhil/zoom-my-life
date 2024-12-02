import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-12">
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Welcome to Zoom My Life</h1>
                <p className="text-xl mb-8">Manage your family's health information in one place</p>
                <Link href="/login">
                    <Button size="lg">Get Started</Button>
                </Link>
            </section>

            <section className="grid md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Family Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            View and manage health information for all your family members in one centralized dashboard.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Appointment Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Keep track of all medical appointments for each family member, ensuring you never miss an important visit.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Lab Reports & Medications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Store and access lab reports and manage medication information for easy reference and tracking.
                        </CardDescription>
                    </CardContent>
                </Card>
            </section>

            <section className="text-center mt-12">
                <h2 className="text-2xl font-bold mb-4">Ready to take control of your family's health?</h2>
                <Link href="/login">
                    <Button size="lg">Sign Up Now</Button>
                </Link>
            </section>
        </div>
    )
}

