import { JSX } from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface SquareButton {
  icon: JSX.Element;
  spaced?: boolean;
  func?: () => void;
  floatingIcon?: JSX.Element;
}

const SquareButton = ({ icon, spaced, func, floatingIcon }: SquareButton) => {
  return (
    <Pressable
      onPress={func}
      style={{
        ...styles.container,
        marginVertical: spaced ? 8 : 0,
      }}>
      {floatingIcon}
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#383838',
    width: 50,
    height: 50,
  },
});

export default SquareButton;
