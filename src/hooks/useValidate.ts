import useAuthStore from '@/store/useAuthStore';
import useTaskStore from '@/store/useTaskStore';
import { GUEST_USER_ID } from '@/constants/guest';

const useValidate = () => {
  const guest = useAuthStore(state => state.guest);
  const list = useTaskStore(state => state.taskList);

  const validateGuestLimit = () => {
    const guestCount = list.filter(task => task.userId === GUEST_USER_ID).length;
    if (guest && guestCount >= 10) {
      throw new Error('Faça login para criar mais tarefas!');
    }
    return;
  };

  const validateCreateTask = (name: string) => {
    if (!name.trim()) {
      throw new Error('Um nome é necessário');
    }
    return;
  };

  const validateUpdateTask = (name: string) => {
    if (!name.trim()) {
      throw new Error('Nome não pode ficar vazio');
    }
    return;
  };

  return { validateCreateTask, validateGuestLimit, validateUpdateTask };
};

export default useValidate;
