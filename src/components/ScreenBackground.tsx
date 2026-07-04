import { ReactNode, useMemo } from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { SafeAreaView, Edge } from 'react-native-safe-area-context'
import { Colors } from '@/theme/colors'

type ScreenBackgroundProps = {
  children?: ReactNode
  edges?: Edge[]
}

export const SCREEN_PADDING = 16

export function ScreenBackground({ children, edges = ['top'] }: ScreenBackgroundProps) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const circleStyles = useMemo(() => {
    const topLeftSize = windowWidth * 0.5
    const bottomRightSize = windowWidth * 0.75

    return {
      topLeft: {
        top: windowHeight * 0.03,
        left: -windowWidth * 0.18,
        width: topLeftSize,
        height: topLeftSize,
        borderRadius: topLeftSize / 2,
      },
      bottomRight: {
        top: windowHeight * 0.24,
        right: -windowWidth * 0.15,
        width: bottomRightSize,
        height: bottomRightSize,
        borderRadius: bottomRightSize / 2,
      },
    }
  }, [windowWidth, windowHeight])

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <View style={[styles.circle, circleStyles.topLeft]} />
      <View style={[styles.circle, circleStyles.bottomRight]} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: SCREEN_PADDING,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    backgroundColor: Colors.backgroundAlt,
  },
  content: {
    flex: 1,
  },
})
