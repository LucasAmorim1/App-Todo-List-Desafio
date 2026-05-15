import { GUEST_USER_ID } from '@/constants/guest';
import useAuthStore from '@/store/useAuthStore';
import useTaskStore from '@/store/useTaskStore';
import { TaskItem } from '@/types/task';
import { useState } from 'react';
import useValidate from './useValidate';
import useUiModalStore from '@/store/useUiModalStore';

const useCreateTask = () => {
  const create = useTaskStore(state => state.addTask);
  const user = useAuthStore(state => state.user);
  const { validateGuestLimit, validateCreateTask } = useValidate();
  const [createError, setCreateError] = useState('');
  const closeModal = useUiModalStore(state => state.closeCreateModal);

  const addNewTask = (name: string, description: string) => {
    try {
      validateGuestLimit();
      validateCreateTask(name);
      const id = `${Date.now()}-${Math.random()}`;
      const newTask: TaskItem = {
        id: id,
        userId: user ? user.id : GUEST_USER_ID,
        name,
        description,
        done: false,
        createdAt: Date.now(),
      };
      create(newTask);
      closeModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      setCreateError(message);
    }
  };

  return { addNewTask, createError };
};

export default useCreateTask;
