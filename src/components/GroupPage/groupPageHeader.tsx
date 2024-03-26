import { Typography, Button, Grid } from "@mui/material";

interface GroupHeaderProps {
  groupName: string;
  isAdmin: boolean;
  onOpenModal: () => void;
}

const GroupHeader = ({ groupName, isAdmin, onOpenModal }: GroupHeaderProps) => {
  return (
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
          Группа - {groupName}
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            onClick={() => onOpenModal()}
          >
            Создать
          </Button>
        )}
      </Grid>
  );
};

export default GroupHeader;
