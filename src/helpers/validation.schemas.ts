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


export const validationCreateCourseSchema = yup.object({
    newCourseName: yup.string().required("Введите название курса"),
    startYear: yup.string().required("Введите год начала курса"),
    maximumStudentsCount: yup.number()
      .typeError("Введите число")
      .required("Введите количество студентов")
      .positive("Введите положительное число")
      .integer("Введите целое число"),
    semester: yup.string().required("Выберите семестр"),
    requirements: yup.string().required("Введите требования курса"),
    annotations: yup.string().required("Введите аннотации курса"),
    selectedTeacher: yup.string().required("Выберите преподавателя курса"),
  });