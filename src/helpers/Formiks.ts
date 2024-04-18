import { useFormik } from "formik";

import { CourseService } from "../services/course.service";
import { toast } from "react-toastify";
import { validationCreateCourseSchema, validationEditCourseSchema } from "./validation.schemas";

export const useCreateCourseFormik = (id: string | undefined, setIsEditModalOpen: (isOpen: boolean) => void, getCourseDetails: () => void) => {
  return useFormik({
    initialValues: {
      newCourseName: "",
      startYear: 2020,
      maximumStudentsCount: 200,
      semester: "",
      requirements: "",
      annotations: "",
      selectedTeacher: "",
    },
    validationSchema: validationCreateCourseSchema,
    onSubmit: async (values) => {
      try {
        const editCourseData = {
          name: values.newCourseName,
          startYear: values.startYear,
          maximumStudentsCount: values.maximumStudentsCount,
          semester: values.semester,
          requirements: values.requirements,
          annotations: values.annotations,
          mainTeacherId: values.selectedTeacher,
        };
        await CourseService.editNewCourse(id, editCourseData);
        setIsEditModalOpen(false); 
        getCourseDetails(); 
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при создании курса");
      }
    },
  });
};


export const useEditTeacherCourseFormik = (id: string | undefined, setIsEditModalOpen: (isOpen: boolean) => void, getCourseDetails: () => void) => {
  return useFormik({
    initialValues: {
      requirements: "",
      annotations: "",
    },
    validationSchema: validationEditCourseSchema,
    onSubmit: async (values) => {
      try {
        const editTeacherCourseData = {
          requirements: values.requirements,
          annotations: values.annotations,
        };
        await CourseService.editTeacherNewCourse(id, editTeacherCourseData);
        setIsEditModalOpen(false); 
        getCourseDetails(); 
      } catch (error) {
        toast.error("Ошибка при изменении курса");
      }
    },
  });
};

export const useChangeStatusFormik = (id: string | undefined,setIsEditModalOpen: (isOpen: boolean) => void, getCourseDetails: () => void) => {
  return useFormik({
    initialValues: {
      status: "",
    },
    onSubmit: async (values) => {
      try {
        const changeStatus = {
          status: values.status,
        };
        await CourseService.changeGroupStatus(id, changeStatus);
        setIsEditModalOpen(false); 
        getCourseDetails(); 
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при изменении статуса курса");
      }
    },
  });
};

export const useAddTeacherToCourseFormik = (id: string | undefined,setIsEditModalOpen: (isOpen: boolean) => void, getCourseDetails: () => void) => {
  return useFormik({
    initialValues: {
      selectedTeacher: "",
    },
    onSubmit: async (values) => {
      try {
        const userId = {
          userId: values.selectedTeacher,
        };
        await CourseService.addTeacherToCourse(id, userId);
        setIsEditModalOpen(false); 
        getCourseDetails(); 
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при добавлении преподавателя на курс");
      }
    },
  });
};

export const useCreateNotificationFormik = (id: string | undefined,setIsEditModalOpen: (isOpen: boolean) => void, getCourseDetails: () => void) => {
  return useFormik({
    initialValues: {
      text: "",
      isImportant: false,
    },
    onSubmit: async (values) => {
      try {
        const notificationData = {
          text: values.text,
          isImportant: values.isImportant,
        };
        await CourseService.createNotification(id, notificationData);
        setIsEditModalOpen(false); 
        getCourseDetails(); 
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при создании уведомления");
      }
    },
  });
};
