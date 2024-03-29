import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { IGetUserRole, StudentStatus, Students } from "../../types/types";
import {
  getStudentStatusColor,
  translateStudentStatus,
  getResultsStatusColor,
  translateResults,
} from "../../helpers/validators/translator";
import { CourseService } from "../../services/course.service";
import { toast } from "react-toastify";
import ChangeTermStatusModal from "./changeMidTermStatusModal";
import { useFormik } from "formik";

interface Props {
  students: Students[];
  role: IGetUserRole;
  isCurrentTeacher: boolean;
  id: string | undefined;
  getCourseDetails: () => void;
}

const StudentComponent: React.FC<Props> = ({
  students,
  role,
  isCurrentTeacher,
  id,
  getCourseDetails
}) => {
  const currentUserEmail = localStorage.getItem("email");

  const [isChangeTermStatusModalOpen, setIsChangeTermStatusModalOpen] =
    useState(false);
  const [
    isChangeFinalTermStatusModalOpen,
    setIsChangeFinalTermStatusModalOpen,
  ] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState("");

  const editStudentStatus = async (
    studentId: string,
    status: StudentStatus
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await CourseService.editStudentStatus(status, id, studentId);
        getCourseDetails();
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при изменении статуса студента");
    }
  };

  const handleSetCurrentStudentId = (studentId: string) => {
    setCurrentStudentId(studentId);
    setIsChangeTermStatusModalOpen(true);
  };

  const handleSetCurrentFinalStudentId = (studentId: string) => {
    setCurrentStudentId(studentId);
    setIsChangeFinalTermStatusModalOpen(true);
  };

  const formikChangeStatus = useFormik({
    initialValues: {
      markType: "Midterm",
      mark: "",
      studentId: "",
    },
    onSubmit: async (values) => {
      debugger;
      try {
        if (role.isAdmin || isCurrentTeacher) {
          const changeStatus = {
            markType: values.markType,
            mark: values.mark,
            studentId: currentStudentId,
          };
          await CourseService.editTermStatus(
            changeStatus,
            id,
            currentStudentId
          );

          setIsChangeTermStatusModalOpen(false);

          getCourseDetails();
          setCurrentStudentId(" ");
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при выдаче оценки студенту");
      }
    },
  });

  const formikChangeFinalTermStatus = useFormik({
    initialValues: {
      markType: "Final",
      mark: "",
      studentId: "",
    },
    onSubmit: async (values) => {
      debugger;
      try {
        if (role.isAdmin || isCurrentTeacher) {
          const changeStatus = {
            markType: values.markType,
            mark: values.mark,
            studentId: currentStudentId,
          };
          await CourseService.editTermStatus(
            changeStatus,
            id,
            currentStudentId
          );

          setIsChangeTermStatusModalOpen(false);
          getCourseDetails();
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при выдаче оценки студенту");
      }
    },
  });

  return (
    <React.Fragment>
      <Grid
        container
        item
        xs={12}
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        {students.map((student, index) => (
          <React.Fragment key={index}>
            <Grid
              container
              item
              xs={12}
              justifyContent="space-between"
              alignItems="center"
              style={{
                padding: "10px",
                marginBottom: "0px",
                width: "100%",
                maxWidth: 1000,
              }}
            >
              <Grid item>
                <Typography variant="body1">{student.name}</Typography>
                <Typography
                  variant="body1"
                  style={{ color: "grey", fontSize: "0.9em" }}
                >
                  Статус -{" "}
                  <span
                    style={{ color: getStudentStatusColor(student.status) }}
                  >
                    {translateStudentStatus(student.status)}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: "grey", fontSize: "0.9em" }}
                >
                  {student.email}
                </Typography>
              </Grid>

              {((student.email === currentUserEmail) || (role.isAdmin || isCurrentTeacher)) && student.status === "Accepted" && (
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent="center"
                  alignItems="center"
                  style={{ textAlign: "center" }}
                >
                  <Grid item>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      style={{
                        cursor: (role.isAdmin || isCurrentTeacher) ? 'pointer' : 'default',
                        pointerEvents: (role.isAdmin || isCurrentTeacher) ? 'auto' : 'none'
                      }}
                      onClick={() => {
                        if (role.isAdmin || isCurrentTeacher) {
                          handleSetCurrentStudentId(student.id);
                        }
                      }}
                    >
                      Промежуточная аттестация
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        marginTop: 5,
                        color: getResultsStatusColor(student.midtermResult),
                      }}
                    >
                      {translateResults(student.midtermResult)}
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      style={{
                        cursor: (role.isAdmin || isCurrentTeacher) ? 'pointer' : 'default',
                        pointerEvents: (role.isAdmin || isCurrentTeacher) ? 'auto' : 'none'
                      }}
                      onClick={() => {
                        if (role.isAdmin || isCurrentTeacher) {
                          handleSetCurrentFinalStudentId(student.id);
                        }
                      }}
                    >
                      Финальная аттестация
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        marginTop: 5,
                        color: getResultsStatusColor(student.finalResult),
                      }}
                    >
                      {translateResults(student.finalResult)}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {student.status === "InQueue" &&
                (role.isAdmin || isCurrentTeacher) && (
                  <Grid
                    container
                    item
                    xs={6}
                    justifyContent="center"
                    alignItems="center"
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        marginBottom: "10px",
                        marginRight: "10px",
                        width: "150px",
                        height: "50px",
                      }}
                      onClick={() =>
                        editStudentStatus(student.id, { status: "Accepted" })
                      }
                    >
                      Принять заявку
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      style={{
                        marginBottom: "10px",
                        width: "150px",
                        height: "50px",
                      }}
                      onClick={() =>
                        editStudentStatus(student.id, { status: "Declined" })
                      }
                    >
                      Отклонить заявку
                    </Button>
                  </Grid>
                )}
            </Grid>
            {index !== students.length - 1 && (
              <hr
                style={{
                  width: "100%",
                  margin: "10px 0",
                  borderTop: "1px solid #ccc",
                }}
              />
            )}
          </React.Fragment>
        ))}
        <ChangeTermStatusModal
          isOpen={isChangeTermStatusModalOpen}
          onClose={() => setIsChangeTermStatusModalOpen(false)}
          formikStatus={formikChangeStatus}
          studentId={currentStudentId}
        />
        <ChangeTermStatusModal
          isOpen={isChangeFinalTermStatusModalOpen}
          onClose={() => setIsChangeFinalTermStatusModalOpen(false)}
          formikStatus={formikChangeFinalTermStatus}
          studentId={currentStudentId}
        />
      </Grid>
    </React.Fragment>
  );
};

export default StudentComponent;
