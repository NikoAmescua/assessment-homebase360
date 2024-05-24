import { Button, View, Text } from 'react-native';
import globalStyles from '../globalStyle';
import { useState } from 'react';
import type { transactions } from '../types';

interface generateProps {
  transactionsState: transactions;
}

export default function Generate({ transactionsState }: generateProps) {
  const [payments, setPayments] = useState<{ giver: string; creditor: string; amount: number }[]>([]);
  const handleGenerate = () => {
    transactionsState.forEach((transaction) => {
      // transaction.payments()
    });
  };
  return (
    <View style={globalStyles.container}>
      <Button onPress={handleGenerate} title='generate' />
      <View>
        {payments.map(({ giver, creditor, amount }) => {
          return (
            <Text>
              {giver} owes {creditor} {amount}
            </Text>
          );
        })}
      </View>
    </View>
  );
}
