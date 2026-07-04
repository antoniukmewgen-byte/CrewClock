import { useMemo, useRef, useState } from 'react'
import {
    FlatList,
    type LayoutChangeEvent,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { BlurView } from 'expo-blur'
import { addDays, addWeeks, format, isSameDay, isToday, startOfWeek } from 'date-fns'
import { uk } from 'date-fns/locale'
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const WEEKDAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
const WEEK_RANGE = 104

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

function IconButton({ name, onPress }: { name: keyof typeof Ionicons.glyphMap; onPress: () => void }) {
    const scale = useSharedValue(1)
    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }))

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => { scale.value = withTiming(0.88, { duration: 100 }) }}
            onPressOut={() => { scale.value = withTiming(1, { duration: 150 }) }}
            hitSlop={8}
        >
            <Animated.View style={[styles.iconButton, animatedStyle]}>
                <Ionicons name={name} size={20} color={Colors.iconInactive} />
            </Animated.View>
        </Pressable>
    )
}

export function CalendarContainer() {
    const anchorWeekStart = useMemo(() => startOfWeek(new Date(), { weekStartsOn: 1 }), [])
    const weekOffsets = useMemo(
        () => Array.from({ length: WEEK_RANGE * 2 + 1 }, (_, i) => i - WEEK_RANGE),
        [],
    )

    const flatListRef = useRef<FlatList<number>>(null)
    const [pageWidth, setPageWidth] = useState<number | null>(null)
    const [currentIndex, setCurrentIndex] = useState(WEEK_RANGE)
    const [selectedDate, setSelectedDate] = useState(() => new Date())

    const currentWeekStart = addWeeks(anchorWeekStart, weekOffsets[currentIndex])
    const monthYearLabel = capitalize(format(addDays(currentWeekStart, 3), 'LLLL yyyy', { locale: uk }))

    const handleContainerLayout = (event: LayoutChangeEvent) => {
        setPageWidth(event.nativeEvent.layout.width)
    }

    const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!pageWidth) return
        const index = Math.round(event.nativeEvent.contentOffset.x / pageWidth)
        setCurrentIndex(index)
    }

    const navigateWeek = (direction: 1 | -1) => {
        const nextIndex = currentIndex + direction
        if (nextIndex < 0 || nextIndex >= weekOffsets.length) return
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
        setCurrentIndex(nextIndex)
    }

    const renderWeekPage = ({ item: offset }: { item: number }) => {
        const weekStart = addWeeks(anchorWeekStart, offset)
        const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

        return (
            <View style={[styles.daysContainer, { width: pageWidth ?? undefined }]}>
                {days.map((day, index) => {
                    const today = isToday(day)
                    const selected = isSameDay(day, selectedDate)
                    const isWeekend = index >= 5
                    return (
                        <Pressable
                            key={day.toISOString()}
                            onPress={() => setSelectedDate(day)}
                            hitSlop={4}
                            style={({ pressed }) => [
                                styles.dayBadge,
                                today && !selected && styles.dayBadgeToday,
                                selected && styles.dayBadgeSelected,
                                pressed && styles.dayBadgePressed,
                            ]}
                        >
                            <Text style={[
                                styles.dayText,
                                isWeekend && !selected && styles.dayTextWeekend,
                                selected && styles.dayTextSelected,
                            ]}>
                                {format(day, 'd')}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
        )
    }

    return (
        <BlurView intensity={40} tint="dark" style={styles.container}>
            <View style={styles.headerContainer}>
                <IconButton name="chevron-back" onPress={() => navigateWeek(-1)} />
                <Animated.Text key={monthYearLabel} entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} style={styles.monthText}>
                    {monthYearLabel}
                </Animated.Text>
                <IconButton name="chevron-forward" onPress={() => navigateWeek(1)} />
            </View>
            <View style={styles.divider} />
            <View style={styles.bodyContainer}>
                <View style={styles.daysContainer}>
                    {WEEKDAY_LABELS.map((label, index) => {
                        const isWeekend = index >= 5
                        return (
                            <Text key={label} style={[styles.weekdayText, isWeekend && styles.weekdayTextWeekend]}>
                                {label}
                            </Text>
                        )
                    })}
                </View>
                <View onLayout={handleContainerLayout}>
                    {pageWidth != null && (
                        <FlatList
                            ref={flatListRef}
                            style={{ width: pageWidth }}
                            data={weekOffsets}
                            keyExtractor={(offset) => String(offset)}
                            renderItem={renderWeekPage}
                            horizontal
                            pagingEnabled
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            initialScrollIndex={WEEK_RANGE}
                            getItemLayout={(_, index) => ({ length: pageWidth, offset: pageWidth * index, index })}
                            onMomentumScrollEnd={handleMomentumScrollEnd}
                        />
                    )}
                </View>
            </View>
        </BlurView>
    )
}


const styles = StyleSheet.create({
    container: {
        gap: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
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
        backgroundColor: Colors.tabBarActiveBackground,
    },
    monthText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    bodyContainer: {
        gap: 8,
    },

    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    weekdayText: {
        color: Colors.iconInactive,
        fontSize: 14,
        width: 36,
        textAlign: 'center',
    },
    weekdayTextWeekend: {
        color: Colors.weekend,
        fontWeight: '600',
    },
    dayBadge: {
        width: 36,
        height: 36,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    dayBadgeToday: {
        borderColor: Colors.accent,
    },
    dayBadgeSelected: {
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
    },
    dayBadgePressed: {
        opacity: 0.7,
    },
    dayText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    dayTextSelected: {
        color: Colors.background,
    },
    dayTextWeekend: {
        color: Colors.weekend,
    },
})
