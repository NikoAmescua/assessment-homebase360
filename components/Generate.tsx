import { Button, View, Text } from 'react-native';
import globalStyles from '../globalStyle';
import { useState } from 'react';
import type { transactions } from '../types';

interface generateProps {
  transactionsState: transactions;
  peopleState: string[];
}

export default function Generate({ transactionsState, peopleState }: generateProps) {
  const [displayedPayments, setDisplayedPayments] = useState<{ giver: string; creditor: string; amount: number }[]>([]);

  const handleGenerate = () => {
    // normalize
    const totals: { [key: string]: number } = {};
    for (const person of peopleState) totals[person] = 0;

    for (const transaction of transactionsState) {
      const payments = transaction.payments;
      const creditor = transaction.creditor;
      for (const payment of payments) {
        if (!peopleState.includes(payment.person)) return;
        console.log(Number(((payment.amount * (transaction.tax + transaction.tip + 100)) / 100).toFixed(2)));
        totals[payment.person] += Number(
          ((payment.amount * (transaction.tax + transaction.tip + 100)) / 100).toFixed(2)
        );
        totals[creditor] -= Number(((payment.amount * (transaction.tax + transaction.tip + 100)) / 100).toFixed(2));
      }
    }
    console.log(totals);
    // match payments
    const totalsArr: { amount: number; person: string }[] = [];
    const newDisplayedPayments: { giver: string; creditor: string; amount: number }[] = [];
    for (const key in totals) totalsArr.push({ amount: totals[key], person: key });
    totalsArr.sort((a, b) => b.amount - a.amount);
    while (totalsArr[0] && totalsArr[0].amount > 0) {
      const currentPayment = Math.min(totalsArr[0].amount, Math.abs(totalsArr[totalsArr.length - 1].amount));
      newDisplayedPayments.push({
        giver: totalsArr[0].person,
        creditor: totalsArr[totalsArr.length - 1].person,
        amount: currentPayment,
      });
      totalsArr[0].amount -= currentPayment;
      totalsArr[totalsArr.length - 1].amount += currentPayment;
      if (totalsArr[0].amount <= 0) totalsArr.shift();
      if (totalsArr[totalsArr.length - 1].amount >= 0) totalsArr.pop();
    }
    // console.log(newDisplayedPayments);

    // format
    setDisplayedPayments(newDisplayedPayments);
  };
  return (
    <View style={globalStyles.container}>
      <Button onPress={handleGenerate} title='generate' />
      <View>
        {displayedPayments.map(({ giver, creditor, amount }, i) => {
          return (
            <Text key={'generated payment' + i}>
              {giver} owes {creditor} ${amount}
            </Text>
          );
        })}
      </View>
    </View>
  );
}
