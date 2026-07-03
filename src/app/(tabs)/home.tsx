import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d3d2f',
    overflow: 'hidden',
  },
  circleTopLeft: {
    position: 'absolute',
    top: '3%',
    left: '-18%',
    width: '50%',
    aspectRatio: 1,
    borderRadius: 9999,
    backgroundColor: '#153124',
  },
  circleBottomRight: {
    position: 'absolute',
    top: '24%',
    right: '-15%',
    width: '75%',
    aspectRatio: 1,
    borderRadius: 9999,
    backgroundColor: '#153124',
  },
})

