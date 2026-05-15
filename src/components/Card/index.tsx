import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '@/components/Icon';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useTaskStore from '@/store/useTaskStore';
import Feather from '@expo/vector-icons/Feather';
import { memo } from 'react';
import useUiModalStore from '@/store/useUiModalStore';
import { TaskItem } from '@/types/task';

const Card = ({ item }: { item: TaskItem }) => {
  const { id, userId, name, description, done, createdAt } = item;
  const complete = useTaskStore(state => state.completeTask);
  const openEditModal = useUiModalStore(state => state.openModal);
  return (
    <View
      style={{
        ...styles.container,
      }}>
      <View style={styles.header}>
        <Icon icon={<MaterialCommunityIcons name="clipboard-clock-outline" size={40} color="#2A303B" />} />
        <View style={styles.headerInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {name}
          </Text>
          {description && (
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.info}>
              {description}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={() => openEditModal({ id, userId, name, description, done, createdAt })}>
          <FontAwesome5 name="edit" size={24} color="white" />
        </Pressable>

        <Pressable onPress={() => complete(id)}>
          <Feather name={done ? 'check-square' : 'x-square'} size={35} color={done ? '#9FD2AD' : '#E98484'} />
        </Pressable>
      </View>
    </View>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404040',
    height: 80,
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 5,
    maxWidth: 180,
    margin: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  info: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 5,
    margin: 0,
    maxWidth: 180,
    paddingBottom: 0,
  },
  value: {
    marginRight: 5,
    fontSize: 16,
    color: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerInfo: {
    justifyContent: 'space-around',
    marginLeft: 5,
    height: '100%',
  },
});
