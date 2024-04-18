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
            value={formikTeacher.values.annotations}
            onChange={(value) =>
              formikTeacher.setFieldValue("annotations", value)
            }
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
