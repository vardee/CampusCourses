import {
  Modal,
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthService } from "../../services/auth.service";
import { UsersModel } from "../../types/types";

interface AddTeacherToCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formikAddTeacher: any;
}

const AddTeacherToCourseModal = ({
  isOpen,
  onClose,
  formikAddTeacher,
}: AddTeacherToCourseModalProps) => {
  const [users, setUsers] = useState<UsersModel[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await AuthService.getUsers();
        setUsers(usersList);
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при загрузке списка пользователей");
      }
    };
  
    if (isOpen) {
      getUsers();
    }
  }, [isOpen]);
  
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
        <form onSubmit={formikAddTeacher.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Редактирование курса
          </Typography>
          <Typography gutterBottom sx={{ mt: 2 }}>
            Основной преподаватель курса(Выбор обязателен)
          </Typography>
          <Select
            value={formikAddTeacher.values.selectedTeacher}
            onChange={formikAddTeacher.handleChange}
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

          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ mt: 2 }}
          >
            Сохранить
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTeacherToCourseModal;
