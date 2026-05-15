import { TaskItem } from '@/types/task';
import { create } from 'zustand';

interface UiModalStore {
  editModalVisible: boolean;
  selectedTask: TaskItem | null;
  openModal: (task: TaskItem) => void;
  closeModal: () => void;
  createModalVisible: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  filterModalVisible: boolean;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  transferModalVisible: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;
}

const useUiModalStore = create<UiModalStore>(set => ({
  editModalVisible: false,
  selectedTask: null,
  openModal: task => set({ editModalVisible: true, selectedTask: task }),
  closeModal: () => set({ editModalVisible: false, selectedTask: null }),
  createModalVisible: false,
  openCreateModal: () => set({ createModalVisible: true }),
  closeCreateModal: () => set({ createModalVisible: false }),
  filterModalVisible: false,
  openFilterModal: () => set({ filterModalVisible: true }),
  closeFilterModal: () => set({ filterModalVisible: false }),
  transferModalVisible: false,
  openTransferModal: () => set({ transferModalVisible: true }),
  closeTransferModal: () => set({ transferModalVisible: false }),
}));

export default useUiModalStore;
