import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import useAuthStore from '@/store/useAuthStore';

export default function TabLayout() {
  const user = useAuthStore(state => state.user);
  const guest = useAuthStore(state => state.guest);
  const isAllowed = !!user || guest;

  if (!isAllowed) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#a6a7aa',
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          width: '80%',
          marginLeft: '10%',
          bottom: 10,
          height: 65,
          borderRadius: 20,
          backgroundColor: '#333333',
          borderTopWidth: 0,
          elevation: 3,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ color, size }) => <Ionicons name="analytics-sharp" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
