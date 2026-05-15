import { GUEST_USER_ID } from '@/constants/guest';
import useAuthStore from '@/store/useAuthStore';
import useTaskStore from '@/store/useTaskStore';
import { useMemo, useState } from 'react';

const useFilteredList = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'Concluído' | 'Pendente'>();
  const list = useTaskStore(state => state.taskList);
  const user = useAuthStore(state => state.user);

  const getUserTaskList = () => {
    return list.filter(task => task.userId === user?.id);
  };

  const getGuestTaskList = () => {
    return list.filter(task => task.userId === GUEST_USER_ID);
  };

  const doneList = useMemo(() => getUserTaskList().filter(task => task.done), [list, user]);
  const pendingList = useMemo(() => getUserTaskList().filter(task => !task.done), [list, user]);

  const filteredList = useMemo(() => {
    return [...list]
      .filter(item => {
        const matchesFilter = !filter ? true : item.done === (filter === 'Concluído');
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesUser = user ? item.userId === user.id : item.userId === GUEST_USER_ID;
        return matchesSearch && matchesFilter && matchesUser;
      })
      .reverse();
  }, [list, search, filter, user]);

  return {
    filteredList,
    search,
    filter,
    setSearch,
    setFilter,
    getUserTaskList,
    getGuestTaskList,
    doneList,
    pendingList,
  };
};
export default useFilteredList;
