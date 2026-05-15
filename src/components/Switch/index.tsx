import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface SwitchProps {
  value?: 'Concluído' | 'Pendente';
  func: (value: 'Concluído' | 'Pendente') => void;
  firstOption: 'Concluído' | 'Pendente';
  secondOption: 'Concluído' | 'Pendente';
}
const Switch = ({ value, func, firstOption, secondOption }: SwitchProps) => {
  return (
    <View style={styles.switchContainer}>
      <Pressable
        onPress={() => func(firstOption)}
        style={[styles.option, value === firstOption && styles.activeIncome]}>
        <Text style={styles.text}>{firstOption}</Text>
      </Pressable>

      <Pressable
        onPress={() => func(secondOption)}
        style={[styles.option, value === secondOption && styles.activeExpense]}>
        <Text style={styles.text}>{secondOption}</Text>
      </Pressable>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  option: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: '#949494',
    borderRadius: 8,
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  activeIncome: {
    backgroundColor: '#9FD2AD',
  },

  activeExpense: {
    backgroundColor: '#E98484',
  },
});
