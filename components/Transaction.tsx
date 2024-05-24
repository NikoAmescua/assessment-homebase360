import { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import globalStyles from '../globalStyle';
import type { transaction, transactions } from '../types';
import LineItem from './LineItem';
import { globalAgent } from 'http';

interface TransactionProps {
  transactionData: transaction;
  transactionIndex: number;
  setTransactionsState: React.Dispatch<React.SetStateAction<transactions>>;
  peopleState: string[];
}

export default function Transaction({
  transactionData,
  transactionIndex,
  setTransactionsState,
  peopleState,
}: TransactionProps) {
  const calculateTotal = () => {
    return transactionData.payments.reduce((accum, curr) => {
      return curr.amount + accum;
    }, 0);
  };

  const handleDelete = () => {
    setTransactionsState((p) => {
      const newT = [...p];
      newT.splice(transactionIndex, 1);
      return newT;
    });
  };

  const handleRenameTransaction = (val: string) => {
    setTransactionsState((p) => {
      const newT = [...p];
      newT[transactionIndex].transactionName = val;
      return newT;
    });
  };

  const handleAddPayment = () => {
    setTransactionsState((p) => {
      const newT = [...p];
      const newPayments = [...newT[transactionIndex].payments];
      newPayments.push({ name: 'item', amount: 0, person: '' });
      newT[transactionIndex].payments = newPayments;
      return newT;
    });
  };

  return (
    <View style={globalStyles.container}>
      <TextInput style={globalStyles.subHead} onChangeText={handleRenameTransaction}>
        {transactionData.transactionName}
      </TextInput>

      {/* table */}
      <View style={{ flex: 1, flexDirection: 'column', width: '100%', backgroundColor: 'white' }}>
        <View style={[globalStyles.lineItemContainer, { paddingVertical: 20 }]}>
          <Text style={[globalStyles.lineItemText, { fontWeight: 'bold' }]}>Item</Text>
          <Text style={[globalStyles.lineItemText, { fontWeight: 'bold' }]}>Person</Text>
          <Text style={[globalStyles.lineItemText, { fontWeight: 'bold' }]}>Price</Text>
        </View>
        {transactionData.payments.map((item, i) => {
          return (
            <LineItem
              key={'item' + transactionIndex + i}
              itemIndex={i}
              transactionIndex={transactionIndex}
              item={item}
              setTransactionsState={setTransactionsState}
              peopleState={peopleState}
            />
          );
        })}
      </View>

      {/* totals */}
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
        <View style={{ marginRight: 20 }}>
          <Text>Tip %</Text>
          <TextInput style={globalStyles.borderedInput} />
        </View>
        <View>
          <Text>Tax %</Text>
          <TextInput style={globalStyles.borderedInput} />
        </View>
      </View>

      <Text>Total: ${calculateTotal()}</Text>

      <Button onPress={handleAddPayment} title='add item' />
      <Button onPress={handleDelete} title='delete transaction' />
    </View>
  );
}
