import { useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, Pressable } from 'react-native'
import { CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars'
import { Ionicons } from '@expo/vector-icons'
import { ScreenBackground, SCREEN_PADDING } from '@/components/ScreenBackground'
import { Colors } from '@/theme/colors'

const today = new Date().toLocaleDateString('en-CA')

const WEEK_CALENDAR_THEME = {
  calendarBackground: 'transparent',
  dayTextColor: Colors.white,
  todayTextColor: Colors.accent,
  selectedDayBackgroundColor: Colors.backgroundAlt,
  selectedDayTextColor: Colors.white,
  textSectionTitleColor: Colors.iconInactive,
} as const

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(today)
  const { width: windowWidth } = useWindowDimensions()

  // Window width minus ScreenBackground's own padding and this box's padding.
  const calendarWidth = windowWidth - SCREEN_PADDING * 2

  return (
    <ScreenBackground>
      <View style={{ flex: 1, gap: 16 }}>
        <View style={{ gap: 4 }}>
          <Text style={styles.dateText}>Липень 4, субота</Text>
          <Text style={styles.greetingText}>Хорошого робочого дня, Михайло</Text>
        </View>
        <View style={{ gap: 4 }}>
          <View style={{
            paddingVertical: 12, paddingHorizontal: 12, borderRadius: 24, borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0, backgroundColor: Colors.accent, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <Text>
              Липень 2026
            </Text>
            <View style={{ flexDirection: 'row', gap: 32 }}>
              <Pressable>
                <Ionicons name="chevron-back" size={20} color={Colors.white} />
              </Pressable>
              <Pressable>
                <Ionicons name="chevron-forward" size={20} color={Colors.white} />
              </Pressable>
            </View>
          </View>
          <View style={styles.box}>
            {calendarWidth > 0 && (
              <CalendarProvider
                date={selectedDate}
                onDateChanged={setSelectedDate}
                disableAutoDaySelection={[ExpandableCalendar.navigationTypes.WEEK_SCROLL]}
                style={styles.provider}
              >
                <WeekCalendar
                  firstDay={1}
                  calendarWidth={calendarWidth}
                  theme={WEEK_CALENDAR_THEME}
                />
              </CalendarProvider>
            )}
          </View>
        </View>
      </View>
    </ScreenBackground>
  )
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 6,
    borderRadius: 24,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: Colors.accent,
  },
  provider: {
    flex: 0,
    alignSelf: 'stretch',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  greetingText: {
    fontSize: 14,
    color: Colors.white,
  },
})

export default CalendarScreen
