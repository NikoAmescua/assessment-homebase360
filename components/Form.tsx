import { View, Text, TextInput, Button, StyleProp, StyleSheet, Pressable } from 'react-native';
import globalStyles from '../globalStyle';
import { useState } from 'react';

interface FormProps {
  setOpenModal: (isOpen: string) => void;
}

const Form = ({ setOpenModal }: FormProps) => {
  const [formData, setFormData] = useState({ firstName: null, lastName: null, email: null });
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [savingData, setSavingData] = useState(false);

  const FormErrorChecker = () => {
    for (const value of Object.entries(formData)) {
      if (!value[1]) {
        setFormErrorMessage(value[0].replace(/([A-Z])/g, ' $1').toLowerCase() + ' is blank');
        return false;
      } else if (value[0] === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value[1])) {
        setFormErrorMessage('email is invalid');
        return false;
      }
    }
    setFormErrorMessage('');
    return true;
  };

  const updateFormData = (field: keyof typeof formData, text: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: text,
    }));
  };

  return (
    <View>
      <TextInput
        onChangeText={(text) => updateFormData('firstName', text)}
        style={globalStyles.input}
        placeholder='first name'
        readOnly={savingData}
      />
      <TextInput
        onChangeText={(text) => updateFormData('lastName', text)}
        style={globalStyles.input}
        placeholder='last name'
        readOnly={savingData}
      />
      <TextInput
        onChangeText={(text) => updateFormData('email', text)}
        style={globalStyles.input}
        placeholder='email'
        readOnly={savingData}
      />
      <Pressable
        style={globalStyles.pressable}
        disabled={savingData}
        onPress={() => {
          if (FormErrorChecker()) {
            setSavingData(true);
            setTimeout(() => setOpenModal('success'), 2000);
          }
        }}
      >
        <Text style={globalStyles.pressableText}>{savingData ? 'SAVING...' : 'SAVE'}</Text>
      </Pressable>
      <Text style={{ color: 'red', textAlign: 'center', marginTop: 4, fontSize: 16 }}>{formErrorMessage}</Text>
    </View>
  );
};

export default Form;
