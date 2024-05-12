import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    color: '#1D1D1F',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  pressable: {
    backgroundColor: '#2196F3',
    width: 100,
    marginHorizontal: 'auto',
  },
  pressableText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'semibold',
    marginHorizontal: 12,
    marginVertical: 8,
    fontSize: 16,
  },
});

export default globalStyles;
