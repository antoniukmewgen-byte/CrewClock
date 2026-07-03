import { View, Pressable, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import type { BottomTabBarProps } from 'expo-router/js-tabs'

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home',
  calendar: 'calendar',
  worker: 'person',
  report: 'bar-chart',
}

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <BlurView intensity={40} tint="dark" style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index
          const baseIcon = ICONS[route.name] ?? 'ellipse'
          const iconName = focused ? baseIcon : (`${baseIcon}-outline` as keyof typeof Ionicons.glyphMap)

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[styles.item, focused && styles.itemActive]}
            >
              <Ionicons name={iconName} size={20} color={focused ? '#34d399' : '#e5e7eb'} />
            </Pressable>
          )
        })}
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    borderRadius: 999,
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(10, 30, 20, 0.55)',
    gap: 14,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 999,
  },
  itemActive: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
  },
})
