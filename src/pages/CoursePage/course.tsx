import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { CourseService } from "../../services/course.service";
import { toast } from "react-toastify";
import { IGetUserRole, Notifications } from "../../types/types";
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
import EditTeacherCourseModal from "../../components/Course/teacherEditCourse";
import ChangeCourseStatusModal from "../../components/Course/changeGroupStatus";
import AddTeacherToCourseModal from "../../components/Course/addTeacherToCourse";
import CreateNotificationModal from "../../components/Course/createNotificationModal";
import DeleteModal from "../../components/Course/deleteCourseModal";
import CourseTabsContent from "../../components/Course/SecondContentTab";
import CourseDetailsComponent from "../../components/Course/CourseDetailsComponent";
import CourseHeaderComponent from "../../components/Course/CourseHeaderComponent";
import TabContent from "../../components/Course/TabContent";
import { useAddTeacherToCourseFormik, useChangeStatusFormik, useCreateCourseFormik, useCreateNotificationFormik, useEditTeacherCourseFormik } from "../../helpers/Formiks";

const CoursePage = () => {
  const { id } = useParams<{ id?: string }>();
  const [courseDetails, setCourseDetails] = useState(initialCourseDetailsData);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [firstTabValue, setFirstTabValue] = useState(0);
  const [secondTabValue, setSecondTabValue] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
  const [isTeacherEditModalOpen, setIsTeacherEditModalOpen] = useState(false);
  const [isCreateNotificationModal, setIsCreateNotificationModal] =useState(false);
  const [isAddTeacherToCourse, setIsAddTeacherToCourse] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [existingData, setExistingData] = useState(initialCourseDetailsData);
  const [userRoleData, setUserRoleData] =useState<IGetUserRole>(initialGetRoleData);
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
  const formik = useCreateCourseFormik(id);
  const formikTeacher = useEditTeacherCourseFormik(id);
  const formikChangeStatus = useChangeStatusFormik(id);
  const formikAddTeacherToCourse = useAddTeacherToCourseFormik(id);
  const formikCreateNotification = useCreateNotificationFormik(id);
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "100px" }}
    >
      <CourseHeaderComponent
        courseName={courseDetails.name}
        isAdmin={userRoleData.isAdmin}
        isCurrentTeacher={isCurrentTeacher}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsTeacherEditModalOpen={setIsTeacherEditModalOpen}
        setIsDeleteCourseModal={setIsDeleteCourseModal}
      />
      <CourseDetailsComponent
        courseDetails={courseDetails}
        translateCourseStatus={translateCourseStatus}
        translateSemester={translateSemester}
        userRoleData={userRoleData}
        isCurrentTeacher={isCurrentTeacher}
        isCurrentStudent={isCurrentStudent}
        singUpToCourse={singUpToCourse}
        setIsChangeStatusModalOpen={setIsChangeStatusModalOpen}
      />
      <CourseTabsContent
        firstTabValue={firstTabValue}
        handleFirstTabChange={handleFirstTabChange}
        courseDetails={courseDetails}
        notifications={notifications}
        isCurrentTeacher={isCurrentTeacher}
        userRoleData={userRoleData}
        setIsCreateNotificationModal={setIsCreateNotificationModal}
      />
      <TabContent
        secondTabValue={secondTabValue}
        handleSecondTabChange={handleSecondTabChange}
        courseDetails={courseDetails} 
        userRoleData={userRoleData} 
        isMainTeacher={isMainTeacher}
        setIsAddTeacherToCourse={setIsAddTeacherToCourse}
        id={id}
        getCourseDetails={getCourseDetails}
      />
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
          status={courseDetails.status}
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
