import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
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

const STATUS_META: Record<AttendanceStatus, { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string; label: string }> = {
    worked: { icon: 'checkmark', color: Colors.accent, bg: Colors.tabBarActiveBackground, label: '' },
    absent: { icon: 'close', color: Colors.iconInactive, bg: 'rgba(255,255,255,0.06)', label: 'Не з’явився' },
    sick: { icon: 'medkit', color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', label: 'Лікарняний' },
    vacation: { icon: 'airplane', color: '#38bdf8', bg: 'rgba(56,189,248,0.15)', label: 'Відпустка' },
}

export function ListContainer({ name, role, status = 'worked', hours, onPress }: ListContainerProps) {
    const meta = STATUS_META[status]
    const isWorked = status === 'worked'
    const subtitle = isWorked
        ? (hours != null ? `${role} · ${hours} год` : role)
        : `${role} · ${meta.label}`

    return (
        <View style={styles.container}>
            <View style={[styles.avatar, isWorked ? styles.avatarActive : styles.avatarInactive]}>
                <Text style={[styles.avatarText, isWorked ? styles.avatarTextActive : styles.avatarTextInactive]}>
                    {getInitials(name)}
                </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.textName} numberOfLines={1}>{name}</Text>
                <Text style={styles.textRole} numberOfLines={1}>{subtitle}</Text>
            </View>
            <Pressable
                onPress={onPress}
                hitSlop={8}
                style={({ pressed }) => [
                    styles.statusBadge,
                    { backgroundColor: meta.bg },
                    pressed && styles.statusBadgePressed,
                ]}
            >
                <Ionicons name={meta.icon} size={16} color={meta.color} />
            </Pressable>
        </View>
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
    textRole: {
        color: Colors.iconInactive,
        fontSize: 13,
    },
    statusBadge: {
        width: 32,
        height: 32,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBadgePressed: {
        opacity: 0.7,
    },
})
