import { View, StyleSheet, Text, } from 'react-native'
import { ScreenBackground } from '@/components/ScreenBackground'
import { CalendarContainer } from '@/components/CalendarContainer'

const CalendarScreen = () => {

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <CalendarContainer />
      </View>
    </ScreenBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CalendarScreen
