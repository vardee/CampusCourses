import {
  Modal,
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface ChangeCourseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  formikStatus: any;
  status: string;
}

const ChangeCourseStatusModal = ({
  isOpen,
  onClose,
  formikStatus,
  status
}: ChangeCourseStatusModalProps) => {
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
        <form onSubmit={formikStatus.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Редактирование курса
          </Typography>
          <Typography gutterBottom sx={{ mt: 2 }}>
            Выберите статус курса:
          </Typography>
          <RadioGroup
            value={formikStatus.values.status || status} // Устанавливаем значение по умолчанию равным текущему статусу
            onChange={(event) =>
              formikStatus.setFieldValue("status", event.target.value)
            }
          >
            {(status !== "Finished" && status !== "Started") &&<FormControlLabel
              value="OpenForAssigning"
              control={<Radio />}
              label="Открыт для записи"
            />}
            {status !== "Finished" && <FormControlLabel
              value="Started"
              control={<Radio />}
              label="В процессе обучения"
            />}
            {<FormControlLabel
              value="Finished"
              control={<Radio />}
              label="Закрыт"
            />}
          </RadioGroup>

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

export default ChangeCourseStatusModal;
