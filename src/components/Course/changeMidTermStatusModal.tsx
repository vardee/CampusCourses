import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface ChangeTermStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  formikStatus: any;
  studentId: string;
}

const ChangeTermStatusModal = ({
  isOpen,
  onClose,
  formikStatus,
  studentId,
}: ChangeTermStatusModalProps) => {

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikStatus.handleSubmit();
            onClose();
          }}
        >
          <Typography variant="h6" gutterBottom>
            Выставить оценку студенту
          </Typography>
          <RadioGroup
            value={formikStatus.values.mark || ""} 
            onChange={(event) =>
              formikStatus.setFieldValue("mark", event.target.value)
            }
          >
            <FormControlLabel
              value="Passed"
              control={<Radio />}
              label="Пройдено"
            />
            <FormControlLabel
              value="Failed"
              control={<Radio />}
              label="Зайфелено"
            />
          </RadioGroup>

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Сохранить
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ChangeTermStatusModal;
