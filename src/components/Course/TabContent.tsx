import React from "react";
import { Grid, Tabs, Tab } from "@mui/material";
import TeacherComponent from "./TeacherComponent";
import StudentComponent from "./StudentComponent";
import { CourseDetails, IGetUserRole } from "../../types/types";

interface TabContentProps {
  secondTabValue: number;
  handleSecondTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  courseDetails: CourseDetails;
  userRoleData: IGetUserRole; 
  isMainTeacher: boolean;
  setIsAddTeacherToCourse: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | undefined;
  getCourseDetails: () => void;
}

const TabContent = ({
  secondTabValue,
  handleSecondTabChange,
  courseDetails,
  userRoleData,
  isMainTeacher,
  setIsAddTeacherToCourse,
  id,
  getCourseDetails,
}: TabContentProps) => {
  return (
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
      {secondTabValue === 0 && (
        <TeacherComponent
          teachers={courseDetails.teachers}
          userRoles={userRoleData}
          isMainTeacher={isMainTeacher}
          onOpenModal={() => setIsAddTeacherToCourse(true)}
        />
      )}
      {secondTabValue === 1 && (
        <StudentComponent
          students={courseDetails.students}
          role={userRoleData}
          isCurrentTeacher={userRoleData.isTeacher}
          id={id}
          getCourseDetails={getCourseDetails}
        />
      )}
    </Grid>
  );
};

export default TabContent;
