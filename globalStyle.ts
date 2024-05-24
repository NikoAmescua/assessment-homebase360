import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 20,
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
  subHead: { margin: 5, marginBottom: 10, fontSize: 18, textAlign: 'left', alignSelf: 'flex-start' },
  lineItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  lineItemText: {
    width: '33%',
    textAlign: 'center',
  },
  borderedInput: {
    borderWidth: 1,
    borderColor: 'black',
    height: 30,
    width: 80,
    margin: 'auto',
  },
});

export default globalStyles;
