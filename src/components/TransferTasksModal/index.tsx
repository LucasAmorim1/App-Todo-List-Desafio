import React from 'react';
import { View, Modal, StyleSheet, Pressable, Text } from 'react-native';
import Button from '@/components/Button';
import { TaskItem } from '@/types/task';
import useAuthStore from '@/store/useAuthStore';
import useTaskStore from '@/store/useTaskStore';
import useUiModalStore from '@/store/useUiModalStore';

interface TransferModalProps {
  visible: boolean;
  data: TaskItem[];
}
const TransferModal = ({ visible, data }: TransferModalProps) => {
  const user = useAuthStore(state => state.user);
  const edit = useTaskStore(state => state.editTask);
  const deleteTask = useTaskStore(state => state.deleteTask);
  const closeModal = useUiModalStore(state => state.closeTransferModal);

  const transferTasks = () => {
    if (!user) return;
    data.map(task => edit(task.id, { userId: user.id }));
    closeModal();
  };

  const deleteAllTasks = () => {
    data.map(task => deleteTask(task.id));
    closeModal();
  };

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <Pressable style={styles.background} onPress={() => closeModal()}>
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          <Text style={styles.title} onPress={() => {}}>
            {data.length} Tarefa{data.length > 1 ? 's' : ''} criada{data.length > 1 ? 's' : ''} como visitante, você
            gostaria de mover ela{data.length > 1 ? 's' : ''} para sua conta, ou deletá-la{data.length > 1 ? 's' : ''}?
          </Text>
          <Button func={() => transferTasks()} label={'Transferir'} />
          <Button func={() => deleteAllTasks()} label={'Deletar'} />
          <Button func={() => closeModal()} label={'Cancelar'} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default TransferModal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#333333',
    width: '80%',
    borderRadius: 15,
    padding: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
  },
});
