import * as yup from 'yup';
export const validationLoginSchema = yup.object({
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
});
export const validationRegisterSchema = yup.object({
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
    fullName: yup.string().required('Обязательное поле'),
    birthDate: yup.string().required('Обязательное поле'),
    confirmPassword: yup.string().required('Обязательное поле'),
});