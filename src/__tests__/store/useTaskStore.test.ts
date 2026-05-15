import { act } from 'react-test-renderer';
import useTaskStore from '@/store/useTaskStore';

const mockTask = {
  id: '1',
  userId: 'guest',
  name: 'Test task',
  done: false,
  createdAt: Date.now(),
};

describe('useTaskStore', () => {
  beforeEach(() => {
    useTaskStore.setState({ taskList: [] });
  });

  it('should add a task', () => {
    act(() => useTaskStore.getState().addTask(mockTask));
    expect(useTaskStore.getState().taskList).toHaveLength(1);
    expect(useTaskStore.getState().taskList[0].name).toBe('Test task');
  });

  it('should edit a task name', () => {
    act(() => {
      useTaskStore.getState().addTask(mockTask);
      useTaskStore.getState().editTask('1', { name: 'Updated name' });
    });
    expect(useTaskStore.getState().taskList[0].name).toBe('Updated name');
  });

  it('should edit a task partially without affecting other fields', () => {
    act(() => {
      useTaskStore.getState().addTask({ ...mockTask, description: 'original description' });
      useTaskStore.getState().editTask('1', { name: 'New name' });
    });
    const task = useTaskStore.getState().taskList[0];
    expect(task.name).toBe('New name');
    expect(task.description).toBe('original description');
  });

  it('should delete a task', () => {
    act(() => {
      useTaskStore.getState().addTask(mockTask);
      useTaskStore.getState().deleteTask('1');
    });
    expect(useTaskStore.getState().taskList).toHaveLength(0);
  });

  it('should complete a task', () => {
    act(() => {
      useTaskStore.getState().addTask(mockTask);
      useTaskStore.getState().completeTask('1');
    });
    expect(useTaskStore.getState().taskList[0].done).toBe(true);
  });

  it('should toggle task done status', () => {
    act(() => {
      useTaskStore.getState().addTask(mockTask);
      useTaskStore.getState().completeTask('1');
      useTaskStore.getState().completeTask('1');
    });
    expect(useTaskStore.getState().taskList[0].done).toBe(false);
  });
});
