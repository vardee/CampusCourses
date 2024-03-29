import { Modal, Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditTeacherCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formikTeacher: any;
  existingData: any;
}

const EditTeacherCourseModal = ({
  isOpen,
  onClose,
  formikTeacher,
  existingData
}: EditTeacherCourseModalProps) => {
  useEffect(() => {
    if (existingData) {
      formikTeacher.setValues({
        requirements: existingData.requirements || "",
        annotations: existingData.annotations || "",
      });
    }
  }, [existingData]);
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
        <form onSubmit={formikTeacher.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Редактирование курса
          </Typography>
          <Typography gutterBottom sx={{ mt: 2 }}>
            Требования(Обязательно)
          </Typography>
          <ReactQuill
            theme="snow"
            value={formikTeacher.values.requirements}
            onChange={(value) =>
              formikTeacher.setFieldValue("requirements", value)
            }
          />
          <Typography gutterBottom sx={{ mt: 2 }}>
            Аннотации(Обязательно)
          </Typography>
          <ReactQuill
            theme="snow"
            value={formikTeacher.values.annotations}
            onChange={(value) =>
              formikTeacher.setFieldValue("annotations", value)
            }
          />
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

export default EditTeacherCourseModal;
