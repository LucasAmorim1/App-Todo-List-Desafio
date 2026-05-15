import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { RegisterFormValues as FormValues } from '@/types/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/schemas/auth';
import useAuth from '@/hooks/useAuth';
import TextError from '@/components/TextError';
import TextWarn from '@/components/TextWarn';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import Feather from '@expo/vector-icons/Feather';

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(registerSchema) });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { registerError, submitRegister } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Cadastre-se!</Text>
        {registerError && <TextError message={registerError} />}
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
            <Input.Root value={value} onChangeText={onChange} placeholder="Email" />
          )}
          name="email"
        />
        {errors.email && <TextWarn message={errors.email.message!} />}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Root
              value={value}
              onChangeText={onChange}
              secureTextEntry={passwordVisible ? false : true}
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
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Root
              value={value}
              onChangeText={onChange}
              secureTextEntry={confirmPasswordVisible ? false : true}
              placeholder="Confirmar Senha">
              <Input.Icon
                func={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                icon={<Feather name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#808080" />}
                position="right"
              />
            </Input.Root>
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && <TextWarn message={errors.confirmPassword.message!} />}
        <Button func={handleSubmit(submitRegister)} label={'Registrar'} />
        <Link style={styles.link} href={'/login'}>
          Já tenho uma conta
        </Link>
      </View>
    </View>
  );
};

export default Register;

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
  link: {
    alignSelf: 'flex-start',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
});
