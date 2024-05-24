import { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import globalStyles from '../globalStyle';
import type { transaction } from '../types';

interface PeopleProps {
  peopleState: String[];
  setPeopleState: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function People({ peopleState, setPeopleState }: PeopleProps) {
  const handleAddPerson = () => {
    Alert.prompt('Add a person', 'type their name here', (value) => {
      if (!value.trim()) return;
      setPeopleState((p) => {
        return [...p, value];
      });
    });
  };

  const handleRemovePerson = (indexToDelete: number) => {
    setPeopleState((p) => {
      const newP = [...p];
      newP.splice(indexToDelete, 1);
      return newP;
    });
  };

  return (
    <View style={[globalStyles.container]}>
      <Text style={[globalStyles.subHead, { fontWeight: 'bold' }]}>People:</Text>

      {peopleState.map((val, i) => (
        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 6 }} key={'person' + i}>
          <Text style={{ marginVertical: 'auto', fontSize: 14 }}>{val}</Text>
          <Pressable
            onPress={() => handleRemovePerson(i)}
            style={{ paddingHorizontal: 5, paddingVertical: 3, borderWidth: 2, marginLeft: 20 }}
          >
            <Text>Delete</Text>
          </Pressable>
        </View>
      ))}
      <Pressable onPress={handleAddPerson} style={[globalStyles.pressable, { marginVertical: 20 }]}>
        <Text style={globalStyles.pressableText}>Add Person</Text>
      </Pressable>
    </View>
  );
}
