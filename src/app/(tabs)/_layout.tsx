import { Tabs } from 'expo-router/js-tabs'
import { FloatingTabBar } from '@/components/FloatingTabBar'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="worker" options={{ title: 'Worker' }} />
      <Tabs.Screen name="report" options={{ title: 'Report' }} />
    </Tabs>
  )
}