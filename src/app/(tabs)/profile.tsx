import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useAuthStore from '@/store/useAuthStore';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Button from '@/components/Button';
import ScreenTitle from '@/components/ScreenTitle';
import ProtectedLayout from '@/components/ProtectedLayout';
import useFilteredList from '@/hooks/useFilteredList';

const Profile = () => {
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);
  const { getUserTaskList, doneList, pendingList } = useFilteredList();
  return (
    <ProtectedLayout>
      <View style={styles.container}>
        <ScreenTitle title="Perfil" />
        <View style={styles.main}>
          <View style={styles.avatar}>
            <Entypo name="user" size={120} color="black" />
          </View>
          <Text style={styles.username}>{user?.name}</Text>
          <View style={styles.info}>
            <Text style={styles.subTitle}>Email: {user?.email}</Text>
            <Text style={styles.subTitle}>Tarefas criadas: {getUserTaskList().length}</Text>
            <Text style={styles.subTitle}>Tarefas finalizadas: {doneList.length}</Text>
          </View>

          <View style={{ width: '50%' }}>
            <Button
              func={() => {
                logout();
                router.replace('/login');
              }}
              color="#343c4e"
              label={'Sair'}
            />
          </View>
        </View>
      </View>
    </ProtectedLayout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    margin: 20,
  },
  username: {
    fontSize: 20,
    color: '#b3b3b3',
    margin: 20,
  },
  info: {
    marginBottom: 100,
  },
  subTitle: {
    fontSize: 20,
    color: '#b3b3b3',
    margin: 10,
  },
  avatar: {
    height: 200,
    width: 200,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#4d4d4d',
  },
});
