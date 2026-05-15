import { renderHook } from '@testing-library/react-native';
import useValidate from '@/hooks/useValidate';
import useAuthStore from '@/store/useAuthStore';
import useTaskStore from '@/store/useTaskStore';
import { GUEST_USER_ID } from '@/constants/guest';

jest.mock('@/store/useAuthStore');
jest.mock('@/store/useTaskStore');

describe('useValidate', () => {
  describe('validateGuestLimit', () => {
    it('should throw when guest has 10 tasks', () => {
      (useAuthStore as unknown as jest.Mock).mockImplementation(selector => selector({ guest: true }));
      const guestTasks = Array.from({ length: 10 }, (_, i) => ({
        id: `${i}`,
        userId: GUEST_USER_ID,
        name: `Task ${i}`,
        done: false,
        createdAt: Date.now(),
      }));
      (useTaskStore as unknown as jest.Mock).mockImplementation(selector => selector({ taskList: guestTasks }));

      const { result } = renderHook(() => useValidate());
      expect(() => result.current.validateGuestLimit()).toThrow('Faça login para criar mais tarefas!');
    });

    it('should not throw when guest has less than 10 tasks', () => {
      (useAuthStore as unknown as jest.Mock).mockImplementation(selector => selector({ guest: true }));
      (useTaskStore as unknown as jest.Mock).mockImplementation(selector => selector({ taskList: [] }));

      const { result } = renderHook(() => useValidate());
      expect(() => result.current.validateGuestLimit()).not.toThrow();
    });
  });

  describe('validateCreateTask', () => {
    it('should throw when name is empty', () => {
      (useAuthStore as unknown as jest.Mock).mockImplementation(selector => selector({ guest: false }));
      (useTaskStore as unknown as jest.Mock).mockImplementation(selector => selector({ taskList: [] }));

      const { result } = renderHook(() => useValidate());
      expect(() => result.current.validateCreateTask('')).toThrow('Um nome é necessário');
    });

    it('should not throw when name is valid', () => {
      (useAuthStore as unknown as jest.Mock).mockImplementation(selector => selector({ guest: false }));
      (useTaskStore as unknown as jest.Mock).mockImplementation(selector => selector({ taskList: [] }));

      const { result } = renderHook(() => useValidate());
      expect(() => result.current.validateCreateTask('Valid name')).not.toThrow();
    });
  });
});
