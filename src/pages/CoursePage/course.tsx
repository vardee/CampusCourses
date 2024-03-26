import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import CourseInfoComponent from "../../components/Course/CourseInfoComponent";
import CourseStatusComponent from "../../components/Course/CourseStatusComponent";
import NotificationComponent from "../../components/Course/NotificationComponent";
import TeacherComponent from "../../components/Course/TeacherComponent";
import StudentComponent from "../../components/Course/StudentComponent";
import { CourseService } from "../../services/course.service";
import { toast } from "react-toastify";
import { Notifications } from "../../types/types";
import { initialCourseDetailsData } from "../../components/InitialValues/initialValues";
import { translateCourseStatus, translateSemester } from "../../helpers/validators/translator";

const CoursePage = () => {
  const { id } = useParams<{ id?: string }>();
  const [courseDetails, setCourseDetails] = useState(initialCourseDetailsData);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [firstTabValue, setFirstTabValue] = useState(0);
  const [secondTabValue, setSecondTabValue] = useState(0);

  const getCourseDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const courseDetailsData = await CourseService.getCourseDetails(id);
        if (courseDetailsData) {
          setCourseDetails(courseDetailsData);
          setNotifications(courseDetailsData.notifications);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке курса");
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  const handleFirstTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setFirstTabValue(newValue);
  };

  const handleSecondTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setSecondTabValue(newValue);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "100px" }}
    >
      <Typography
        variant="h2"
        gutterBottom
        style={{ maxWidth: "100%", fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
      >
        {courseDetails.name}
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
        <Button variant="contained" color="warning">
          Редактировать
        </Button>
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
            label="Статус курса"
            value= {translateCourseStatus(courseDetails.status)} 
          />
        </Grid>
        {<Button variant="contained" color="warning">
          Изменить
        </Button>}
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
        <CourseInfoComponent label="Учебный год" value={courseDetails.startYear} />
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
        <CourseInfoComponent label="Семестр" value={translateSemester(courseDetails.semester)} />
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
        <CourseInfoComponent label="Всего мест" value={courseDetails.maximumStudentsCount} />
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
        <CourseInfoComponent label="Студентов зачислено" value={courseDetails.studentsEnrolledCount} />
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
        <CourseInfoComponent label="Заявок на рассмотрении" value={courseDetails.studentsInQueueCount} />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        style={{
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Tabs
          value={firstTabValue}
          onChange={handleFirstTabChange}
          variant="fullWidth"
          centered
          style={{ marginBottom: "20px", width: "100%", maxWidth: 1000 }}
        >
          <Tab label="Требования к курсу" />
          <Tab label="Аннотация" />
          <Tab label="Уведомления" />
        </Tabs>
      </Grid>

      {firstTabValue === 0 && (
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
          <div
            dangerouslySetInnerHTML={{ __html: courseDetails.requirements }}
          />
        </Grid>
      )}

      {firstTabValue === 1 && (
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
          <div
            dangerouslySetInnerHTML={{ __html: courseDetails.annotations }}
          />
        </Grid>
      )}

      {firstTabValue === 2 && (
        <NotificationComponent notifications={notifications} />
      )}

      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        style={{
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Tabs
          value={secondTabValue}
          onChange={handleSecondTabChange}
          variant="fullWidth"
          centered
          style={{ marginBottom: "20px", width: "100%", maxWidth: 1000 }}
        >
          <Tab label="Преподаватели" />
          <Tab label="Студенты" />
        </Tabs>
      </Grid>

      {secondTabValue === 0 && (
        <TeacherComponent teachers={courseDetails.teachers} />
      )}

      {secondTabValue === 1 && (
        <StudentComponent students={courseDetails.students} />
      )}
    </Grid>
  );
};

export default CoursePage;
