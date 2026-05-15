import useTaskStore from '@/store/useTaskStore';
import { useState } from 'react';
import { TaskItem } from '../types/task';
import useValidate from './useValidate';
import useUiModalStore from '@/store/useUiModalStore';

const useUpdateTask = () => {
  const [updateError, setUpdateError] = useState('');
  const close = useUiModalStore(state => state.closeModal);
  const edit = useTaskStore(state => state.editTask);
  const deleteSelectedTask = useTaskStore(state => state.deleteTask);
  const { validateUpdateTask } = useValidate();

  const editTask = (id: string, task: Partial<Omit<TaskItem, 'id'>>) => {
    try {
      validateUpdateTask(task.name ?? '');
      edit(id, { ...task });
      close();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      setUpdateError(message);
    }
  };

  const deleteTask = (id: string) => {
    deleteSelectedTask(id);
    close();
  };

  return { updateError, deleteTask, editTask };
};

export default useUpdateTask;
