import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';

interface Icon {
  icon: JSX.Element;
}

const Icon = ({ icon }: Icon) => {
  return <View style={styles.container}>{icon}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#5e5e5e',
    width: 60,
    height: 60,
  },
});
export default Icon;
