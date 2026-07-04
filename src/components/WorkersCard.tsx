import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { ListContainer } from '@/components/ListContainer'

type Worker = {
    name: string
    role: string
    active?: boolean
}

type WorkersCardProps = {
    workers: Worker[]
}

export function WorkersCard({ workers }: WorkersCardProps) {
    const activeCount = workers.filter((worker) => worker.active).length

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
                    <ListContainer key={worker.name} {...worker} />
                ))}
            </ScrollView>
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
