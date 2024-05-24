import { Text, View, TextInput } from 'react-native';
import type { payment, transactions } from '../types';
import globalStyles from '../globalStyle';
import DropDown from './DropDown';

interface lineItemProps {
  item: payment;
  transactionIndex: number;
  itemIndex: number;
  setTransactionsState: React.Dispatch<React.SetStateAction<transactions>>;
  peopleState: string[];
}

export default function LineItem({
  item,
  itemIndex,
  transactionIndex,
  setTransactionsState,
  peopleState,
}: lineItemProps) {
  const { person, name, amount } = item;

  const handleUpdateValue = (val: string, field: keyof payment) => {
    setTransactionsState((prev) => {
      const newP = [...prev];
      const newItem = { ...newP[transactionIndex].payments[itemIndex] };
      if (field === 'amount') {
        newItem[field] = Number(val.replace(/[^0-9]/g, ''));
      } else {
        newItem[field] = val;
      }
      newP[transactionIndex].payments[itemIndex] = newItem;
      return newP;
    });
  };

  return (
    <View style={globalStyles.lineItemContainer}>
      <TextInput
        onChangeText={(text) => handleUpdateValue(text, 'name')}
        style={[globalStyles.lineItemText, globalStyles.borderedInput]}
      >
        {name}
      </TextInput>
      <DropDown handleUpdateValue={handleUpdateValue} stateValue={person} peopleState={peopleState} />
      <TextInput
        onChangeText={(text) => handleUpdateValue(text, 'amount')}
        inputMode='numeric'
        keyboardType='numeric'
        style={[globalStyles.lineItemText, globalStyles.borderedInput]}
      >
        {amount}
      </TextInput>
    </View>
  );
}
