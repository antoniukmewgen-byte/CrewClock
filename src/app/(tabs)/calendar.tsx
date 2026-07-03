import { useState } from 'react'
import { View } from 'react-native'
import { CalendarProvider, WeekCalendar } from 'react-native-calendars'
import { ScreenBackground } from '@/components/ScreenBackground'
import { Colors } from '@/theme/colors'

const today = new Date().toISOString().split('T')[0]

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(today)

  return (
    <ScreenBackground>
      <View style={{
        padding: 5,
        height: 150,
        backgroundColor: Colors.accent,
      }}>
        <CalendarProvider date={selectedDate} onDateChanged={setSelectedDate}>
          <WeekCalendar
            firstDay={1}
            theme={{
              calendarBackground: 'transparent',
              dayTextColor: Colors.white,
              todayTextColor: Colors.accent,
              selectedDayBackgroundColor: Colors.backgroundAlt,
              selectedDayTextColor: Colors.white,
              textSectionTitleColor: Colors.iconInactive,
            }}
          />
        </CalendarProvider>
      </View>
    </ScreenBackground>
  )
}

export default CalendarScreen
