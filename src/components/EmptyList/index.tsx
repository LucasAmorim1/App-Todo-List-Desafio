import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyListProps {
  text: string;
}

const EmptyList = ({ text }: EmptyListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#555555',
    margin: 20,
  },
});
