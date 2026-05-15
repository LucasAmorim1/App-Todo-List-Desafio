import React, { useState } from 'react';
import { Input } from '@/components/Input';
import { View, Modal, StyleSheet, Pressable, Text } from 'react-native';
import Button from '../Button';
import useUpdateTask from '@/hooks/useUpdateTask';
import TextWarn from '../TextWarn';
import useUiModalStore from '@/store/useUiModalStore';

interface EditModalProps {
  visible: boolean;
}

const EditModal = ({ visible }: EditModalProps) => {
  const selectedTask = useUiModalStore(state => state.selectedTask);
  const [name, setName] = useState(selectedTask?.name ?? '');
  const [description, setDescription] = useState(selectedTask?.description ?? '');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { updateError, editTask, deleteTask } = useUpdateTask();
  const close = useUiModalStore(state => state.closeModal);

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <Pressable style={styles.background} onPress={() => close()}>
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>Editar tarefa:</Text>
          <Input.Root value={name} onChangeText={text => setName(text)} placeholder="Nome" />
          {updateError && <TextWarn message={updateError} />}
          <Input.Root value={description} onChangeText={text => setDescription(text)} placeholder="Descrição" />
          <Button func={() => editTask(selectedTask!.id, { name, description })} label={'Editar Tarefa'} />
          <Button
            func={() => (deleteConfirmation ? deleteTask(selectedTask!.id) : setDeleteConfirmation(true))}
            label={deleteConfirmation ? 'Tem certeza que deseja deletar?' : 'Deletar Tarefa'}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default EditModal;

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
});
