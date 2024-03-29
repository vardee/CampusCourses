import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";

interface EditAdminCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formik: any;
  teacherName: string;
  existingData: any;
}

const EditAdminCourseModal = ({
  isOpen,
  onClose,
  formik,
  teacherName,
  existingData,
}: EditAdminCourseModalProps) => {
  const [user, setUser] = useState({ id: "", name: "" });

  useEffect(() => {
    
    if (existingData) {
      formik.setValues({
        newCourseName: existingData.name || "",
        startYear: existingData.startYear || "",
        maximumStudentsCount: existingData.maximumStudentsCount || "",
        semester: existingData.semester || "",
        requirements: existingData.requirements || "",
        annotations: existingData.annotations || "",
        selectedTeacher: existingData.mainTeacherId || "",
      });
    }
  }, [existingData]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await AuthService.getUsers();
        const mainTeacher = usersList.find((t) => t.fullName === teacherName);
        if (mainTeacher) {
          setUser({ id: mainTeacher.id, name: mainTeacher.fullName });
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при загрузке списка пользователей");
      }
    };

    getUsers();
  }, [teacherName]); 

  return (
    <Modal open={isOpen} onClose={onClose}>
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
            Редактирование курса
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
            Требования(Обязательно)
          </Typography>
          <ReactQuill
            theme="snow"
            value={formik.values.requirements}
            onChange={(value) => formik.setFieldValue("requirements", value)}
          />
          <Typography gutterBottom sx={{ mt: 2 }}>
            Аннотации(Обязательно)
          </Typography>
          <ReactQuill
            theme="snow"
            value={formik.values.annotations}
            onChange={(value) => formik.setFieldValue("annotations", value)}
          />
          <Typography gutterBottom sx={{ mt: 2 }}>
            Основной преподаватель курса(Выбор обязателен)
          </Typography>
          <Select
            value={formik.values.selectedTeacher}
            fullWidth
            variant="outlined"
            onChange={(event) =>
              formik.setFieldValue("selectedTeacher", event.target.value)
            } 
          >
            <MenuItem value={user.id}>{user.name}</MenuItem>
          </Select>

          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ mt: 2 }}
          >
            Редактировать
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditAdminCourseModal;
