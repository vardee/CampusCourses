import React from "react";
import { Grid, Typography } from "@mui/material";

interface Props {
  label: string;
  value: string | number;
}

const CourseInfoComponent: React.FC<Props> = ({ label, value }) => {
  return (
    <Grid item>
      <Typography variant="body1" fontWeight="bold">
        {label}
      </Typography>
      <Typography variant="body1" style={{ marginTop: 5 }}>
        {value}
      </Typography>
    </Grid>
  );
};

export default CourseInfoComponent;
