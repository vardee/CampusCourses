import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { GroupsService } from "../../services/groups.service";
import { Group, IGetUserRole } from "../../types/types";
import { Button, Grid, Typography } from "@mui/material";
import CreateGroupModal from "../../components/Group/createModal";
import EditGroupModal from "../../components/Group/editModal";
import GroupCard from "../../components/Group/groupCard";
import { AuthService } from "../../services/auth.service";
import { initialGetRoleData } from "../../components/InitialValues/initialValues";

const GroupsPage = () => {
  const [userRoleData, setUserRoleData] = useState<IGetUserRole>(initialGetRoleData);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editGroupName, setEditGroupName] = useState("");
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
    } catch (error) {
      console.error("Ошибка при получении роли пользователя:", error);
    }
  };
  
  const getGroupsList = async () => {
    try {
      const groupsList = await GroupsService.getGroups();
      setGroups(groupsList);
    } catch (error) {
      console.error("Ошибка при загрузке списка групп:", error);
      toast.error("Ошибка при загрузке списка групп");
    }
  };
  
  useEffect(() => {
    getUserRole();
    getGroupsList();
  }, []);
  
  const handleCreateGroup = async (name: string) => {
    try {
      await GroupsService.createNewGroup({ name });
      setIsCreateModalOpen(false);
      toast.success("Группа успешно создана");
      getGroupsList();
    } catch (error) {
      console.error("Ошибка при создании группы:", error);
      toast.error("Ошибка при создании группы");
    }
  };
  
  const handleEditGroup = async (id:string, name:string ) => {
    debugger
    try {
      await GroupsService.editGroup({ id: id }, { name: name });
      setIsEditModalOpen(false);
      toast.success("Группа успешно отредактирована");
      getGroupsList();
    } catch (error) {
      console.error("Ошибка при редактировании группы:", error);
      toast.error("Ошибка при редактировании группы");
    }
  };
  
  const handleDeleteGroup = async (groupId: string) => {
    try {
      await GroupsService.deleteGroup({ id: groupId });
      setGroups(groups.filter((group) => group.id !== groupId));
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
          <GroupCard
            group={group}
            isAdmin={userRoleData.isAdmin}
            onEdit={() => {
              setIsEditModalOpen(true);
              setEditGroupName(group.name);
              setEditGroupId(group.id);
            }}
            onDelete={() => handleDeleteGroup(group.id)}
          />
        </Grid>
      ))}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />
      <EditGroupModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEditGroup}
        groupId={editGroupId}
        initialValue={editGroupName}
      />
    </Grid>
  );
  };
  
  export default GroupsPage;
  