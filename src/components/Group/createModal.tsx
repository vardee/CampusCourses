import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateGroupModal = ({ isOpen, onClose, onCreate }: CreateGroupModalProps) => {
  const [newGroupName, setNewGroupName] = useState("");

  const handleCreate = () => {
    onCreate(newGroupName);
    setNewGroupName("");
  };
  useEffect(() => {
    if (!isOpen) {
      setNewGroupName(""); 
    }
  }, [isOpen]);
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ position: "fixed", top: "20%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 400, maxHeight: "90%", bgcolor: "background.paper", boxShadow: 24, p: 4, overflowY: "auto" }}>
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
        <Button onClick={handleCreate} variant="contained" sx={{ mt: 2 }}>
          Создать
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateGroupModal;
