import { Grid, Typography, Button, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initialCourseDetailsData } from "../../components/InitialValues/initialValues";
import { CourseDetails, Notifications } from "../../types/types";
import { CourseService } from "../../services/course.service";
import { toast } from "react-toastify";
import {
  translateCourseStatus,
  translateSemester,
} from "../../helpers/validators/translator";

const CoursePage = () => {
  const { id } = useParams<{ id?: string }>();
  const [courseDetails, setCourseDetails] = useState<CourseDetails>(
    initialCourseDetailsData
  );
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const getCourseDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const courseDeatilsData = await CourseService.getCourseDetails(id);
        if (courseDeatilsData) {
          setCourseDetails(courseDeatilsData);
          setNotifications(courseDeatilsData.notifications);
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
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
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
          <Typography variant="body1" fontWeight="bold">
            Статус курса
          </Typography>
          <Typography variant="body1" style={{ marginTop: 5 }}>
            {translateCourseStatus(courseDetails.status)}
          </Typography>
        </Grid>
        <Button variant="contained" color="primary">
          Изменить
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
          <Typography variant="body1" fontWeight="bold">
            Учебный год
          </Typography>
          <Typography variant="body1" style={{ marginTop: 5 }}>
            {courseDetails.startYear}
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <Typography variant="body1" fontWeight="bold">
            Семестр
          </Typography>
          <Typography variant="body1" style={{ marginTop: 5 }}>
            {translateSemester(courseDetails.semester)}
          </Typography>
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
          <Typography variant="body1" fontWeight="bold">
            Всего мест
          </Typography>
          <Typography variant="body1" style={{ marginTop: 5 }}>
            {courseDetails.maximumStudentsCount}
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <Typography variant="body1" fontWeight="bold">
            Студентов зачислено
          </Typography>
          <Typography variant="body1" style={{ marginTop: 5 }}>
            {courseDetails.studentsEnrolledCount}
          </Typography>
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
          <Typography variant="body1" fontWeight="bold">
            Заявок на рассмотрении
          </Typography>
          <Typography variant="body1" style={{ marginTop: 5 }}>
            {courseDetails.studentsInQueueCount}
          </Typography>
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
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          centered
          style={{ marginBottom: "20px", width: "100%", maxWidth: 1000 }}
        >
          <Tab label="Требования к курсу" />
          <Tab label="Аннотация" />
          <Tab label="Уведомления" />
        </Tabs>
      </Grid>

      {tabValue === 0 && (
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

      {tabValue === 1 && (
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

      {tabValue === 2 && (
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "0px",
            width: "100%",
            maxWidth: 1000,
          }}
        >
          {notifications.map((notification, index) => (
            <Grid
              key={index}
              container
              item
              xs={12}
              justifyContent="space-between"
              alignItems="center"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                width: "100%",
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                {notification.text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default CoursePage;