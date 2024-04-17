import React from "react";
import { Grid, Typography, Button } from "@mui/material";

interface CourseHeaderComponentProps {
  courseName: string;
  isAdmin: boolean;
  isCurrentTeacher: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTeacherEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteCourseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseHeaderComponent: React.FC<CourseHeaderComponentProps> = ({
  courseName,
  isAdmin,
  isCurrentTeacher,
  setIsEditModalOpen,
  setIsTeacherEditModalOpen,
  setIsDeleteCourseModal,
}) => {
  return (
    <>
      <Typography
        variant="h2"
        gutterBottom
        style={{ maxWidth: "100%", fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
      >
        {courseName}
      </Typography>
      <Grid
        container
        item
        justifyContent="space-between"
        alignItems="center"
        style={{ width: "100%", maxWidth: 1000 }}
      >
        <Typography
          variant="body1"
          gutterBottom
          style={{ maxWidth: "100%", fontSize: "clamp(1rem, 3vw, 1.3rem)" }}
        >
          Основные детали курса
        </Typography>
        <Grid item>
          {isAdmin ? (
            <Button
              variant="contained"
              color="warning"
              onClick={() => setIsEditModalOpen(true)}
              style={{ marginLeft: "10px" }}
            >
              Редактировать
            </Button>
          ) : isCurrentTeacher ? (
            <Button
              variant="contained"
              color="warning"
              onClick={() => setIsTeacherEditModalOpen(true)}
              style={{ marginLeft: "10px" }}
            >
              Редактировать
            </Button>
          ) : null}
          {isAdmin && (
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsDeleteCourseModal(true)}
              style={{ marginLeft: "10px" }}
            >
              Удалить
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CourseHeaderComponent;
