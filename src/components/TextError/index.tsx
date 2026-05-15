import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface TextErrorProps {
  message: string;
}

const TextError = ({ message }: TextErrorProps) => {
  return (
    <View style={styles.container}>
      <AntDesign name="close-circle" size={24} color="#d46055" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default TextError;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  text: { color: '#d46055', fontSize: 18, marginLeft: 10 },
});
