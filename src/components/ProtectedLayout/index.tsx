import React, { JSX } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../Button';
import { router } from 'expo-router';

interface ProtectedLayoutProps {
  children: JSX.Element;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const guest = useAuthStore(state => state.guest);

  if (guest) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Faça login para acessar esta tela</Text>
        <Button func={() => router.push('/(auth)/login')} color="#343c4e" label={'Login'} />
      </View>
    );
  }
  return <>{children}</>;
};

export default ProtectedLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    margin: 'auto',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
