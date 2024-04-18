import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface EditGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: string, name: string) => void;
  groupId: string; 
  initialValue: string;
}

const EditGroupModal = ({ isOpen, onClose, onEdit, groupId, initialValue }: EditGroupModalProps) => {
  const [editedGroupName, setEditedGroupName] = useState(initialValue);
  console.log(editedGroupName);

  const handleEdit = () => {
    debugger
    console.log(editedGroupName);
    onEdit(groupId, editedGroupName);
    setEditedGroupName("");
  };
  useEffect(() => {
    if (isOpen) {
      setEditedGroupName(initialValue);
    }
  }, [isOpen, initialValue]);
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ position: "fixed", top: "20%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 400, maxHeight: "90%", bgcolor: "background.paper", boxShadow: 24, p: 4, overflowY: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Редактирование группы
        </Typography>
        <TextField
          label="Имя группы"
          variant="outlined"
          value={editedGroupName}
          onChange={(e) => setEditedGroupName(e.target.value)}
          fullWidth
          autoFocus
        />
        <Button onClick={handleEdit} variant="contained" sx={{ mt: 2 }}>
          Редактировать
        </Button>
      </Box>
    </Modal>
  );
};

export default EditGroupModal;
