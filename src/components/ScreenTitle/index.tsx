import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@/components/Button';
import { router } from 'expo-router';
import useAuthStore from '@/store/useAuthStore';

interface ScreenTitleProps {
  title: string;
}

const ScreenTitle = ({ title }: ScreenTitleProps) => {
  const user = useAuthStore(state => state.user);
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {!user && (
        <View style={{ width: '30%' }}>
          <Button func={() => router.push('/(auth)/login')} color="#343c4e" label={'Login'} />
        </View>
      )}
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
});
