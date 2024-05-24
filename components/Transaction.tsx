import { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import globalStyles from '../globalStyle';
import type { transaction, transactions } from '../types';
import LineItem from './LineItem';
import { globalAgent } from 'http';
import DropDown from './DropDown';

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
    const subtotal = transactionData.payments.reduce((accum, curr) => {
      return curr.amount + accum;
    }, 0);
    return (subtotal * (transactionData.tax + transactionData.tip + 100)) / 100;
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

  const handleUpdateTaxOrTip = function (value: string, field: 'tax' | 'tip') {
    setTransactionsState((p) => {
      const newTransactions = [...p];
      const newTransaction = { ...newTransactions[transactionIndex] };
      newTransaction[field] = Number(value.replace(/[^0-9]/g, ''));
      newTransactions[transactionIndex] = newTransaction;
      return newTransactions;
    });
  };

  return (
    // title
    <View style={globalStyles.container}>
      <TextInput style={globalStyles.subHead} onChangeText={handleRenameTransaction}>
        {transactionData.transactionName}
      </TextInput>

      {/* creditor */}
      <View
        style={{
          marginRight: 'auto',
          marginLeft: 10,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Text>Paid for by: </Text>
        <DropDown
          handleUpdateValue={(value: string) => {
            setTransactionsState((p) => {
              const newTransactions = [...p];
              const newTransaction = { ...newTransactions[transactionIndex] };
              newTransaction.creditor = value;
              newTransactions[transactionIndex] = newTransaction;
              return newTransactions;
            });
          }}
          stateValue={transactionData.creditor}
          peopleState={peopleState}
        />
      </View>

      {/* table */}
      <View style={{ flex: 1, flexDirection: 'column', width: '100%', backgroundColor: 'white', marginBottom: 10 }}>
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

      <Button onPress={handleAddPayment} title='add item' />

      {/* totals */}
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
        <View style={{ marginRight: 20 }}>
          <Text>Tip %</Text>
          <TextInput
            onChangeText={(value) => {
              handleUpdateTaxOrTip(value, 'tip');
            }}
            style={globalStyles.borderedInput}
          >
            {transactionData.tip}
          </TextInput>
        </View>
        <View>
          <Text>Tax %</Text>
          <TextInput onChangeText={(value) => handleUpdateTaxOrTip(value, 'tax')} style={globalStyles.borderedInput}>
            {transactionData.tax}
          </TextInput>
        </View>
      </View>

      <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Total: ${calculateTotal()}</Text>

      <Button onPress={handleDelete} title='delete transaction' />
    </View>
  );
}
