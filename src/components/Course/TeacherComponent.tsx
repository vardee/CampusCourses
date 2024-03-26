import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Teachers } from "../../types/types";

interface Props {
  teachers: Teachers[];
}

const TeacherComponent: React.FC<Props> = ({ teachers }) => {
  return (
    <React.Fragment>
      <Grid
        container
        item
        xs={12}
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "0px",
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <Grid container justifyContent="flex-start">
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
          >
            Добавить преподавателя
          </Button>
        </Grid>
        {teachers.map((teacher, index) => (
          <React.Fragment key={index}>
            <div style={{ marginRight: "20px", marginBottom: "20px" }}>
              <Typography variant="body1">
                {teacher.name}
                {teacher.isMain && (
                  <span style={{ color: "green" }}> основной</span>
                )}
              </Typography>
              <Typography variant="body1">{teacher.email}</Typography>
            </div>
            {index !== teachers.length - 1 && (
              <hr
                style={{
                  width: "100%",
                  margin: "10px 0",
                  borderTop: "1px solid #ccc",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default TeacherComponent;
