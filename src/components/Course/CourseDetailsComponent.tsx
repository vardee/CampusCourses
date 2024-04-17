import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import CourseInfoComponent from "./CourseInfoComponent";
import { CourseDetails, IGetUserRole } from "../../types/types";

interface CourseDetailsComponentProps {
  courseDetails: CourseDetails;
  translateCourseStatus: (status: string) => string;
  translateSemester: (semester: string) => string;
  userRoleData: IGetUserRole;
  isCurrentTeacher: boolean;
  isCurrentStudent: boolean;
  singUpToCourse: () => void;
  setIsChangeStatusModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseDetailsComponent: React.FC<CourseDetailsComponentProps> = ({
  courseDetails,
  translateCourseStatus,
  translateSemester,
  userRoleData,
  isCurrentTeacher,
  isCurrentStudent,
  singUpToCourse,
  setIsChangeStatusModalOpen,
}) => {
  
  return (
    <>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Grid item>
          <CourseInfoComponent
            label="Статус курса"
            value={translateCourseStatus(courseDetails.status)}
          />
        </Grid>
        {(userRoleData.isAdmin || isCurrentTeacher) && (
          <Button
            variant="contained"
            color="warning"
            onClick={() => setIsChangeStatusModalOpen(true)}
          >
            Изменить
          </Button>
        )}
        {!userRoleData.isAdmin &&
          !isCurrentTeacher &&
          courseDetails.status === "OpenForAssigning" &&
          !isCurrentStudent && (
            <Button
              variant="contained"
              color="inherit"
              sx={{ background: "green" }}
              onClick={singUpToCourse}
            >
              Записаться на курс
            </Button>
          )}
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Grid item>
          <CourseInfoComponent
            label="Учебный год"
            value={courseDetails.startYear}
          />
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <CourseInfoComponent
            label="Семестр"
            value={translateSemester(courseDetails.semester)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Grid item>
          <CourseInfoComponent
            label="Всего мест"
            value={courseDetails.maximumStudentsCount}
          />
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <CourseInfoComponent
            label="Студентов зачислено"
            value={courseDetails.studentsEnrolledCount}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Grid item>
          <CourseInfoComponent
            label="Заявок на рассмотрении"
            value={courseDetails.studentsInQueueCount}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CourseDetailsComponent;
