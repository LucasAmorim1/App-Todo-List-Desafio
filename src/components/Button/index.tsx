import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

interface ButtonProps {
  label: string;
  func: () => void;
  color?: string;
}

const Button = ({ label, color, func }: ButtonProps) => {
  return (
    <Pressable
      onPress={func}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: color ? color : '#343c4e',
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
