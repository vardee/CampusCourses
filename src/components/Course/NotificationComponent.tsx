import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { IGetUserRole, Notifications } from "../../types/types";

interface Props {
  notifications: Notifications[];
  userRoles: IGetUserRole;
  isCurrentTeacher: boolean;
  onOpenModal: () => void;
}

const NotificationComponent: React.FC<Props> = ({ notifications,userRoles,isCurrentTeacher,onOpenModal }) => {
  return (
    <React.Fragment>
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
        {(isCurrentTeacher || userRoles.isAdmin) && <Grid container justifyContent="flex-start">
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
            onClick={() => onOpenModal()}
          >
            Создать уведомление
          </Button>
        </Grid>}
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
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "5px",
              width: "100%",
              backgroundColor: notification.isImportant ? "#ed938e" : "inherit",
            }}
          >
            <Typography variant="body1">{notification.text}</Typography>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default NotificationComponent;
