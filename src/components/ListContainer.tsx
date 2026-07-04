import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/theme/colors'
import type { AttendanceStatus } from '@/components/AttendanceSheet'

type ListContainerProps = {
    name: string
    role: string
    status?: AttendanceStatus
    hours?: number
    onPress?: () => void
}

function getInitials(name: string) {
    return name
        .trim()
        .split(' ')
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
}

const STATUS_META: Record<AttendanceStatus, { color: string; bg: string; label: string }> = {
    worked: { color: Colors.accent, bg: Colors.tabBarActiveBackground, label: '' },
    absent: { color: Colors.weekend, bg: 'rgba(248,113,113,0.15)', label: 'Не з’явився' },
    sick: { color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', label: 'Лікарняний' },
    vacation: { color: '#38bdf8', bg: 'rgba(56,189,248,0.15)', label: 'Відпустка' },
}

export function ListContainer({ name, status, hours, onPress }: ListContainerProps) {
    const meta = status ? STATUS_META[status] : null
    const isWorked = status === 'worked'
    const valueLabel = status === 'worked'
        ? (hours != null ? `${hours} год` : 'Вказати')
        : meta?.label

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}
        >
            <View style={[styles.avatar, isWorked ? styles.avatarActive : styles.avatarInactive]}>
                <Text style={[styles.avatarText, isWorked ? styles.avatarTextActive : styles.avatarTextInactive]}>
                    {getInitials(name)}
                </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.textName} numberOfLines={1}>{name}</Text>
            </View>
            {meta && valueLabel ? (
                <View style={[styles.valueBox, { backgroundColor: meta.bg }]}>
                    <Text style={[styles.valueText, { color: meta.color }]} numberOfLines={1}>
                        {valueLabel}
                    </Text>
                </View>
            ) : null}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#16271D',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#33443A',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    containerPressed: {
        opacity: 0.8,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarActive: {
        backgroundColor: Colors.tabBarActiveBackground,
    },
    avatarInactive: {
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
    avatarText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    avatarTextActive: {
        color: Colors.accent,
    },
    avatarTextInactive: {
        color: Colors.iconInactive,
    },
    content: {
        flex: 1,
        gap: 2,
    },
    textName: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    valueBox: {
        maxWidth: 120,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    valueText: {
        fontSize: 14,
        fontWeight: '700',
    },
})
