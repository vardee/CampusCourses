import { Grid, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { GroupCourses } from "../../types/types";
import { getStatusColor, translateCourseStatus, translateSemester } from "../../helpers/validators/translator";

interface CourseCardProps {
  course: GroupCourses;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Grid item key={course.id} style={{ width: "100%", maxWidth: 1000 }}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h5" component="div">
              <Link
                to={`/courses/${course.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {course.name}
              </Link>
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: getStatusColor(course.status),
                fontWeight: "bold",
              }}
            >
              {translateCourseStatus(course.status)}
            </Typography>
          </Grid>
          <Typography variant="body1">
            Учебный год - {course.startYear}
          </Typography>
          <Typography variant="body1">
            Семестр - {translateSemester(course.semester)}
          </Typography>
          <Typography variant="body1" style={{ color: "grey" }} sx={{ mt: 2 }}>
            Мест всего -{" "}
            <span style={{ fontSize: "0.9em" }}>{course.maximumStudentsCount}</span>
          </Typography>
          <Typography variant="body1" style={{ color: "grey" }}>
            Мест свободно -{" "}
            <span style={{ fontSize: "0.9em" }}>{course.remainingSlotsCount}</span>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CourseCard;
