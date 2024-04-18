
import { Modal, Box, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { GroupsService } from "../../services/groups.service";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  getGroups: () => void;
}

const DeleteGroupModal = ({ isOpen, onClose, id, getGroups}: DeleteModalProps) => {
  const handleDeleteGroup = async () => {
    try {
      await GroupsService.deleteGroup(id);
      getGroups();
      onClose()
      toast.success("Группа успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении группы:", error);
      toast.error("Ошибка при удалении группы");
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
          Вы уверены что хотите удалить группу?
        </Typography>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Button
            type="button"
            variant="contained"
            onClick={handleDeleteGroup}
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

export default DeleteGroupModal;
