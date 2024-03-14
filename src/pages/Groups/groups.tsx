import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { GroupsService } from "../../services/groups.service";
import { Group, IGetUserRole } from "../../types/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { AuthService } from "../../services/auth.service";

const Groups = () => {
  const initialGroups: Group[] = [{ id: "", name: "" }];
  const initialGetUserData: IGetUserRole = {
    isTeacher: false,
    isStudent: false,
    isAdmin: false,
  };
  const [userRoleData, setUserRoleData] = useState<IGetUserRole>(initialGetUserData);

  const getUserRole = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const userRole = await AuthService.getUserRole();
        if (userRole) {
          setUserRoleData(userRole);
        }
      }
    } catch (error) {}
  };

  const [groups, setGroups] = useState<Group[]>(initialGroups);

  const getGroupsList = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const groupsList = await GroupsService.getGroups();
        setGroups(groupsList);
      } else {
        toast.error("Вы не можете выполнить это, вы не авторизованы");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGroupsList();
    getUserRole();
  }, []);

  const handleEdit = (groupId: string) => {
    console.log(`Редактирование группы с ID ${groupId}`);
  };

  const handleDelete = (groupId: string) => {
    console.log(`Удаление группы с ID ${groupId}`);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "100px" }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ maxWidth: "100%", fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
      >
        Группы кампусных курсов
      </Typography>
      {groups.map((group) => (
        <Grid item key={group.id} style={{ width: "100%", maxWidth: 1000 }}>
          <Card>
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" component="div">
                {group.name}
              </Typography>
              {userRoleData.isAdmin && ( 
                <CardActions
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <Button color="inherit"  sx={{ background: "orange", marginBottom: '8px'}}
                    size="small"
                    onClick={() => handleEdit(group.id)}
                  >
                    Редактировать
                  </Button>
                  <Button color="inherit" sx={{ background: "red" }}
                    size="small"
                    onClick={() => handleDelete(group.id)}
                  >
                    Удалить
                  </Button>
                </CardActions>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Groups;
