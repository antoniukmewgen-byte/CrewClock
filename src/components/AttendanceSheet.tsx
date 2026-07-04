import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'

export type AttendanceStatus = 'worked' | 'absent' | 'sick' | 'vacation'

export type Attendance = {
    status: AttendanceStatus
    hours?: number
}

type AttendanceSheetProps = {
    visible: boolean
    workerName: string | null
    initialValue?: Attendance
    onClose: () => void
    onSave: (value: Attendance) => void
}

const ABSENCE_OPTIONS: { status: AttendanceStatus; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { status: 'absent', label: 'Не з’явився', icon: 'close-circle-outline' },
    { status: 'sick', label: 'Лікарняний', icon: 'medkit-outline' },
    { status: 'vacation', label: 'Відпустка', icon: 'airplane-outline' },
]

const DEFAULT_HOURS = 8
const MAX_HOURS = 24

export function AttendanceSheet({ visible, workerName, initialValue, onClose, onSave }: AttendanceSheetProps) {
    const [mode, setMode] = useState<'worked' | 'absence'>('worked')
    const [hours, setHours] = useState(DEFAULT_HOURS)
    const [absenceStatus, setAbsenceStatus] = useState<AttendanceStatus>('absent')

    useEffect(() => {
        if (!visible) return
        if (!initialValue || initialValue.status === 'worked') {
            setMode('worked')
            setHours(initialValue?.hours ?? DEFAULT_HOURS)
        } else {
            setMode('absence')
            setAbsenceStatus(initialValue.status)
        }
    }, [visible, initialValue])

    const adjustHours = (delta: number) => {
        setHours((prev) => Math.min(MAX_HOURS, Math.max(0, prev + delta)))
    }

    const handleHoursChange = (text: string) => {
        const digitsOnly = text.replace(/[^0-9]/g, '')
        if (digitsOnly === '') {
            setHours(0)
            return
        }
        setHours(Math.min(MAX_HOURS, parseInt(digitsOnly, 10)))
    }

    const handleSave = () => {
        onSave(mode === 'worked' ? { status: 'worked', hours } : { status: absenceStatus })
    }

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
                <View style={styles.sheet}>
                    <View style={styles.handle} />
                    <Text style={styles.title} numberOfLines={1}>{workerName}</Text>

                    <View style={styles.modeSwitch}>
                        <Pressable
                            style={[styles.modeButton, mode === 'worked' && styles.modeButtonActive]}
                            onPress={() => setMode('worked')}
                        >
                            <Text style={[styles.modeButtonText, mode === 'worked' && styles.modeButtonTextActive]}>
                                Відпрацював
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.modeButton, mode === 'absence' && styles.modeButtonActive]}
                            onPress={() => setMode('absence')}
                        >
                            <Text style={[styles.modeButtonText, mode === 'absence' && styles.modeButtonTextActive]}>
                                Відсутність
                            </Text>
                        </Pressable>
                    </View>

                    {mode === 'worked' ? (
                        <View style={styles.hoursRow}>
                            <Pressable style={styles.stepButton} onPress={() => adjustHours(-1)} hitSlop={8}>
                                <Ionicons name="remove" size={20} color={Colors.white} />
                            </Pressable>
                            <View style={styles.hoursValue}>
                                <TextInput
                                    style={styles.hoursInput}
                                    keyboardType="number-pad"
                                    value={String(hours)}
                                    onChangeText={handleHoursChange}
                                    selectTextOnFocus
                                    underlineColorAndroid="transparent"
                                    maxLength={2}
                                />
                                <Text style={styles.hoursLabel}>год</Text>
                            </View>
                            <Pressable style={styles.stepButton} onPress={() => adjustHours(1)} hitSlop={8}>
                                <Ionicons name="add" size={20} color={Colors.white} />
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.optionsList}>
                            {ABSENCE_OPTIONS.map((option) => {
                                const selected = absenceStatus === option.status
                                return (
                                    <Pressable
                                        key={option.status}
                                        style={[styles.optionRow, selected && styles.optionRowSelected]}
                                        onPress={() => setAbsenceStatus(option.status)}
                                    >
                                        <Ionicons
                                            name={option.icon}
                                            size={18}
                                            color={selected ? Colors.accent : Colors.iconInactive}
                                        />
                                        <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    )}

                    <Pressable style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Зберегти</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: Colors.backgroundAlt,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 20,
        gap: 16,
    },
    handle: {
        width: 36,
        height: 4,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'center',
    },
    title: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modeSwitch: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 14,
        padding: 4,
        gap: 4,
    },
    modeButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    modeButtonActive: {
        backgroundColor: Colors.tabBarActiveBackground,
    },
    modeButtonText: {
        color: Colors.iconInactive,
        fontSize: 14,
        fontWeight: '600',
    },
    modeButtonTextActive: {
        color: Colors.accent,
    },
    hoursRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    stepButton: {
        width: 44,
        height: 44,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
    hoursValue: {
        alignItems: 'center',
        minWidth: 80,
    },
    hoursInput: {
        color: Colors.white,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        minWidth: 60,
        padding: 0,
    },
    hoursLabel: {
        color: Colors.iconInactive,
        fontSize: 13,
    },
    optionsList: {
        gap: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    optionRowSelected: {
        backgroundColor: Colors.tabBarActiveBackground,
        borderColor: Colors.accent,
    },
    optionLabel: {
        color: Colors.iconInactive,
        fontSize: 15,
    },
    optionLabelSelected: {
        color: Colors.accent,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: Colors.accent,
        borderRadius: 999,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveButtonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
})
