import React from "react";
import { Grid, Tabs, Tab } from "@mui/material";
import NotificationComponent from "./NotificationComponent";
import { CourseDetails, Notifications, IGetUserRole } from "../../types/types";

interface CourseTabsContentProps {
  firstTabValue: number;
  handleFirstTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  courseDetails: CourseDetails;
  notifications: Notifications[];
  isCurrentTeacher: boolean;
  userRoleData: IGetUserRole;
  setIsCreateNotificationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseTabsContent: React.FC<CourseTabsContentProps> = ({
  firstTabValue,
  handleFirstTabChange,
  courseDetails,
  notifications,
  isCurrentTeacher,
  userRoleData,
  setIsCreateNotificationModal,
}) => {
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
        <NotificationComponent
          notifications={notifications}
          isCurrentTeacher={isCurrentTeacher}
          userRoles={userRoleData}
          onOpenModal={() => setIsCreateNotificationModal(true)}
        />
      )}
    </Grid>
  );
};

export default CourseTabsContent;
