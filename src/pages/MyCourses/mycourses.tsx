import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import {TeachingCourse} from "../../types/types";
import { toast } from "react-toastify";
import { CourseService } from "../../services/course.service";
import CourseTeachingMyCard from "../../components/MyTeachingCourse/courseTeachingCard";



const MyCourses = () => {
  const [groupCourses, setGroupCourses] = useState<TeachingCourse[]>([]);

  const getMyCourses = async () => {
    try {
        const coursesList = await CourseService.getMyCourses();
        setGroupCourses(coursesList);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке списка курсов");
    }
  };


  useEffect(() => {
    getMyCourses();
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
      {groupCourses.map((course) => (
        <CourseTeachingMyCard key={course.id} course={course} />
      ))}
    
    </Grid>
  );
};

export default MyCourses;
