import { StyleSheet, View } from 'react-native'
import { ScreenBackground } from '@/components/ScreenBackground'

const WORKERS = [
  { name: 'Антонюк Євгеній', role: 'Муляр', active: true },
  { name: 'Ковальчук Ігор', role: 'Тесляр', active: true },
  { name: 'Мельник Олександр', role: 'Електрик', active: true },
  { name: 'Бондаренко Максим', role: 'Зварювальник', active: true },
  { name: 'Ткаченко Роман', role: 'Бригадир', active: true },
  { name: 'Шевченко Данило', role: 'Різнороб', active: true },
  { name: 'Кравець Віталій', role: 'Штукатур', active: false },
  { name: 'Гончарук Артем', role: 'Сантехнік', active: false },
  { name: 'Савчук Микола', role: 'Кранівник', active: false },
  { name: 'Лисенко Павло', role: 'Малярка', active: false },
]

const CalendarScreen = () => {
  return (
    <ScreenBackground>
      <View style={styles.container}>

      </View>
    </ScreenBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'green'
  },
})

export default CalendarScreen
