import { act } from 'react-test-renderer';
import useUiModalStore from '@/store/useUiModalStore';

const mockTask = {
  id: '1',
  userId: 'guest',
  name: 'Test task',
  done: false,
  createdAt: Date.now(),
};

describe('useUiModalStore', () => {
  beforeEach(() => {
    useUiModalStore.setState({
      editModalVisible: false,
      selectedTask: null,
      createModalVisible: false,
      filterModalVisible: false,
      transferModalVisible: false,
    });
  });

  it('should open and close edit modal', () => {
    act(() => useUiModalStore.getState().openModal(mockTask));
    expect(useUiModalStore.getState().editModalVisible).toBe(true);
    expect(useUiModalStore.getState().selectedTask).toEqual(mockTask);

    act(() => useUiModalStore.getState().closeModal());
    expect(useUiModalStore.getState().editModalVisible).toBe(false);
    expect(useUiModalStore.getState().selectedTask).toBeNull();
  });

  it('should open and close create modal', () => {
    act(() => useUiModalStore.getState().openCreateModal());
    expect(useUiModalStore.getState().createModalVisible).toBe(true);

    act(() => useUiModalStore.getState().closeCreateModal());
    expect(useUiModalStore.getState().createModalVisible).toBe(false);
  });

  it('should open and close filter modal', () => {
    act(() => useUiModalStore.getState().openFilterModal());
    expect(useUiModalStore.getState().filterModalVisible).toBe(true);

    act(() => useUiModalStore.getState().closeFilterModal());
    expect(useUiModalStore.getState().filterModalVisible).toBe(false);
  });

  it('should open and close transfer modal', () => {
    act(() => useUiModalStore.getState().openTransferModal());
    expect(useUiModalStore.getState().transferModalVisible).toBe(true);

    act(() => useUiModalStore.getState().closeTransferModal());
    expect(useUiModalStore.getState().transferModalVisible).toBe(false);
  });
});
