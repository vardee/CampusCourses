import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Notifications } from "../../types/types";

interface Props {
  notifications: Notifications[];
}

const NotificationComponent: React.FC<Props> = ({ notifications }) => {
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
        <Grid container justifyContent="flex-start">
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
          >
            Создать уведомление
          </Button>
        </Grid>
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
