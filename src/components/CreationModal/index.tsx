import React, { useState } from 'react';
import { Input } from '@/components/Input';
import { View, Modal, StyleSheet, Pressable, Text } from 'react-native';
import Button from '@/components/Button';
import useCreateTask from '@/hooks/useCreateTask';
import TextWarn from '../TextWarn';
import useUiModalStore from '@/store/useUiModalStore';

interface CreationModalProps {
  visible: boolean;
}
const CreationModal = ({ visible }: CreationModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const { addNewTask, createError } = useCreateTask();
  const closeModal = useUiModalStore(state => state.closeCreateModal);

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <Pressable style={styles.background} onPress={() => closeModal()}>
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>Crie uma nova tarefa:</Text>
          <Input.Root value={taskName} onChangeText={text => setTaskName(text)} placeholder="Nome" />
          {createError && <TextWarn message={createError} />}
          <Input.Root value={taskDescription} onChangeText={text => setTaskDescription(text)} placeholder="Descrição" />
          <Button func={() => addNewTask(taskName, taskDescription)} label={'Criar tarefa'} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default CreationModal;

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
