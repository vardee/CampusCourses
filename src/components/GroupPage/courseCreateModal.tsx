import { Modal, Box, Typography, TextField, Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { UsersModel } from "../../types/types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactSelect from "react-select";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formik: any;
}

const CreateCourseModal = ({ isOpen, onClose, formik}: CreateCourseModalProps) => {

  const [users, setUsers] = useState<UsersModel[]>([]);


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


  useEffect(() => {
    getUsers();
  }, []);


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
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],       
                ['blockquote', 'code-block'],
      
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],     
                [{ indent: '-1' }, { indent: '+1' }],         
                [{ direction: 'rtl' }],                        
                [{ size: ['small', false, 'large', 'huge'] }],  
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
      
                [{ color: [] }, { background: [] }],          
                [{ font: [] }],
                [{ align: [] }],
                ['clean'],                                         
                ['link', 'image', 'video']                         
              ],
            }}
            formats={[
              'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 
              'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video'
            ]}
          />
          <Typography gutterBottom sx={{ mt: 2 }}>
            Аннотации(Обязательно)
          </Typography>
          <ReactQuill
            theme="snow"
            value={formik.values.annotations}
            onChange={(value) => formik.setFieldValue("annotations", value)}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],       
                ['blockquote', 'code-block'],
      
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],     
                [{ indent: '-1' }, { indent: '+1' }],         
                [{ direction: 'rtl' }],                        
                [{ size: ['small', false, 'large', 'huge'] }],  
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
      
                [{ color: [] }, { background: [] }],          
                [{ font: [] }],
                [{ align: [] }],
                ['clean'],                                         
                ['link', 'image', 'video']                         
              ],
            }}
            formats={[
              'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 
              'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video'
            ]}
          />
          <Typography gutterBottom sx={{ mt: 2 }}>
            Основной преподаватель курса(Выбор обязателен)
          </Typography>
          <ReactSelect
            options={users.map((user) => ({
              value: user.id,
              label: user.fullName,
            }))}
            value={formik.values.selectedTeacher ? { value: formik.values.selectedTeacher, label: formik.values.selectedTeacherName } : null}
            onChange={(selectedOption) => {
              formik.setFieldValue("selectedTeacher", selectedOption?.value || "");
              formik.setFieldValue("selectedTeacherName", selectedOption?.label || "");
            }}
            isClearable={true}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Создать
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateCourseModal
