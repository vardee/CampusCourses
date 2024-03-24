import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { GroupsService } from "../../services/groups.service";
import { Group, IGetUserRole } from "../../types/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { AuthService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import { initialGetRoleData } from "../../components/InitialValues/initialValues";

const Groups = () => {
  const initialGroups: Group[] = [];
  const [userRoleData, setUserRoleData] =
    useState<IGetUserRole>(initialGetRoleData);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupEditName, setNewGroupEditName] = useState("");
  const [editGroupId, setEditGroupId] = useState("");

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

  const createGroup = async () => {
    try {
      await GroupsService.createNewGroup({ name: newGroupName });
      setIsCreateModalOpen(false);
      toast.success("Группа успешно создана");
      setNewGroupName("");
      getGroupsList();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при создании группы");
    }
  };

  const getGroupsList = async () => {
    try {
      const groupsList = await GroupsService.getGroups();
      setGroups(groupsList);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке списка групп");
    }
  };

  useEffect(() => {
    getUserRole();
    getGroupsList();
  }, []);

  const handleEditGroup = async () => {
    try {
      await GroupsService.editGroup({id: editGroupId}, {name: newGroupEditName});
      setIsEditModalOpen(false);
      toast.success("Редактирование прошло успешно");
      setNewGroupEditName("");
      getGroupsList();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при редактировании группы");
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await GroupsService.deleteGroup({ id: groupId });
      const updatedGroups = groups.filter((group) => group.id !== groupId);
      setGroups(updatedGroups);
      toast.success("Группа успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении группы:", error);
      toast.error("Ошибка при удалении группы");
    }
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
      <Grid
        container
        item
        justifyContent="space-between"
        alignItems="center"
        style={{ width: "100%", maxWidth: 1000 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ maxWidth: "100%", fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
        >
          Группы кампусных курсов
        </Typography>
        {userRoleData.isAdmin && (
          <Button variant="contained" onClick={() => setIsCreateModalOpen(true)}>
            Создать 
          </Button>
        )}
      </Grid>
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
                <Link
                  to={`/groups/${group.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {group.name}
                </Link>
              </Typography>
              {userRoleData.isAdmin && (
                <CardActions
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    color="inherit"
                    sx={{ background: "orange", marginBottom: "8px" }}
                    size="small"
                    variant="contained"   onClick={() => {
                      setIsEditModalOpen(true);
                      setEditGroupId(group.id);
                      setNewGroupEditName(group.name);
                      console.log(group.id)
                    }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    color="inherit"
                    sx={{ background: "red" }}
                    size="small"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    Удалить
                  </Button>
                </CardActions>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Modal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <Box
          sx={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            maxHeight: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Создание новой группы
          </Typography>
          <TextField
            label="Имя группы"
            variant="outlined"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            fullWidth
            autoFocus
          />
          <Button onClick={createGroup} variant="contained" sx={{ mt: 2 }}>
            Создать
          </Button>
        </Box>
      </Modal>
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box
          sx={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            maxHeight: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Редактирование группы
          </Typography>
          <TextField
            label="Имя группы"
            variant="outlined"
            value={newGroupEditName}
            onChange={(e) => setNewGroupEditName(e.target.value)}
            fullWidth
            autoFocus
          />
          <Button onClick={handleEditGroup} variant="contained" sx={{ mt: 2 }}>
            Редактировать
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Groups;
