import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  Group,
  GroupCourses,
  IGetUserRole,
  UsersModel,
} from "../../types/types";
import { toast } from "react-toastify";
import { GroupsService } from "../../services/groups.service";
import { AuthService } from "../../services/auth.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { initialGetRoleData } from "../../components/InitialValues/initialValues";
import { CourseService } from "../../services/course.service";
import {
  getStatusColor,
  translateCourseStatus,
  translateSemester,
} from "../../helpers/validators/translator";
import { useFormik } from "formik";
import { validationCreateCourseSchema } from "../../helpers/validation.schemas";

const GroupPage = () => {
  const { id } = useParams<{ id?: string }>();
  const initialGroups: Group[] = [];
  const [userRoleData, setUserRoleData] =
    useState<IGetUserRole>(initialGetRoleData);
  const [groupCourses, setGroupCourses] = useState<GroupCourses[]>([]);
  const [users, setUsers] = useState<UsersModel[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const usersList = await AuthService.getUsers();
        if (usersList) {
          setUsers(usersList);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке списка пользователей");
    }
  };

  const getUserRole = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const userRole = await AuthService.getUserRole();
        if (userRole) {
          setUserRoleData(userRole);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке роли пользователя");
    }
  };

  const getGroupsList = async () => {
    try {
      const groupsList = await GroupsService.getGroups();
      setGroups(groupsList);

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
      const token = localStorage.getItem("token");
      try {
        if (token && userRoleData.isAdmin) {
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
      <Grid
        container
        item
        justifyContent="space-between"
        alignItems="center"
        style={{ width: "100%", maxWidth: 1000 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ maxWidth: "100%", fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
        >
          Группа - {groupName}
        </Typography>
        {userRoleData.isAdmin && (
          <Button
            variant="contained"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Создать
          </Button>
        )}
      </Grid>
      {groupCourses.map((course) => (
        <Grid item key={course.id} style={{ width: "100%", maxWidth: 1000 }}>
          <Card>
            <CardContent>
              <Grid
                container
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Typography variant="h5" component="div">
                  <Link
                    to={`/courses/${course.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {course.name}
                  </Link>
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    color: getStatusColor(course.status),
                    fontWeight: "bold",
                  }}
                >
                  {translateCourseStatus(course.status)}
                </Typography>
              </Grid>
              <Typography variant="body1">
                Учебный год - {course.startYear}
              </Typography>
              <Typography variant="body1">
                Семестр - {translateSemester(course.semester)}
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "grey" }}
                sx={{ mt: 2 }}
              >
                Мест всего -{" "}
                <span style={{ fontSize: "0.9em" }}>
                  {course.maximumStudentsCount}
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: "grey" }}>
                Мест свободно -{" "}
                <span style={{ fontSize: "0.9em" }}>
                  {course.remainingSlotsCount}
                </span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "45%",
            maxHeight: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Создание курса
            </Typography>
            <Typography gutterBottom>Название курса</Typography>
            <TextField
              label="Название"
              variant="outlined"
              fullWidth
              autoFocus
              {...formik.getFieldProps("newCourseName")}
              error={
                !!(formik.touched.newCourseName && formik.errors.newCourseName)
              }
              helperText={
                formik.touched.newCourseName && formik.errors.newCourseName
              }
            />
            <Typography gutterBottom sx={{ mt: 2 }}>
              Год начала курса
            </Typography>
            <TextField
              label="Год"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("startYear")}
              error={!!(formik.touched.startYear && formik.errors.startYear)}
              helperText={formik.touched.startYear && formik.errors.startYear}
            />
            <Typography gutterBottom sx={{ mt: 2 }}>
              Общее количество мест
            </Typography>
            <TextField
              label="Количество"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("maximumStudentsCount")}
              error={
                !!(
                  formik.touched.maximumStudentsCount &&
                  formik.errors.maximumStudentsCount
                )
              }
              helperText={
                formik.touched.maximumStudentsCount &&
                formik.errors.maximumStudentsCount
              }
            />
            <Typography gutterBottom sx={{ mt: 2 }}>
              Семестр
            </Typography>
            <RadioGroup
              aria-label="semester"
              name="semester"
              value={formik.values.semester}
              onChange={formik.handleChange}
              row
            >
              <FormControlLabel
                value="Autumn"
                control={<Radio />}
                label="Осенний"
              />
              <FormControlLabel
                value="Spring"
                control={<Radio />}
                label="Весенний"
              />
            </RadioGroup>

            <Typography gutterBottom sx={{ mt: 2 }}>
              Требования
            </Typography>
            <ReactQuill
              theme="snow"
              value={formik.values.requirements}
              onChange={(value) => formik.setFieldValue("requirements", value)}
            />
            <Typography gutterBottom sx={{ mt: 2 }}>
              Аннотации
            </Typography>
            <ReactQuill
              theme="snow"
              value={formik.values.annotations}
              onChange={(value) => formik.setFieldValue("annotations", value)}
            />
            <Typography gutterBottom sx={{ mt: 2 }}>
              Основной преподаватель курса
            </Typography>
            <Select
              value={formik.values.selectedTeacher}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              name="selectedTeacher" 
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.fullName}
                </MenuItem>
              ))}
            </Select>

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Создать
            </Button>
          </form>
        </Box>
      </Modal>
    </Grid>
  );
};

export default GroupPage;
