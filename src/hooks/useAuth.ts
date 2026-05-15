import useAuthStore from '@/store/useAuthStore';
import { LoginFormValues, RegisterFormValues } from '@/types/forms';
import { router } from 'expo-router';
import { useState } from 'react';

const useAuth = () => {
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const login = useAuthStore(state => state.login);
  const register = useAuthStore(state => state.register);
  const continueAsGuest = useAuthStore(state => state.continueAsGuest);
  const guestWarn =
    'Se continuar sem login, terá uma limitação de 10 tarefas simultaneas, e não terá acesso as telas de Estatísticas e Perfil';

  const submitLogin = async (data: LoginFormValues) => {
    try {
      await login(data);
      setLoginError('');
      router.push('/(tabs)');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      setLoginError(message);
    }
  };

  const submitRegister = async (data: RegisterFormValues) => {
    try {
      await register(data);
      setRegisterError('');
      router.push('/(tabs)');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      setRegisterError(message);
    }
  };

  const continueGuest = () => {
    continueAsGuest();
    router.push('/(tabs)');
  };

  return { loginError, submitLogin, registerError, submitRegister, continueGuest, guestWarn };
};

export default useAuth;
