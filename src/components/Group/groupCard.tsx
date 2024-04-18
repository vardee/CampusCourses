import React from "react";
import { Group, IGetUserRole } from "../../types/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface GroupCardProps {
  group: Group;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}


const GroupCard = ({ group, isAdmin, onEdit, onDelete }: GroupCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  return (
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
            style={{ textDecoration: "none", color: "inherit" ,wordBreak: "break-all"}}
          >
            {truncateText(group.name,30)}
          </Link>
        </Typography>
        {isAdmin && (
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
              variant="contained"
              onClick={onEdit}
            >
              Редактировать
            </Button>
            <Button
              color="inherit"
              sx={{ background: "red" }}
              size="small"
              onClick={onDelete}
            >
              Удалить
            </Button>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupCard;
