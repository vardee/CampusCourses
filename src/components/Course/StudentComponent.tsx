import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Students } from "../../types/types";
import {
  getStudentStatusColor,
  translateStudentStatus,
  getResultsStatusColor,
  translateResults,
} from "../../helpers/validators/translator";

interface Props {
  students: Students[];
}

const StudentComponent: React.FC<Props> = ({ students }) => {
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
        {students.map((student, index) => (
          <React.Fragment key={index}>
            <Grid
              container
              item
              xs={12}
              justifyContent="space-between"
              alignItems="center"
              style={{
                padding: "10px",
                marginBottom: "0px",
                width: "100%",
                maxWidth: 1000,
              }}
            >
              <Grid item>
                <Typography variant="body1">{student.name}</Typography>
                <Typography
                  variant="body1"
                  style={{ color: "grey", fontSize: "0.9em" }}
                >
                  Статус -{" "}
                  <span style={{ color: getStudentStatusColor(student.status) }}>
                    {translateStudentStatus(student.status)}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: "grey", fontSize: "0.9em" }}
                >
                  {student.email}
                </Typography>
              </Grid>

              {student.status === "Accepted" && (
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent="center"
                  alignItems="center"
                  style={{ textAlign: "center" }}
                >
                  <Grid item>
                    <Typography variant="body1" fontWeight="bold">
                      Промежуточная аттестация
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        marginTop: 5,
                        color: getResultsStatusColor(student.midtermResult),
                      }}
                    >
                      {translateResults(student.midtermResult)}
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <Typography variant="body1" fontWeight="bold">
                      Финальная аттестация
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        marginTop: 5,
                        color: getResultsStatusColor(student.finalResult),
                      }}
                    >
                      {translateResults(student.finalResult)}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {student.status === "InQueue" && (
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent="center"
                  alignItems="center"
                  style={{ textAlign: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      marginBottom: "10px",
                      marginRight: "10px",
                      width: "150px",
                      height: "50px",
                    }}
                  >
                    Принять заявку
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{
                      marginBottom: "10px",
                      width: "150px",
                      height: "50px",
                    }}
                  >
                    Отклонить заявку
                  </Button>
                </Grid>
              )}
            </Grid>
            {index !== students.length - 1 && (
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

export default StudentComponent;
