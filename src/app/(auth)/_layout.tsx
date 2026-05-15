import useAuthStore from '@/store/useAuthStore';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const user = useAuthStore(state => state.user);

  if (user) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
