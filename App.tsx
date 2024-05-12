import Form from './components/Form';
import { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import globalStyles from './globalStyle';

export default function App() {
  const [openModal, setOpenModal] = useState('');

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Home</Text>
      <Pressable style={globalStyles.pressable} onPress={() => setOpenModal('form')}>
        <Text style={globalStyles.pressableText}>Add User</Text>
      </Pressable>

      <Modal visible={openModal === 'form'}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.text}>Fill in your info:</Text>
          <Form setOpenModal={setOpenModal} />
        </View>
      </Modal>

      <Modal visible={openModal === 'success'}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.text}>Data successfully saved</Text>
        </View>
      </Modal>
    </View>
  );
}
