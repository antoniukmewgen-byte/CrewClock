import { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView, Edge } from 'react-native-safe-area-context'
import { Colors } from '@/theme/colors'

type ScreenBackgroundProps = {
  children?: ReactNode
  edges?: Edge[]
}

export function ScreenBackground({ children, edges = ['top'] }: ScreenBackgroundProps) {
  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  circleTopLeft: {
    position: 'absolute',
    top: '3%',
    left: '-18%',
    width: '50%',
    aspectRatio: 1,
    borderRadius: 9999,
    backgroundColor: Colors.backgroundAlt,
  },
  circleBottomRight: {
    position: 'absolute',
    top: '24%',
    right: '-15%',
    width: '75%',
    aspectRatio: 1,
    borderRadius: 9999,
    backgroundColor: Colors.backgroundAlt,
  },
  content: {
    flex: 1,
  },
})
