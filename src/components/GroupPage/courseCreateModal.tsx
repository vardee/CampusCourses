import { Modal, Box, Typography, TextField, MenuItem, Select, Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { UsersModel } from "../../types/types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formik: any;
  users: UsersModel[];
}

const CreateCourseModal = ({ isOpen, onClose, formik, users }: CreateCourseModalProps) => {
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
            Создание курса
          </Typography>
          <Typography gutterBottom>Название курса</Typography>
          <TextField
            label="Название"
            variant="outlined"
            fullWidth
            autoFocus
            {...formik.getFieldProps("newCourseName")}
            error={!!(formik.touched.newCourseName && formik.errors.newCourseName)}
            helperText={formik.touched.newCourseName && formik.errors.newCourseName}
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
            error={!!(formik.touched.maximumStudentsCount && formik.errors.maximumStudentsCount)}
            helperText={formik.touched.maximumStudentsCount && formik.errors.maximumStudentsCount}
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
  );
};

export default CreateCourseModal
