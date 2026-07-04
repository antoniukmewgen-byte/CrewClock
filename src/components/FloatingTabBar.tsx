import { View, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import type { BottomTabBarProps } from 'expo-router/js-tabs'
import { SCREEN_PADDING } from '@/components/ScreenBackground'
import { Colors } from '@/theme/colors'

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  calendar: 'calendar',
  worker: 'person',
  report: 'bar-chart',
}

const ITEM_SIZE = 44
const BAR_VERTICAL_PADDING = 8
const BAR_BOTTOM_OFFSET = 4

export const TAB_BAR_HEIGHT = ITEM_SIZE + BAR_VERTICAL_PADDING * 2
export const TAB_BAR_CLEARANCE = TAB_BAR_HEIGHT + BAR_BOTTOM_OFFSET

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[styles.wrapper, { bottom: insets.bottom + BAR_BOTTOM_OFFSET }]}
      pointerEvents="box-none"
    >
        <BlurView intensity={40} tint="dark" style={styles.bar}>
          {state.routes.map((route, index) => {
            const focused = state.index === index
            const baseIcon = ICONS[route.name] ?? 'ellipse'
            const iconName = focused
              ? baseIcon
              : (`${baseIcon}-outline` as keyof typeof Ionicons.glyphMap)

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
                <Ionicons
                  name={iconName}
                  size={20}
                  color={focused ? Colors.accent : Colors.iconInactive}
                />
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
    left: SCREEN_PADDING,
    right: SCREEN_PADDING,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    borderRadius: 999,
    overflow: 'hidden',

    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 24,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_SIZE,
    flex: 1,
    borderRadius: 999,
  },
  itemActive: {
    backgroundColor: Colors.tabBarActiveBackground,
  },
})