import { User } from '@/types/task';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginFormValues, RegisterFormValues } from '@/types/forms';

interface AuthStore {
  user: User | null;
  registeredUsers: User[];
  guest: boolean;
  login: (login: LoginFormValues) => Promise<void>;
  register: (register: RegisterFormValues) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      registeredUsers: [],
      guest: false,
      login: async ({ name, password }) => {
        const users = get().registeredUsers;
        const user = users.find(user => user.name === name && user.password === password);
        if (!user) throw new Error('Nome de usuário ou senha incorretos');
        set({ user, guest: false });
      },
      register: async ({ name, email, password }) => {
        const users = get().registeredUsers;
        const exists = users.find(user => user.name === name);
        if (exists) throw new Error('Usuário já existe');
        const newUser = { id: Date.now().toString(), name, email, password };
        set({ registeredUsers: [...users, newUser], user: newUser, guest: false });
      },
      continueAsGuest: () => set({ guest: true, user: null }),
      logout: () => set({ user: null, guest: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
