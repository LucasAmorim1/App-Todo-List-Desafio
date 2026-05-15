import React, { JSX } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface InputIconProps {
  icon: JSX.Element;
  position: 'left' | 'right';
  func?: () => void;
}

const InputIcon: React.FC<InputIconProps> = ({ icon, position, func }) => {
  return (
    <Pressable onPress={func} style={[styles.icon, position === 'left' ? { left: 10 } : { right: 10 }]}>
      {icon}
    </Pressable>
  );
};

export default InputIcon;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
  },
});
