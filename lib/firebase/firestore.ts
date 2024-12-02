import { db } from './firebaseConfig'
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    QueryConstraint
} from 'firebase/firestore'

export interface FamilyMember {
    id: string
    name: string
    relation: string
    appointments: number
    labReports: number
    medications: number
}

export interface Appointment {
    id: string
    date: Timestamp
    description: string
}

export interface LabReport {
    id: string
    date: Timestamp
    testName: string
    result: string
}

export interface Medication {
    id: string
    name: string
    dosage: string
    frequency: string
}

export const addFamilyMember = async (userId: string, familyMember: Omit<FamilyMember, 'id'>) => {
    const docRef = await addDoc(collection(db, 'users', userId, 'familyMembers'), familyMember)
    return docRef.id
}

export const getFamilyMembers = async (
    userId: string,
    sortBy: 'name' | 'relation' = 'name',
    sortDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
): Promise<FamilyMember[]> => {
    const constraints: QueryConstraint[] = [orderBy(sortBy, sortDirection)]

    if (limitCount) {
        constraints.push(limit(limitCount))
    }

    const q = query(collection(db, 'users', userId, 'familyMembers'), ...constraints)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FamilyMember))
}

export const getFamilyMember = async (userId: string, memberId: string): Promise<FamilyMember | null> => {
    const docRef = doc(db, 'users', userId, 'familyMembers', memberId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as FamilyMember : null
}

export const updateFamilyMember = async (userId: string, memberId: string, data: Partial<FamilyMember>) => {
    const docRef = doc(db, 'users', userId, 'familyMembers', memberId)
    await updateDoc(docRef, data)
}

export const deleteFamilyMember = async (userId: string, memberId: string) => {
    await deleteDoc(doc(db, 'users', userId, 'familyMembers', memberId))
}

export const addAppointment = async (userId: string, memberId: string, appointment: Omit<Appointment, 'id'>) => {
    const docRef = await addDoc(collection(db, 'users', userId, 'familyMembers', memberId, 'appointments'), appointment)
    await updateDoc(doc(db, 'users', userId, 'familyMembers', memberId), {
        appointments: (await getAppointments(userId, memberId)).length
    })
    return docRef.id
}

export const getAppointments = async (userId: string, memberId: string): Promise<Appointment[]> => {
    const q = query(
        collection(db, 'users', userId, 'familyMembers', memberId, 'appointments'),
        orderBy('date', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment))
}

export const addLabReport = async (userId: string, memberId: string, labReport: Omit<LabReport, 'id'>) => {
    const docRef = await addDoc(collection(db, 'users', userId, 'familyMembers', memberId, 'labReports'), labReport)
    await updateDoc(doc(db, 'users', userId, 'familyMembers', memberId), {
        labReports: (await getLabReports(userId, memberId)).length
    })
    return docRef.id
}

export const getLabReports = async (userId: string, memberId: string): Promise<LabReport[]> => {
    const q = query(
        collection(db, 'users', userId, 'familyMembers', memberId, 'labReports'),
        orderBy('date', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LabReport))
}

export const addMedication = async (userId: string, memberId: string, medication: Omit<Medication, 'id'>) => {
    const docRef = await addDoc(collection(db, 'users', userId, 'familyMembers', memberId, 'medications'), medication)
    await updateDoc(doc(db, 'users', userId, 'familyMembers', memberId), {
        medications: (await getMedications(userId, memberId)).length
    })
    return docRef.id
}

export const getMedications = async (userId: string, memberId: string): Promise<Medication[]> => {
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'familyMembers', memberId, 'medications'))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medication))
}

export const getRecentAppointments = async (userId: string, memberId: string, limitCount: number = 5): Promise<Appointment[]> => {
    const q = query(
        collection(db, 'users', userId, 'familyMembers', memberId, 'appointments'),
        orderBy('date', 'desc'),
        limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment))
}

export const getUpcomingAppointments = async (userId: string, memberId: string): Promise<Appointment[]> => {
    const now = Timestamp.now()
    const q = query(
        collection(db, 'users', userId, 'familyMembers', memberId, 'appointments'),
        where('date', '>=', now),
        orderBy('date', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment))
}

export const searchLabReports = async (userId: string, memberId: string, searchTerm: string): Promise<LabReport[]> => {
    const q = query(
        collection(db, 'users', userId, 'familyMembers', memberId, 'labReports'),
        where('testName', '>=', searchTerm),
        where('testName', '<=', searchTerm + '\uf8ff')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LabReport))
}

export const getMedicationsByFrequency = async (userId: string, memberId: string, frequency: string): Promise<Medication[]> => {
    const q = query(
        collection(db, 'users', userId, 'familyMembers', memberId, 'medications'),
        where('frequency', '==', frequency)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medication))
}

