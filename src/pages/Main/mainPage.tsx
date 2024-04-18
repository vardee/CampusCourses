import { Grid } from "@mui/material"
import MyGroupHeader from "../../components/GroupPage/groupHeader"

const MainPage = () => {

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "100px" }}
    >
      <MyGroupHeader groupName="Добро пожаловать в систему кампусных курсов" />
    </Grid>
  )
}

export default MainPage
