import { Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initialCourseDetailsData } from "../../components/InitialValues/initialValues";
import { CourseDetails } from "../../types/types";
import { CourseService } from "../../services/course.service";
import { toast } from "react-toastify";
import { translateCourseStatus, translateSemester } from "../../helpers/validators/translator";

const CoursePage = () => {
  const { id } = useParams<{ id?: string }>();
  const [courseDetails, setCourseDetails] = useState<CourseDetails>(
    initialCourseDetailsData
  );

  const getCourseDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const courseDeatilsData = await CourseService.getCourseDetails(id);
        if (courseDeatilsData) {
          setCourseDetails(courseDeatilsData);
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
        <Typography variant="h5" style={{ marginRight: "auto" }}>
          Статус курса: {translateCourseStatus(courseDetails.status)}
        </Typography>
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
        <Typography variant="h5">Учебный год: {courseDetails.startYear}</Typography>
        <Typography variant="h5">Семестр {translateSemester(courseDetails.semester)}</Typography>
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
        <Typography variant="h5">Мест всего: {courseDetails.maximumStudentsCount}</Typography>
        <Typography variant="h5">Студентов зачислено: {courseDetails.studentsEnrolledCount}</Typography>
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
        <Typography variant="h5">Заявок на рассмотрении: {courseDetails.studentsInQueueCount}</Typography>
      </Grid>
    </Grid>
  );
};

export default CoursePage;
