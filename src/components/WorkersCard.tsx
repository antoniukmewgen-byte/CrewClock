import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { ListContainer } from '@/components/ListContainer'
import { AttendanceSheet, type Attendance } from '@/components/AttendanceSheet'

type Worker = {
    name: string
    role: string
    active?: boolean
}

type WorkersCardProps = {
    workers: Worker[]
}

function initialAttendance(workers: Worker[]): Record<string, Attendance> {
    return workers.reduce<Record<string, Attendance>>((acc, worker) => {
        acc[worker.name] = worker.active === false ? { status: 'absent' } : { status: 'worked', hours: 8 }
        return acc
    }, {})
}

export function WorkersCard({ workers }: WorkersCardProps) {
    const [attendance, setAttendance] = useState<Record<string, Attendance>>(() => initialAttendance(workers))
    const [selectedWorker, setSelectedWorker] = useState<string | null>(null)

    const activeCount = Object.values(attendance).filter((entry) => entry.status === 'worked').length

    const handleSave = (value: Attendance) => {
        if (selectedWorker) {
            setAttendance((prev) => ({ ...prev, [selectedWorker]: value }))
        }
        setSelectedWorker(null)
    }

    return (
        <BlurView intensity={40} tint="dark" style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.textLabel}>ПРАЦІВНИКІВ</Text>
                <Text style={styles.textValue}>{activeCount} активних</Text>
            </View>
            <View style={styles.divider} />
            <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {workers.map((worker) => (
                    <ListContainer
                        key={worker.name}
                        name={worker.name}
                        role={worker.role}
                        status={attendance[worker.name]?.status}
                        hours={attendance[worker.name]?.hours}
                        onPress={() => setSelectedWorker(worker.name)}
                    />
                ))}
            </ScrollView>
            <AttendanceSheet
                visible={selectedWorker !== null}
                workerName={selectedWorker}
                initialValue={selectedWorker ? attendance[selectedWorker] : undefined}
                onClose={() => setSelectedWorker(null)}
                onSave={handleSave}
            />
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12,
    },
    textLabel: {
        color: '#9BBFAB',
        fontSize: 14,
        fontWeight: 'bold',
    },
    textValue: {
        color: '#9BBFAB',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    list: {
        flex: 1,
    },
    listContent: {
        gap: 10,
        paddingVertical: 12,
    },
})
