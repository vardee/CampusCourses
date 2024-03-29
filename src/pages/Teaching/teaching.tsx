import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import {TeachingCourse} from "../../types/types";
import { toast } from "react-toastify";
import { CourseService } from "../../services/course.service";
import CourseTeachingMyCard from "../../components/MyTeachingCourse/courseTeachingCard";



const Teaching = () => {
  const [groupCourses, setGroupCourses] = useState<TeachingCourse[]>([]);

  const getTeachingCourses = async () => {
    try {
        const coursesList = await CourseService.getTeachingCourse();
        setGroupCourses(coursesList);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке списка курсов");
    }
  };


  useEffect(() => {
    getTeachingCourses();
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

export default Teaching;
