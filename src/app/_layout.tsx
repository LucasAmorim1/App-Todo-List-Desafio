import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, View } from 'react-native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#212121',
    color: 'white',
  },
};

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={MyTheme}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={'light-content'} />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
});
