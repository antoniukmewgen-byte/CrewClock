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
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
})
