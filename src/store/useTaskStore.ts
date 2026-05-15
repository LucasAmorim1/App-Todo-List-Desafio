import { persist, createJSONStorage } from 'zustand/middleware';
import { TaskItem } from '@/types/task';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskStore {
  taskList: TaskItem[];
  addTask: (task: TaskItem) => void;
  editTask: (id: string, data: Partial<Omit<TaskItem, 'id'>>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    set => ({
      taskList: [],
      addTask: task =>
        set(state => ({
          taskList: [...state.taskList, task],
        })),
      editTask: (id, data) =>
        set(state => ({
          taskList: state.taskList.map(task => (task.id === id ? { ...task, ...data } : task)),
        })),
      deleteTask: id => set(state => ({ taskList: state.taskList.filter(item => item.id !== id) })),
      completeTask: id =>
        set(state => ({
          taskList: state.taskList.map(task => (task.id === id ? { ...task, done: !task.done } : task)),
        })),
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useTaskStore;
