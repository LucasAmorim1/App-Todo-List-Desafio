import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TextWarnProps {
  message: string;
}

const TextWarn = ({ message }: TextWarnProps) => {
  return (
    <View style={styles.container}>
      <Feather name="alert-triangle" size={18} color="#d46055" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default TextWarn;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  text: { color: 'white', marginLeft: 10 },
});
