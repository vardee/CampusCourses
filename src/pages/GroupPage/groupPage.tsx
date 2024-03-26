import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { Group, GroupCourses, IGetUserRole, UsersModel } from "../../types/types";
import { toast } from "react-toastify";
import { GroupsService } from "../../services/groups.service";
import { AuthService } from "../../services/auth.service";
import { useFormik } from "formik";
import { validationCreateCourseSchema } from "../../helpers/validation.schemas";
import { initialGetRoleData } from "../../components/InitialValues/initialValues";
import { CourseService } from "../../services/course.service";
import GroupHeader from "../../components/GroupPage/groupPageHeader";
import CourseCard from "../../components/GroupPage/courseCard";
import CreateCourseModal from "../../components/GroupPage/courseCreateModal";


const GroupPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [userRoleData, setUserRoleData] = useState<IGetUserRole>(initialGetRoleData);
  const [groupCourses, setGroupCourses] = useState<GroupCourses[]>([]);
  const [users, setUsers] = useState<UsersModel[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getUsers = async () => {
    try {
      const usersList = await AuthService.getUsers();
      if (usersList) {
        setUsers(usersList);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке списка пользователей");
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

  const getGroupsList = async () => {
    try {
      const groupsList = await GroupsService.getGroups();
      const group = groupsList.find((group) => group.id === id);
      if (group) {
        setGroupName(group.name);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке списка групп");
    }
  };

  const getGroupCourses = async () => {
    try {
      if (id) {
        const coursesList = await GroupsService.getGroupCourses(id);
        setGroupCourses(coursesList);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке списка курсов");
    }
  };

  const formik = useFormik({
    initialValues: {
      newCourseName: "",
      startYear: "",
      maximumStudentsCount: "",
      semester: "",
      requirements: "",
      annotations: "",
      selectedTeacher: "",
    },
    validationSchema: validationCreateCourseSchema,
    onSubmit: async (values) => {
      try {
        if (userRoleData.isAdmin) {
          const createNewCourseData = {
            name: values.newCourseName,
            startYear: values.startYear,
            maximumStudentsCount: values.maximumStudentsCount,
            semester: values.semester,
            requirements: values.requirements,
            annotations: values.annotations,
            mainTeacherId: values.selectedTeacher,
          };
          await CourseService.createNewCourse(id, createNewCourseData);
          setIsCreateModalOpen(false);
          getGroupCourses();
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при создании курса");
      }
    },
  });

  useEffect(() => {
    getGroupCourses();
    getGroupsList();
    getUserRole();
    getUsers();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "100px" }}
    >
      <GroupHeader groupName={groupName} isAdmin={userRoleData.isAdmin} onOpenModal={() => setIsCreateModalOpen(true)} />
      {groupCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
      <CreateCourseModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} formik={formik} users={users} />
    </Grid>
  );
};

export default GroupPage;
