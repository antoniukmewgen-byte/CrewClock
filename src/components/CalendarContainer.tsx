import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { BlurView } from 'expo-blur'

export function CalendarContainer() {
    return (
            <BlurView intensity={40} tint="dark" style={styles.container}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => { }} style={styles.iconButton} hitSlop={8}>
                        <Ionicons name="chevron-back" size={20} color={Colors.iconInactive} />
                    </Pressable>
                    <Text style={styles.monthText}>Липень 2026</Text>
                    <Pressable onPress={() => { }} style={styles.iconButton} hitSlop={8}>
                        <Ionicons name="chevron-forward" size={20} color={Colors.iconInactive} />
                    </Pressable>
                </View>
                <View style={styles.divider} />
                <View style={styles.bodyContainer}>
                    <View style={styles.daysContainer}>
                        <Text style={{ color: Colors.white, fontSize: 14 }}>Пн</Text>
                        <Text style={{ color: Colors.white, fontSize: 14 }}>Вт</Text>
                        <Text style={{ color: Colors.white, fontSize: 14 }}>Ср</Text>
                        <Text style={{ color: Colors.white, fontSize: 14 }}>Чт</Text>
                        <Text style={{ color: Colors.white, fontSize: 14 }}>Пт</Text>
                        <Text style={{ color: Colors.white, fontSize: 14 }}>Сб</Text>
                        <Text style={{ color: Colors.white, fontSize: 14 }}>Нд</Text>
                    </View>
                    <View style={styles.daysContainer}>
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>1</Text>
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>2</Text>
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>3</Text>
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>4</Text>
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>5</Text>
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>6</Text>
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>7</Text>
                    </View>
                </View>
            </BlurView>
    )
}


const styles = StyleSheet.create({
    container: {
        gap: 12,
        padding: 24,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    divider: {
        height: 1,
        backgroundColor: Colors.white,
    },
    bodyContainer: {
        gap: 16
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
})