import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function Welcome() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CrewClock</Text>
      <Pressable style={styles.button} onPress={() => router.replace('/home')}>
        <Text style={styles.buttonText}>Почати</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
})
