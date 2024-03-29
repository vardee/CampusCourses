import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import CourseInfoComponent from "../../components/Course/CourseInfoComponent";
import NotificationComponent from "../../components/Course/NotificationComponent";
import TeacherComponent from "../../components/Course/TeacherComponent";
import StudentComponent from "../../components/Course/StudentComponent";
import { CourseService } from "../../services/course.service";
import { toast } from "react-toastify";
import { CourseDetails, IGetUserRole, Notifications } from "../../types/types";
import {
  initialCourseDetailsData,
  initialGetRoleData,
} from "../../components/InitialValues/initialValues";
import {
  translateCourseStatus,
  translateSemester,
} from "../../helpers/validators/translator";
import { AuthService } from "../../services/auth.service";
import EditAdminCourseModal from "../../components/Course/adminEditCourse";
import { useFormik } from "formik";
import {
  validationCreateCourseSchema,
  validationEditCourseSchema,
} from "../../helpers/validation.schemas";
import EditTeacherCourseModal from "../../components/Course/teacherEditCourse";
import ChangeCourseStatusModal from "../../components/Course/changeGroupStatus";
import AddTeacherToCourseModal from "../../components/Course/addTeacherToCourse";
import CreateNotificationModal from "../../components/Course/createNotificationModal";
import DeleteModal from "../../components/Course/deleteCourseModal";

const CoursePage = () => {
  const { id } = useParams<{ id?: string }>();
  const [courseDetails, setCourseDetails] = useState(initialCourseDetailsData);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [firstTabValue, setFirstTabValue] = useState(0);
  const [secondTabValue, setSecondTabValue] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
  const [isTeacherEditModalOpen, setIsTeacherEditModalOpen] = useState(false);
  const [isCreateNotificationModal, setIsCreateNotificationModal] =
    useState(false);
  const [isAddTeacherToCourse, setIsAddTeacherToCourse] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [existingData, setExistingData] = useState(initialCourseDetailsData);
  const [userRoleData, setUserRoleData] =
    useState<IGetUserRole>(initialGetRoleData);
  const [isCurrentTeacher, setIsCurrentTeacher] = useState(false);
  const [isMainTeacher, setIsMainTeacher] = useState(false);
  const [isCurrentStudent, setIsCurrentStudent] = useState(false);
  const [isDeleteCourseModal, setIsDeleteCourseModal] = useState(false);
  const getCourseDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const courseDetailsData = await CourseService.getCourseDetails(id);
        if (courseDetailsData) {
          setCourseDetails(courseDetailsData);
          setNotifications(courseDetailsData.notifications);
          setExistingData(courseDetailsData);
          const teacherName = courseDetailsData.teachers.find(
            (t) => t.isMain === true
          );
          const myEmail = localStorage.getItem("email");
          const isMyCard = courseDetailsData.students.find(
            (s) => s.email === myEmail
          );
          if (teacherName) {
            setTeacher(teacherName.name);
            if (teacherName.email === myEmail) {
              console.log(myEmail);
              setIsMainTeacher(true);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке курса");
    }
  };

  const singUpToCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        debugger;
        await CourseService.singUpToCourse(id);
        getCourseDetails();
        getMyCourses();
        toast.success("Заявка успешно подана!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при поступлении на курс");
    }
  };

  const getMyCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const myCourses = await CourseService.getMyCourses();
        if (myCourses) {
          const isCurrentStudent = myCourses.find((s) => s.id === id);
          if (isCurrentStudent) {
            setIsCurrentStudent(true);
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке курса");
    }
  };
  const getMyTeachingCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const teachingCourse = await CourseService.getTeachingCourse();
        if (teachingCourse) {
          const isTeacher = teachingCourse.find((t) => t.id === id);
          if (isTeacher) {
            setIsCurrentTeacher(true);
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке курса");
    }
  };

  const getUserRole = async () => {
    try {
      const userRole = await AuthService.getUserRole();
      if (userRole) {
        setUserRoleData(userRole);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке роли пользователя");
    }
  };

  useEffect(() => {
    getCourseDetails();
    getUserRole();
    getMyTeachingCourse();
    getMyCourses();
  }, []);

  const handleFirstTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setFirstTabValue(newValue);
  };

  const handleSecondTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setSecondTabValue(newValue);
  };
  const formik = useFormik({
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
        if (userRoleData.isAdmin) {
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
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при создании курса");
      }
    },
  });
  const formikTeacher = useFormik({
    initialValues: {
      requirements: "",
      annotations: "",
    },
    validationSchema: validationEditCourseSchema,
    onSubmit: async (values) => {
      try {
        if (userRoleData.isTeacher) {
          const editTeacherCourseData = {
            requirements: values.requirements,
            annotations: values.annotations,
          };
          await CourseService.editTeacherNewCourse(id, editTeacherCourseData);
          setIsTeacherEditModalOpen(false);
          getCourseDetails();
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при создании курса");
      }
    },
  });
  const formikChangeStatus = useFormik({
    initialValues: {
      status: "",
    },
    onSubmit: async (values) => {
      debugger;
      try {
        if (userRoleData.isAdmin || isMainTeacher) {
          const changeStatus = {
            status: values.status,
          };
          await CourseService.changeGroupStatus(id, changeStatus);
          setIsChangeStatusModalOpen(false);
          getCourseDetails();
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при создании курса");
      }
    },
  });
  const formikAddTeacherToCourse = useFormik({
    initialValues: {
      selectedTeacher: "",
    },
    onSubmit: async (values) => {
      debugger;
      try {
        if (userRoleData.isAdmin || isMainTeacher) {
          const userId = {
            userId: values.selectedTeacher,
          };
          await CourseService.addTeacherToCourse(id, userId);
          setIsAddTeacherToCourse(false);
          getCourseDetails();
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при создании курса");
      }
    },
  });
  const formikCreateNotification = useFormik({
    initialValues: {
      text: "",
      isImportant: false,
    },
    onSubmit: async (values) => {
      try {
        if (userRoleData.isAdmin || isMainTeacher || isCurrentTeacher) {
          const notificationData = {
            text: values.text,
            isImportant: values.isImportant,
          };
          debugger;
          await CourseService.createNotification(id, notificationData);
          setIsCreateNotificationModal(false);
          getCourseDetails();
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при создании курса");
      }
    },
  });
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "100px" }}
    >
      <Typography
        variant="h2"
        gutterBottom
        style={{ maxWidth: "100%", fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
      >
        {courseDetails.name}
      </Typography>
      <Grid
        container
        item
        justifyContent="space-between" // Для размещения двух контейнеров по краям
        alignItems="center"
        style={{ width: "100%", maxWidth: 1000 }}
      >
        <Typography
          variant="body1"
          gutterBottom
          style={{ maxWidth: "100%", fontSize: "clamp(1rem, 3vw, 1.3rem)" }}
        >
          Основные детали курса
        </Typography>
        <Grid item>
          {userRoleData.isAdmin ? (
            <Button
              variant="contained"
              color="warning"
              onClick={() => setIsEditModalOpen(true)}
              style={{ marginLeft: "10px" }}
            >
              Редактировать
            </Button>
          ) : isCurrentTeacher ? (
            <Button
              variant="contained"
              color="warning"
              onClick={() => setIsTeacherEditModalOpen(true)}
              style={{ marginLeft: "10px" }}
            >
              Редактировать
            </Button>
          ) : null}
          {userRoleData.isAdmin && (
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsDeleteCourseModal(true)}
              style={{ marginLeft: "10px" }}
            >
              Удалить
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Grid item>
          <CourseInfoComponent
            label="Статус курса"
            value={translateCourseStatus(courseDetails.status)}
          />
        </Grid>
        {userRoleData.isAdmin || isCurrentTeacher ? (
          <Button
            variant="contained"
            color="warning"
            onClick={() => setIsChangeStatusModalOpen(true)}
          >
            Изменить
          </Button>
        ) : (
          (!userRoleData.isAdmin || !isCurrentTeacher) &&
          courseDetails.status === "OpenForAssigning" &&
          isCurrentStudent === false && (
            <Button
              variant="contained"
              color="inherit"
              sx={{ background: "green" }}
              onClick={() => singUpToCourse()}
            >
              Записаться на курс
            </Button>
          )
        )}
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Grid item>
          <CourseInfoComponent
            label="Учебный год"
            value={courseDetails.startYear}
          />
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <CourseInfoComponent
            label="Семестр"
            value={translateSemester(courseDetails.semester)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Grid item>
          <CourseInfoComponent
            label="Всего мест"
            value={courseDetails.maximumStudentsCount}
          />
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <CourseInfoComponent
            label="Студентов зачислено"
            value={courseDetails.studentsEnrolledCount}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Grid item>
          <CourseInfoComponent
            label="Заявок на рассмотрении"
            value={courseDetails.studentsInQueueCount}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        style={{
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Tabs
          value={firstTabValue}
          onChange={handleFirstTabChange}
          variant="fullWidth"
          centered
          style={{ marginBottom: "20px", width: "100%", maxWidth: 1000 }}
        >
          <Tab label="Требования к курсу" />
          <Tab label="Аннотация" />
          <Tab label="Уведомления" />
        </Tabs>
      </Grid>
      {firstTabValue === 0 && (
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "0px",
            width: "100%",
            maxWidth: 1000,
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: courseDetails.requirements }}
          />
        </Grid>
      )}
      {firstTabValue === 1 && (
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "0px",
            width: "100%",
            maxWidth: 1000,
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: courseDetails.annotations }}
          />
        </Grid>
      )}
      {firstTabValue === 2 && (
        <NotificationComponent
          notifications={notifications}
          isCurrentTeacher={isCurrentTeacher}
          userRoles={userRoleData}
          onOpenModal={() => setIsCreateNotificationModal(true)}
        />
      )}
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        style={{
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Tabs
          value={secondTabValue}
          onChange={handleSecondTabChange}
          variant="fullWidth"
          centered
          style={{ marginBottom: "20px", width: "100%", maxWidth: 1000 }}
        >
          <Tab label="Преподаватели" />
          <Tab label="Студенты" />
        </Tabs>
      </Grid>
      {secondTabValue === 0 && (
        <TeacherComponent
          teachers={courseDetails.teachers}
          userRoles={userRoleData}
          isMainTeacher={isMainTeacher}
          onOpenModal={() => setIsAddTeacherToCourse(true)}
        />
      )}
      {secondTabValue === 1 && (
        <StudentComponent
          students={courseDetails.students}
          role={userRoleData}
          isCurrentTeacher={isCurrentTeacher}
          id={id}
          getCourseDetails={getCourseDetails}
        />
      )}
      {teacher && userRoleData.isAdmin && (
        <EditAdminCourseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          formik={formik}
          teacherName={teacher}
          existingData={existingData}
        />
      )}
      {(userRoleData.isAdmin || isCurrentTeacher) && (
        <EditTeacherCourseModal
          isOpen={isTeacherEditModalOpen}
          onClose={() => setIsTeacherEditModalOpen(false)}
          formikTeacher={formikTeacher}
          existingData={existingData}
        />
      )}
      {(userRoleData.isAdmin || isCurrentTeacher) && (
        <ChangeCourseStatusModal
          isOpen={isChangeStatusModalOpen}
          onClose={() => setIsChangeStatusModalOpen(false)}
          formikStatus={formikChangeStatus}
        />
      )}
      {(userRoleData.isAdmin || isMainTeacher) && (
        <AddTeacherToCourseModal
          isOpen={isAddTeacherToCourse}
          onClose={() => setIsAddTeacherToCourse(false)}
          formikAddTeacher={formikAddTeacherToCourse}
        />
      )}
      {(userRoleData.isAdmin || isCurrentTeacher) && (
        <CreateNotificationModal
          isOpen={isCreateNotificationModal}
          onClose={() => setIsCreateNotificationModal(false)}
          formikCreateNotification={formikCreateNotification}
        />
      )}
      {userRoleData.isAdmin && (
        <DeleteModal
          isOpen={isDeleteCourseModal}
          onClose={() => setIsDeleteCourseModal(false)}
          id={id}
        />
      )}
    </Grid>
  );
};

export default CoursePage;
