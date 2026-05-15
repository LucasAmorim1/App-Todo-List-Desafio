import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { LoginFormValues as FormValues } from '@/types/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/auth';
import useAuth from '@/hooks/useAuth';
import TextError from '@/components/TextError';
import TextWarn from '@/components/TextWarn';
import Button from '@/components/Button';
import { Input } from '@/components/Input';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(loginSchema) });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginError, submitLogin, continueGuest, guestWarn } = useAuth();
  const [guestConfirmation, setGuestConfirmation] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Bem Vindo!</Text>
        {loginError && <TextError message={loginError} />}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Root value={value} onChangeText={onChange} placeholder="Nome" />
          )}
          name="name"
        />
        {errors.name && <TextWarn message={errors.name.message!} />}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Root
              value={value}
              secureTextEntry={passwordVisible ? false : true}
              onChangeText={onChange}
              placeholder="Senha">
              <Input.Icon
                func={() => setPasswordVisible(!passwordVisible)}
                icon={<Feather name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#808080" />}
                position="right"
              />
            </Input.Root>
          )}
          name="password"
        />
        {errors.password && <TextWarn message={errors.password.message!} />}
        <Button func={handleSubmit(submitLogin)} label={'Login'} />
        <Link style={styles.link} href={'/register'}>
          Criar uma nova conta
        </Link>
        <View style={{ marginTop: 50 }}>
          <Button
            func={() => (guestConfirmation ? continueGuest() : setGuestConfirmation(true))}
            label={guestConfirmation ? 'Prosseguir' : 'Continuar sem login'}
          />
          {guestConfirmation ? <TextWarn message={guestWarn} /> : <></>}
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    backgroundColor: '#333333',
    borderRadius: 30,
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  warn: {
    color: '#d46055',
    fontSize: 18,
    marginTop: 15,
  },
  link: {
    alignSelf: 'flex-start',
    color: 'white',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
});
