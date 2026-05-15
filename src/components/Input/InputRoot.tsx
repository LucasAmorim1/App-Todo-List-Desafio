import React, { forwardRef, ReactNode } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type InputRootProps = TextInputProps & {
  label?: string;
  children?: ReactNode;
};

const InputRoot = forwardRef<TextInput, InputRootProps>(({ label, children, ...props }, ref) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.main}>
        <TextInput ref={ref} style={styles.input} placeholderTextColor="#808080" {...props} />
        {children}
      </View>
    </View>
  );
});

export default InputRoot;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  main: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#383838',
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    fontSize: 16,
    fontWeight: '600',
    color: '#808080',
    paddingRight: 30,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: 'white',
  },
});
