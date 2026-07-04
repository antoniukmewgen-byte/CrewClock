import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'

type ListContainerProps = {
    name: string
    role: string
    active?: boolean
}

function getInitials(name: string) {
    return name
        .trim()
        .split(' ')
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
}

export function ListContainer({ name, role, active = true }: ListContainerProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.avatar, active ? styles.avatarActive : styles.avatarInactive]}>
                <Text style={[styles.avatarText, active ? styles.avatarTextActive : styles.avatarTextInactive]}>
                    {getInitials(name)}
                </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.textName} numberOfLines={1}>{name}</Text>
                <Text style={styles.textRole} numberOfLines={1}>{role}</Text>
            </View>
            <View style={[styles.statusBadge, active ? styles.statusBadgeActive : styles.statusBadgeInactive]}>
                <Ionicons
                    name={active ? 'checkmark' : 'close'}
                    size={16}
                    color={active ? Colors.accent : Colors.iconInactive}
                />
            </View>
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
    statusBadgeActive: {
        backgroundColor: Colors.tabBarActiveBackground,
    },
    statusBadgeInactive: {
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
})
