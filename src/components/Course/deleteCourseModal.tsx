import { Modal, Box, Typography, Button } from "@mui/material";
import { CourseService } from "../../services/course.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string | undefined;
}

const DeleteModal = ({ isOpen, onClose, id }: DeleteModalProps) => {
  const navigate = useNavigate();
  const deleteCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await CourseService.deleteCourse(id);
        navigate("/groups");
        toast.success("Группа успешно удалена");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке курса");
    }
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%", 
          maxWidth: 400,
          maxHeight: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom align="center" sx={{ mb: 2 }}>
          Вы уверены что хотите удалить курс?
        </Typography>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Button
            type="button"
            variant="contained"
            onClick={deleteCourse}
            color="error"
            sx={{ mr: 1 }}
          >
            Уверен
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={onClose}
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
