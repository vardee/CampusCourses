import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

interface CreateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formikCreateNotification: any;
}

const CreateNotificationModal = ({
  isOpen,
  onClose,
  formikCreateNotification,
}: CreateNotificationModalProps) => {
  useEffect(() => {
    if (isOpen) {
      formikCreateNotification.setFieldValue("text", "");
    }
  }, [isOpen]); 

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    formikCreateNotification.setFieldValue("isImportant", event.target.checked);
  };

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
        <form onSubmit={formikCreateNotification.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Создание уведомления
          </Typography>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography gutterBottom sx={{ mt: 2 }}>
                Текст уведомления
              </Typography>
              <textarea
                aria-label="notification text"
                rows={5}
                style={{
                  width: "100%",
                  fontSize: "1rem",
                  resize: "vertical",
                  minWidth: "200px",
                  minHeight: "200px",
                }}
                placeholder="Введите текст уведомления..."
                {...formikCreateNotification.getFieldProps("text")}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formikCreateNotification.values.isImportant}
                    onChange={handleChangeCheckbox}
                    color="warning"
                  />
                }
                label="Важное уведомление"
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Сохранить
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateNotificationModal;
