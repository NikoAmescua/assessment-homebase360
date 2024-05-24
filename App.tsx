import { useState } from 'react';
import { View, Text, Modal, Pressable, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import globalStyles from './globalStyle';
import Transaction from './components/Transaction';
import type { transactions } from './types';
import People from './components/People';
import Generate from './components/Generate';

export default function App() {
  const [transactionsState, setTransactionsState] = useState<transactions>([]);
  const [peopleState, setPeopleState] = useState<string[]>([]);

  const addTransaction = () => {
    setTransactionsState((prev) => {
      return [...prev, { transactionName: 'Transaction', creditor: '', payments: [], tax: 0, tip: 0 }];
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={localStyle.title}>Split it up!</Text>
        <People peopleState={peopleState} setPeopleState={setPeopleState} />
        {transactionsState.map((transactionData, i) => (
          <Transaction
            key={'transaction' + i}
            transactionIndex={i}
            transactionData={transactionData}
            setTransactionsState={setTransactionsState}
            peopleState={peopleState}
          />
        ))}
        <Pressable onPress={addTransaction} style={globalStyles.pressable}>
          <Text style={globalStyles.pressableText}>Add Transaction</Text>
        </Pressable>
        <Generate transactionsState={transactionsState} />
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  scrollView: {
    // paddingTop:
  },
  title: {
    textAlign: 'center',
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
