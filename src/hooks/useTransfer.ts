import { GUEST_USER_ID } from '@/constants/guest';
import useAuthStore from '@/store/useAuthStore';
import useTaskStore from '@/store/useTaskStore';

const useTransfer = () => {
  const list = useTaskStore(state => state.taskList);
  const guest = useAuthStore(state => state.guest);
  const guestTasks = list.filter(task => task.userId === GUEST_USER_ID);

  const checkGuestTasks = () => {
    if (!guest && guestTasks.length > 0) {
      return true;
    }
    return false;
  };

  return { checkGuestTasks, guestTasks };
};

export default useTransfer;
