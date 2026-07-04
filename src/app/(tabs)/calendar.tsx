import { useState } from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars'
import { ScreenBackground, SCREEN_PADDING } from '@/components/ScreenBackground'
import { Colors } from '@/theme/colors'

const today = new Date().toISOString().split('T')[0]

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
    </ScreenBackground>
  )
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 6,
    borderRadius: 24,
    backgroundColor: Colors.accent,
  },
  provider: {
    flex: 0,
    alignSelf: 'stretch',
  },
})

export default CalendarScreen
