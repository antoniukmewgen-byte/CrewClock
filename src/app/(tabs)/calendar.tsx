import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScreenBackground } from '@/components/ScreenBackground'
import { CalendarContainer } from '@/components/CalendarContainer'
import { WorkersCard } from '@/components/WorkersCard'
import { TAB_BAR_CLEARANCE } from '@/components/FloatingTabBar'

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
  const insets = useSafeAreaInsets()

  return (
    <ScreenBackground>
      <View style={[styles.container, { paddingBottom: insets.bottom + TAB_BAR_CLEARANCE + 16 }]}>
        <CalendarContainer />
        <WorkersCard workers={WORKERS} />
      </View>
    </ScreenBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
})

export default CalendarScreen
