import * as yup from 'yup';
export const registerSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().strict().required('Senha é obrigatória').min(8, 'Deve conter pelo menos 8 caracteres'),
  confirmPassword: yup
    .string()
    .strict()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas devem coincidir'),
});

export const loginSchema = yup.object().shape({
  name: yup.string().required('É preciso informar um nome'),
  password: yup.string().required('É preciso informar uma senha'),
});
